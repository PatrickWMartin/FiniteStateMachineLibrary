/**
 * Constants for different sets of characters.
 *
 * @constant {Set<string>} LOWERCASE_LETTERS - A set of lowercase letters (a-z).
 * @constant {Set<string>} UPPERCASE_LETTERS - A set of uppercase letters (A-Z).
 * @constant {Set<string>} DIGITS - A set of digits (0-9).
 * @constant {Set<string>} ALPHANUMERIC - A set of alphanumeric characters (a-z, A-Z, 0-9).
 */
export const LOWERCASE_LETTERS = new Set("abcdefghijklmnopqrstuvwxyz");
export const UPPERCASE_LETTERS = new Set("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
export const DIGITS = new Set("0123456789");
export const ALPHANUMERIC = new Set([
  ...LOWERCASE_LETTERS,
  ...UPPERCASE_LETTERS,
  ...DIGITS,
]);

/**
 * Utility function for creating a transition table for a finite state machine (FSM).
 *
 * @param {Set<string>} states - The set of states in the FSM.
 * @param {Set<string>} inputAlphabet - The set of input symbols for the FSM.
 * @param {function} [transitionFunction=null] - A function that takes a state and an input symbol, and returns the next state or value. If not provided, the default value is used.
 * @param {string} [defaultValue=""] - The default value to be used for transitions when no transition function is provided.
 *
 * @returns {Object<string, Object<string, string>>} - A transition table object where each state maps to an object of transitions for each input symbol.
 */
export function createTransitionTable(
  states,
  inputAlphabet,
  transitionFunction = null,
  defaultValue = "",
) {
  const transitions = {};

  for (const state of states) {
    transitions[state] = {};

    for (const input of inputAlphabet) {
      if (transitionFunction) {
        transitions[state][input] = transitionFunction(state, input);
      } else {
        transitions[state][input] = defaultValue;
      }
    }
  }

  return transitions;
}
