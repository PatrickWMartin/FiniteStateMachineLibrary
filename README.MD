# Finite State Machine (FSM) Library

A JavaScript library for **Deterministic Finite State Machines (FSMs)**

## Features

- **Validation**: Ensures the FSMs states, input alphabet, state transition table, and accepting states are correctly defined.
- **Execution**: Processes input sequences and updates the current state.
- **Acceptance check**: Allows checking if the FSM is in an accepting state.
- **Immutability**: The FSM object is immutable, preventing modifications to its internal state after creation.


## `FiniteStateMachine` Class

### Constructor

### `new FiniteStateMachine(states, initialState, inputAlphabet, stateTransitionTable, acceptingStates)`

#### Parameters:
- `states` (`Set<string>`): The set of states for the FSM.
- `initialState` (`string`): The initial state of the FSM.
- `inputAlphabet` (`Set<string>`): The set of input symbols for transitions.
- `stateTransitionTable` (`Object`): An object maping of state transition table mapping states and input symbols to new states.
- `acceptingStates` (`Set<string>`): The set of accepting states for the FSM.

#### Methods:
#### `getCurrentState()`: 
Returns the current state the FSM is in.

#### Returns:
 - `string`: The current state of the FSM.

#### `process(input, verbose = false)`:
Processes an input sequence through the FSM.

#### Parameters:
- `input` (`string` | `string[]`): The input sequence to be processed.
- `verbose` (`boolean`, `optional`): A logging flag to show console output.

#### Returns:
- `string`: The final state after processing the input.

#### `processAndReset(input, verbose = false)`:
Processes an input sequence and resets the FSM to its initial state after execution.

#### Parameters:
- `input` (`string` | `string[]`): The input sequence to be processed.
- `verbose` (`boolean`, `optional`): A logging flag to show console output.

#### Returns:
- `string`: The final state after processing the input.

#### `reset()`:
Resets the FSM to its initial state.

#### `isInAcceptedState()`:
Checks if the FSM is currently in an accepting state.

#### Returns:
- `boolean`: true if the FSM is in an accepting state


## Utility Functions

### `createTransitionTable(states, inputAlphabet, transitionFunction = null, defaultValue = "")`
Creates a transition table for the FSM.

#### Parameters:
- `states` (`Set<string>`): The set of states for the FSM.
- `inputAlphabet` (`Set<string>`): The set of symbos that define the input alphabet of the FSM.
- `transitionFunction` (`function`, optional): A function to determine state transitions based on the current state and input.
- `defaultValue` (`string`, optional): A default value for transitions.

#### Returns:
- `Object`: An object representing the state transition table.



