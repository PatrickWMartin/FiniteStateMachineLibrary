import { FiniteStateMachine } from "./FSM.js";

const states = new Set(["0", "1", "2"]);
const alphabet = new Set(["0", "1"]);
const transitions = {
  0: { 0: "0", 1: "1" },
  1: { 0: "2", 1: "0" },
  2: { 0: "1", 1: "2" },
};
const initialState = "0";
const acceptingStates = new Set(["0", "1", "2"]);

const modThreeStateMachine = new FiniteStateMachine(
  states,
  initialState,
  alphabet,
  transitions,
  acceptingStates,
);

console.log(`1101 % 3 = ${modThreeStateMachine.processAndReset("1101")}`);
console.log(`1110 % 3 = ${modThreeStateMachine.processAndReset("1110", true)}`);
console.log(`1111 % 3 = ${modThreeStateMachine.processAndReset("1111")}`);
