import {
  InvalidInitialStateError,
  EmptySetError,
  MissingStateFromTransitionTableError,
  InvalidStateValueInTransitionTableError,
  InvalidAcceptingStateError,
  InvalidInputValueInTransitionTableError,
  InvalidTransitionStateInTransitionTableError,
  MissingInputTransitionDefinitionError,
  UnreachableStateInTransitionTableError,
  InvalidInputError,
  InvalidInputTypeError,
} from "./errors.js";

/**
 * An imutable class repersentations of deterministic finite state machine(FSM).
 * Supports validation, execution, and tracking of state changes, including acceptance checks."
 */
export class FiniteStateMachine {
  #states;
  #initialState;
  #currentState;
  #inputAlphabet;
  #acceptingStates;
  #stateTransitionTable;

  /**
   * Creates an instance of a Finite State Machine.
   * @param {Set<string>} states - The set of states in the FSM.
   * @param {string} initialState - The initial state of the FSM.
   * @param {Set<string>} inputAlphabet - The finite input alphabet.
   * @param {Object} stateTransitionTable - An object maping of state
   * transition table mapping states and input symbols to new states.
   * @param {Set<string>} acceptingStates - The set of accepting states of the FSM.
   */
  constructor(
    states,
    initialState,
    inputAlphabet,
    stateTransitionTable,
    acceptingStates,
  ) {
    // Validate the provided set of states

    if (!(states instanceof Set)) {
      throw new TypeError(
        `Expected 'states' to be a Set, but got ${typeof states}.`,
      );
    }

    if (states.size === 0) {
      throw new EmptySetError("states");
    }

    // Check and make sure each value in the state is a toString
    // This is because where using an object for to repersent the
    // state transiton tables keys will be converted to strings
    // so its just easiest to deal with only strings
    for (const value of states) {
      if (typeof value !== "string") {
        throw new TypeError(
          `The value '${value}' is not a valid string. All elements in the states set must be of type 'string'.`,
        );
      }
    }
    this.#states = states;

    //verify the initialState is a valid state
    if (!states.has(initialState)) {
      throw new InvalidInitialStateError(initialState);
    }

    this.#initialState = initialState;
    this.#currentState = initialState;

    //Validate input alphabet same
    if (!(inputAlphabet instanceof Set)) {
      throw new TypeError(
        `Expected 'inputAlphabet' to be a Set, but got ${typeof states}`,
      );
    }

    if (inputAlphabet.size === 0) {
      throw new EmptySetError("inputAlphabet");
    }

    for (const value of inputAlphabet) {
      if (typeof value !== "string") {
        throw new TypeError(
          `The value '${value}' is not a valid string. All elements in the inputAlphabet set must be of type 'string'.`,
        );
      }
    }
    this.#inputAlphabet = inputAlphabet;

    //Validate acceptingStates
    if (!(acceptingStates instanceof Set)) {
      throw new TypeError(
        `Expected 'acceptingStates' to be a Set, but got ${typeof states}`,
      );
    }

    for (const value of acceptingStates) {
      if (typeof value !== "string") {
        throw new TypeError(
          `The value '${value}' is not a valid string. All elements in the acceptingStates set must be of type 'string'.`,
        );
      }
      if (!this.#states.has(value)) {
        throw new InvalidAcceptingStateError(value);
      }
    }
    if (acceptingStates.size === 0) {
      throw new EmptySetError("acceptingStates");
    }
    this.#acceptingStates = acceptingStates;

    //validate stateTransitionTable
    this.#validateTransitions(stateTransitionTable);
    this.#stateTransitionTable = stateTransitionTable;
  }

  /**
   * Validates the state transition table is valid with the states and input
   * alphabet provided.
   * @param {Object} stateTransitionTable - The state transition table.
   */
  #validateTransitions(stateTransitionTable) {
    // Check for if there are any states missing in the transiton table
    for (const state of this.#states) {
      if (!(state in stateTransitionTable)) {
        throw new MissingStateFromTransitionTableError(state);
      }
    }

