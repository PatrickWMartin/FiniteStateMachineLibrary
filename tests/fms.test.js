import { beforeEach, describe, expect, test } from "vitest";
import { FiniteStateMachine } from "../FSM";

//Test values
const states = new Set(["S0", "S1", "S2"]);
const alphabet = new Set(["0", "1"]);
const transitions = {
  S0: { 0: "S0", 1: "S1" },
  S1: { 0: "S2", 1: "S0" },
  S2: { 0: "S1", 1: "S2" },
};
const initialState = "S0";
const acceptingStates = new Set(["S0", "S1", "S2"]);

test("creating a FSM object with valid input", () => {
  new FiniteStateMachine(
    states,
    initialState,
    alphabet,
    transitions,
    acceptingStates,
  );
});

test("initialState not a valid state", () => {
  const invalidState = "S42";

  expect(
    () =>
      new FiniteStateMachine(
        states,
        invalidState,
        alphabet,
        transitions,
        acceptingStates,
      ),
  ).toThrow(
    `The initial state "${invalidState}" is not in the set of valid states provided.`,
  );
  //initial state is undefined
  expect(
    () =>
      new FiniteStateMachine(
        states,
        undefined,
        alphabet,
        transitions,
        acceptingStates,
      ),
  ).toThrow(
    'The initial state "undefined" is not in the set of valid states provided.',
  );
});

describe("creating a FSM object but with bad state values", () => {
  test("states is not of type set", () => {
    const testStates = ["S0", "S1", "S2"];
    expect(
      () =>
        new FiniteStateMachine(
          testStates,
          initialState,
          alphabet,
          transitions,
          acceptingStates,
        ),
    ).toThrow(`Expected 'states' to be a Set, but got ${typeof states}`);
  });
  test("state is passed an empty set", () => {
    const testStates = new Set();
    expect(
      () =>
        new FiniteStateMachine(
          testStates,
          initialState,
          alphabet,
          transitions,
          acceptingStates,
        ),
    ).toThrow("The 'states' set cannot be empty.");
  });
  test("states is passed an set with non string values", () => {
    const testStates = new Set(["S0", "S1", 2]);
    expect(
      () =>
        new FiniteStateMachine(
          testStates,
          initialState,
          alphabet,
          transitions,
          acceptingStates,
        ),
    ).toThrow(
      "The value '2' is not a valid string. All elements in the states set must be of type 'string'.",
    );
  });
});

describe("creating a FSM object but with bad inputAlphabet values", () => {
  test("inputAlphabet is not of type set", () => {
    const testAlphabet = ["0", "1"];
    expect(
      () =>
        new FiniteStateMachine(
          states,
          initialState,
          testAlphabet,
          transitions,
          acceptingStates,
        ),
    ).toThrow(`Expected 'inputAlphabet' to be a Set, but got ${typeof states}`);
  });
  test("inputAlphabet is passed an empty set", () => {
    const testAlphabet = new Set();
    expect(
      () =>
        new FiniteStateMachine(
          states,
          initialState,
          testAlphabet,
          transitions,
          acceptingStates,
        ),
    ).toThrow("The 'inputAlphabet' set cannot be empty.");
  });
  test("inputAlphabet is passed an set with non string values", () => {
    const testAlphabet = new Set([0, "1"]);
    expect(
      () =>
        new FiniteStateMachine(
          states,
          initialState,
          testAlphabet,
          transitions,
          acceptingStates,
        ),
    ).toThrow(
      "The value '0' is not a valid string. All elements in the inputAlphabet set must be of type 'string'.",
    );
  });
});

