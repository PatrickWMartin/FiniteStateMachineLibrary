class FSMError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    this.stack = new Error().stack;
  }
}

export class InvalidInitialStateError extends FSMError {
  constructor(initialState) {
    super(
      `The initial state "${initialState}" is not in the set of valid states provided. If "${initialState}" is your expected state check that the value is a string`,
    );
    this.code = "INVALID_INITIAL_STATE";
  }
}

export class EmptySetError extends FSMError {
  constructor(parameterName) {
    super(`The '${parameterName}' set cannot be empty.`);
    this.code = "EMPTY_SET";
  }
}

export class MissingStateFromTransitionTableError extends FSMError {
  constructor(missingState) {
    super(
      `The transition table is missing a definition for state '${missingState}'.`,
    );
    this.code = "MISSING_STATE_FROM_TRANSITION_TABLE";
  }
}

export class InvalidStateValueInTransitionTableError extends FSMError {
  constructor(invalidState) {
    super(
      `The state transition table contains an invalid state value. '${invalidState}' is not a valid member of the provided state set.`,
    );
    this.code = "INVALID_STATE_VALUE_IN_TRANSITION_TABLE";
  }
}

export class InvalidAcceptingStateError extends FSMError {
  constructor(acceptingState) {
    super(
      `The accepting state '${acceptingState}' is not defined in the set of valid states.`,
    );
    this.code = "INVALID_ACCEPTING_STATE";
  }
}

export class InvalidInputValueInTransitionTableError extends FSMError {
  constructor(stateValue, inputViolation) {
    super(
      `The state transition table contains invalid input values for state '${stateValue}'. '[${inputViolation}]' are not a recognized member of the input alphabet set.`,
    );
    this.code = "INVALID_INPUT_VALUE";
  }
}

export class InvalidTransitionStateInTransitionTableError extends FSMError {
  constructor(stateValue, stateViolation) {
    super(
      `The state transition table contains invalid transition state for state '${stateValue}'. '[${stateViolation}]' are not a recognized member of the states set.`,
    );
    this.code = "INVALID_TRANSITION_STATE";
  }
}

export class MissingInputTransitionDefinitionError extends FSMError {
  constructor(stateValue, missingValue) {
    super(
      `The state transition table is missing an input value definition for state '${stateValue}'. The transition for input value '${missingValue}' is not defined.`,
    );
    this.code = "MISSING_INPUT_DEFINITION";
  }
}

export class UnreachableStateInTransitionTableError extends FSMError {
  constructor(unreachableState) {
    super(
      `The state '${unreachableState}' is unreachable from the current state or transition table configuration.`,
    );
    this.code = "UNREACHABLE_STATE";
  }
}

export class InvalidInputError extends FSMError {
  constructor(invalidInput) {
    super(
      `The input '${invalidInput}'is not valid. Values must be a member of the input alphabet set.`,
    );
    this.code = "INVALID_INPUT";
  }
}

export class InvalidInputTypeError extends FSMError {
  constructor() {
    super(
      "The input provided is not valid type. Inputs must be a String or Array",
    );
    this.code = "INVALID_INPUT_TYPE";
  }
}