    // Iterate through the transition table
    for (let [state, transitionDefinitions] of Object.entries(
      stateTransitionTable,
    )) {
      // Checked if each state is in the transition table
      // but also need to check if there are extra states not defined
      // in the state attribute
      if (!this.#states.has(state)) {
        throw new InvalidStateValueInTransitionTableError(state);
      }

      // Check there are no input values not defined in the inputAlphabet attribute
      const invalidInputValues = Object.keys(transitionDefinitions).filter(
        (key) => !this.#inputAlphabet.has(key),
      );

      if (invalidInputValues.length > 0) {
        throw new InvalidInputValueInTransitionTableError(
          state,
          invalidInputValues,
        );
      }
      // Check if the transiton will go to a state that is not defined
      // in the states attribute
      const invalidTransitionState = Object.values(
        transitionDefinitions,
      ).filter((value) => !this.#states.has(value));
      if (invalidTransitionState.length > 0) {
        throw new InvalidTransitionStateInTransitionTableError(
          state,
          invalidTransitionState,
        );
      }

      // Check if any input values defined in inputAlphabet are
      // missing from from the transtion table each transiton should be defined
      for (const inputAplhabetvalue of this.#inputAlphabet) {
        if (
          !new Set(Object.keys(transitionDefinitions)).has(inputAplhabetvalue)
        ) {
          throw new MissingInputTransitionDefinitionError(
            state,
            inputAplhabetvalue,
          );
        }
      }
    }

    //Check for if any of the states are unreachable
    const unreachableState =
      this.#checkForUnreachableState(stateTransitionTable);
    if (unreachableState.length > 0) {
      throw new UnreachableStateInTransitionTableError(unreachableState[0]);
    }
  }

  /**
   * Preform a search to see if it is possible to vist each
   * from the initial state.
   * @param {Object} stateTransitionTable - The state transition table.
   */
  #checkForUnreachableState(transtionTable) {
    const visited = new Set();

    const stack = [this.#initialState];

    while (stack.length > 0) {
      const current = stack.pop();
      if (!visited.has(current)) {
        visited.add(current);
        stack.push(...Object.values(transtionTable[current]));
      }
    }
    return [...this.#states].filter((state) => !visited.has(state));
  }

  /**
   * Validate that input is the correct type and is in the inputAlphabet
   * @param {string | string[]} input - The input sequence.
   */
  #validateInput(input) {
    if (!(Array.isArray(input) || typeof input === "string")) {
      throw new InvalidInputTypeError();
    }
    for (const val of input) {
      if (!this.#inputAlphabet.has(val)) {
        throw new InvalidInputError(val);
      }
    }
  }

  /**
   * Return the current state the FSM is in
   * @returns {string} The value for the current state the FSM is in.
   */
  getCurrentState() {
    return this.#currentState;
  }

  /**
   * Processes an input sequence through the FSM.
   * @param {string | string[]} input - The input sequence.
   * @param {boolean} [verbose=false] - Whether to log the process.
   * @returns {string} The final state after processing the input.
   */
  process(input, verbose = false) {
    this.#validateInput(input);
    if (verbose) {
      console.log(`Starting at state: ${this.getCurrentState()}`);
    }
    for (const val of input) {
      if (verbose) {
        console.log(
          `(state: ${this.getCurrentState()}, inputVal: ${val}) -> ${this.#stateTransitionTable[this.#currentState][val]}`,
        );
      }
      this.#currentState = this.#stateTransitionTable[this.#currentState][val];
    }
    if (verbose) {
      console.log(`Ending at state: ${this.getCurrentState()}`);
    }
    return this.getCurrentState();
  }

  /**
   * Processes an input sequence through the FSM and reset
   * to the inital state after running.
   * @param {string | string[]} input - The input sequence.
   * @param {boolean} [verbose=false] - Whether to log the process.
   * @returns {string} The final state after processing the input.
   */
  processAndReset(input, verbose = false) {
    this.process(input, verbose);
    const state = this.getCurrentState();
    this.reset();
    return state;
  }

  /**
   * Resets the FSM to its initial state.
   */
  reset() {
    this.#currentState = this.#initialState;
  }

  /**
   * Checks if the FSM is in an accepting state.
   * @returns {boolean} True if the FSM is in an accepting state, false otherwise.
   */
  isInAcceptedState() {
    return this.#acceptingStates.has(this.#currentState);
  }
}