describe("creating a FSM object but with bad acceptingStates values", () => {
  test("acceptingStates is not of type set", () => {
    const testAcceptingStates = ["S0", "S1", "S2"];
    expect(
      () =>
        new FiniteStateMachine(
          states,
          initialState,
          alphabet,
          transitions,
          testAcceptingStates,
        ),
    ).toThrow(
      `Expected 'acceptingStates' to be a Set, but got ${typeof states}`,
    );
  });
  test("acceptingStates is passed an empty set", () => {
    const testAcceptingStates = new Set();
    expect(
      () =>
        new FiniteStateMachine(
          states,
          initialState,
          alphabet,
          transitions,
          testAcceptingStates,
        ),
    ).toThrow("The 'acceptingStates' set cannot be empty.");
  });
  test("acceptingStates is passed an set with non string values", () => {
    const testAcceptingStates = new Set(["S0", 1, "S2"]);
    expect(
      () =>
        new FiniteStateMachine(
          states,
          initialState,
          alphabet,
          transitions,
          testAcceptingStates,
        ),
    ).toThrow(
      "The value '1' is not a valid string. All elements in the acceptingStates set must be of type 'string'.",
    );
  });
  test("acceptingStates is passed a set with a not valid state", () => {
    const testAcceptingStates = new Set(["S0", "S1", "S77"]);
    expect(
      () =>
        new FiniteStateMachine(
          states,
          initialState,
          alphabet,
          transitions,
          testAcceptingStates,
        ),
    ).toThrow(
      "The accepting state 'S77' is not defined in the set of valid states.",
    );
  });
});
describe("createing a FSM object with bad values in the stateTransitionTable", () => {
  test("when the stateTransitionTable is missing definded state", () => {
    const badStateTransitionTable = {
      S0: { 0: "S0", 1: "S1" },
      S2: { 0: "S1", 1: "S2" },
    };

    expect(
      () =>
        new FiniteStateMachine(
          states,
          initialState,
          alphabet,
          badStateTransitionTable,
          acceptingStates,
        ),
    ).toThrow("The transition table is missing a definition for state 'S1'.");
  });
  test("when the stateTransitionTable has extra non valid state", () => {
    const badStateTransitionTable = {
      S0: { 0: "S0", 1: "S1" },
      S1: { 0: "S2", 1: "S0" },
      S3: { 0: "S2", 1: "S0" },
      S2: { 0: "S1", 1: "S2" },
    };

    expect(
      () =>
        new FiniteStateMachine(
          states,
          initialState,
          alphabet,
          badStateTransitionTable,
          acceptingStates,
        ),
    ).toThrow(
      "The state transition table contains an invalid state value. 'S3' is not a valid member of the provided state set.",
    );
  });
  test("when the a state in the stateTransitionTable has an invalid input value", () => {
    const badStateTransitionTable = {
      S0: { 0: "S0", 1: "S1" },
      S1: { 0: "S2", 74: "S0" },
      S2: { 0: "S1", 1: "S2" },
    };

    expect(
      () =>
        new FiniteStateMachine(
          states,
          initialState,
          alphabet,
          badStateTransitionTable,
          acceptingStates,
        ),
    ).toThrow(
      "The state transition table contains invalid input values for state 'S1'. '[74]' are not a recognized member of the input alphabet set.",
    );
  });
  test("when a state in the stateTransitionTable has an invalid state for a transition", () => {
    const badStateTransitionTable = {
      S0: { 0: "S0", 1: "S1" },
      S1: { 0: "S2", 1: "S7" },
      S2: { 0: "S1", 1: "S2" },
    };

    expect(
      () =>
        new FiniteStateMachine(
          states,
          initialState,
          alphabet,
          badStateTransitionTable,
          acceptingStates,
        ),
    ).toThrow(
      "The state transition table contains invalid transition state for state 'S1'. '[S7]' are not a recognized member of the states set.",
    );
  });
  test("when a state in the stateTransitionTable is missing input value", () => {
    const badStateTransitionTable = {
      S0: { 0: "S0", 1: "S1" },
      S1: { 0: "S2" },
      S2: { 0: "S1", 1: "S2" },
    };

    expect(
      () =>
        new FiniteStateMachine(
          states,
          initialState,
          alphabet,
          badStateTransitionTable,
          acceptingStates,
        ),
    ).toThrow(
      "The state transition table is missing an input value definition for state 'S1'. The transition for input value '1' is not defined.",
    );
  });
  test("when there is unreacable state in the stateTransitionTable", () => {
    const testStates = new Set(["S0", "S1", "S2", "S3"]);
    const badStateTransitionTable = {
      S0: { 0: "S0", 1: "S1" },
      S1: { 0: "S2", 1: "S0" },
      S2: { 0: "S1", 1: "S2" },
      S3: { 0: "S1", 1: "S2" },
    };

    expect(
      () =>
        new FiniteStateMachine(
          testStates,
          initialState,
          alphabet,
          badStateTransitionTable,
          acceptingStates,
        ),
    ).toThrow(
      "The state 'S3' is unreachable from the current state or transition table configuration.",
    );
  });
});

