//A finite state machine that checks if a a seris of lower case letters is the word hello
import { FiniteStateMachine } from "../FSM.js";
import { createTransitionTable, LOWERCASE_LETTERS } from "../utilities.js";

const states = new Set([
  "Empty String",
  "H",
  "E",
  "L1",
  "L2",
  "O",
  "Error State",
]);

function helloTransitionFunction(state, input) {
  switch (state) {
    case "Empty String":
      return input === "h" ? "H" : "Error State";
    case "H":
      return input === "e" ? "E" : "Error State";
    case "E":
      return input === "l" ? "L1" : "Error State";
    case "L1":
      return input === "l" ? "L2" : "Error State";
    case "L2":
      return input === "o" ? "O" : "Error State";
    case "O":
      return "Error State";
    default:
      return "Error State";
  }
}
const transitionTable = createTransitionTable(
  states,
  LOWERCASE_LETTERS,
  helloTransitionFunction,
);

const initialState = "Empty String";
const acceptingStates = new Set(["O"]);
const helloStateMachine = new FiniteStateMachine(
  states,
  initialState,
  LOWERCASE_LETTERS,
  transitionTable,
  acceptingStates,
);

let testWord = "hello";
helloStateMachine.process(testWord);
console.log(`is the test word hello? ${helloStateMachine.isInAcceptedState()}`);
helloStateMachine.reset();

testWord = "here";
helloStateMachine.process(testWord);
console.log(`is the test word hello? ${helloStateMachine.isInAcceptedState()}`);
helloStateMachine.reset();

testWord = "hellothere";
helloStateMachine.process(testWord, true);
console.log(`is the test word hello? ${helloStateMachine.isInAcceptedState()}`);
helloStateMachine.reset();

testWord = "hello";
helloStateMachine.process(testWord, true);
console.log(`is the test word hello? ${helloStateMachine.isInAcceptedState()}`);
helloStateMachine.reset();
