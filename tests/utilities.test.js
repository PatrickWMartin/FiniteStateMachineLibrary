import { describe, expect, test } from "vitest";

import {
  LOWERCASE_LETTERS,
  UPPERCASE_LETTERS,
  DIGITS,
  ALPHANUMERIC,
  createTransitionTable,
} from "../utilities.js"; // Replace with actual file path

describe("Character Sets", () => {
  test("LOWERCASE_LETTERS contains all lowercase letters", () => {
    expect(LOWERCASE_LETTERS).toEqual(new Set("abcdefghijklmnopqrstuvwxyz"));
  });

  test("UPPERCASE_LETTERS contains all uppercase letters", () => {
    expect(UPPERCASE_LETTERS).toEqual(new Set("ABCDEFGHIJKLMNOPQRSTUVWXYZ"));
  });

  test("DIGITS contains all numeric digits", () => {
    expect(DIGITS).toEqual(new Set("0123456789"));
  });

  test("ALPHANUMERIC contains all letters and digits", () => {
    expect(ALPHANUMERIC).toEqual(
      new Set("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"),
    );
  });
});

describe("createTransitionTable", () => {
  test("creates a transition table with default values", () => {
    const states = new Set(["S0", "S1"]);
    const inputAlphabet = new Set(["0", "1"]);
    const defaultValue = "X";

    const transitions = createTransitionTable(
      states,
      inputAlphabet,
      null,
      defaultValue,
    );

    expect(transitions).toEqual({
      S0: { 0: "X", 1: "X" },
      S1: { 0: "X", 1: "X" },
    });
  });

  test("creates a transition table using a transition function", () => {
    const states = new Set(["EVEN", "ODD"]);
    const inputAlphabet = new Set(["1", "2", "3", "4"]);

    const mockTransitionFunction = (_, input) =>
      Number(input) % 2 === 0 ? "EVEN" : "ODD";

    const transitions = createTransitionTable(
      states,
      inputAlphabet,
      mockTransitionFunction,
    );

    expect(transitions).toEqual({
      EVEN: { 1: "ODD", 2: "EVEN", 3: "ODD", 4: "EVEN" },
      ODD: { 1: "ODD", 2: "EVEN", 3: "ODD", 4: "EVEN" },
    });
  });
});