describe("Testing processing values in the FSM", () => {
  let testFSM;

  beforeEach(() => {
    testFSM = new FiniteStateMachine(
      states,
      initialState,
      alphabet,
      transitions,
      acceptingStates,
    );
  });

  test("process a single value", () => {
    expect(testFSM.getCurrentState()).toBe("S0");
    testFSM.process("1");
    expect(testFSM.getCurrentState()).toBe("S1");
  });
  test("process a multipe values from a string", () => {
    expect(testFSM.getCurrentState()).toBe("S0");
    testFSM.process("101");
    expect(testFSM.getCurrentState()).toBe("S2");
  });
  test("process a multipe values from a list", () => {
    expect(testFSM.getCurrentState()).toBe("S0");
    testFSM.process(["1", "0", "0", "1", "0", "1"]);
    expect(testFSM.getCurrentState()).toBe("S1");
  });
  test("throw an error when a non straing or list is passed", () => {
    expect(() =>
      testFSM.process(new Set(["1", "0", "0", "1", "0", "1"])),
    ).toThrow(
      "The input provided is not valid type. Inputs must be a String or Array",
    );
    expect(() => testFSM.process(10110101)).toThrow(
      "The input provided is not valid type. Inputs must be a String or Array",
    );
  });
  test("throw an error when a value not in the input alphabet is passed", () => {
    expect(() => testFSM.process(["1", "0", "0", "1", "3", "1"])).toThrow(
      "The input '3'is not valid. Values must be a member of the input alphabet set.",
    );
  });
  test("value resets to intialState when reset  called", () => {
    expect(testFSM.getCurrentState()).toBe("S0");
    const testValue = testFSM.process("1010");
    expect(testValue).toBe("S1");
    expect(testFSM.getCurrentState()).toBe("S1");
    testFSM.reset();
    expect(testFSM.getCurrentState()).toBe("S0");
  });
  test("processAndReset", () => {
    expect(testFSM.getCurrentState()).toBe("S0");
    const testValue = testFSM.processAndReset("1010");
    expect(testValue).toBe("S1");
    expect(testFSM.getCurrentState()).toBe("S0");
  });
});

describe("testing accepting state", () => {
  test("when in an accepting state ture is returned and false when not in an accepting state", () => {
    const states = new Set(["S0", "S1", "S2"]);
    const alphabet = new Set(["0", "1"]);
    const transitions = {
      S0: { 0: "S0", 1: "S1" },
      S1: { 0: "S2", 1: "S0" },
      S2: { 0: "S1", 1: "S2" },
    };
    const initialState = "S0";
    const acceptingStates = new Set(["S2"]);
    const testFSM = new FiniteStateMachine(
      states,
      initialState,
      alphabet,
      transitions,
      acceptingStates,
    );
    expect(testFSM.getCurrentState()).toBe("S0");
    expect(testFSM.isInAcceptedState()).toBe(false);
    testFSM.process("101");
    expect(testFSM.getCurrentState()).toBe("S2");
    expect(testFSM.isInAcceptedState()).toBe(true);
    testFSM.process("0");
    expect(testFSM.getCurrentState()).toBe("S1");
    expect(testFSM.isInAcceptedState()).toBe(false);
    testFSM.process("0");
    expect(testFSM.getCurrentState()).toBe("S2");
    expect(testFSM.isInAcceptedState()).toBe(true);
  });
});
