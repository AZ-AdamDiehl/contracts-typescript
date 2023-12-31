import { type ContractErrorClass, ContractViolationError } from './errors'

enum ContractTypes {
  PreCondition,
  PostCondition,
  Invariant,
}

/**
 * Internal function that handles the contract logic
 *
 * @param {ContractTypes} contractType the type of contract being used
 * @param {boolean} contract an expression that evaluates to a boolean result
 * @param {string?} message an optional message detail explaining the contract
 */
function handleContractViolations (contractType: ContractTypes, contract: boolean, message?: string): void {
  // If contract fails then throw a suitable error
  if (!contract) {
    let errorMessage: string
    let name: ContractErrorClass
    // Construct the error based on the caller
    switch (contractType) {
      case ContractTypes.PreCondition:
        name = 'PRECONDITION_VIOLATION'
        errorMessage = 'precondition contract violated'
        break
      case ContractTypes.PostCondition:
        name = 'POSTCONDITION_VIOLATION'
        errorMessage = 'postcondition contract violated'
        break
      case ContractTypes.Invariant:
        name = 'INVARIANT_VIOLATION'
        errorMessage = 'invariant contract violated'
        break
      default:
        name = 'GENERIC_CONTRACT_VIOLATION'
        errorMessage = 'contract of unknown type violated'
        break
    }
    if (message !== undefined) {
      errorMessage += ': ' + message
    }
    throw new ContractViolationError({
      name,
      message: errorMessage
    })
  }
}

/**
 * A function precondition: this condition must be satisfied at runtime for the function's logic to be valid. If the contract is violated, then a `ContractViolationError` is thrown.
 *
 * Example:
 *
 * ```ts
 * function div(numerator: number, denominator: number): number {
 *     pre(denominator > 0, "denominator must be greater than 0");
 *     return numerator / denominator;
 * }
 * ```
 *
 * @param {boolean} contract an expression that evaluates to a boolean result (such as `a > 0`)
 * @param {string?} message an optional message detail explaining the contract
 */
export function pre (contract: boolean, message?: string): void {
  handleContractViolations(ContractTypes.PreCondition, contract, message)
}

/**
 * A function postcondition: this condition must be satisfied at runtime for the function's result to be valid. If the contract is violated, then a `ContractViolationError` is thrown.
 *
 * Example:
 *
 * ```ts
 * function query(id: 0): number {
 *     let response = await fetch("whatever");
 *     post(response.status_code === 200, "query failed");
 *     return response;
 * }
 * ```
 *
 * @param {boolean} contract an expression that evaluates to a boolean result (such as `a > 0`)
 * @param {string?} message an optional message detail explaining the contract
 */
export function post (contract: boolean, message?: string): void {
  handleContractViolations(ContractTypes.PostCondition, contract, message)
}

/**
 * A function invariant: this condition must be satisfied at runtime for the function's logic to be valid. If the contract is violated, then a `ContractViolationError` is thrown.
 *
 * Invariants are typically used inside a loop or to check the result of an intermediate calculation
 *
 * Example:
 *
 * ```ts
 * function calc(start: number): number {
 *     let output = 0;
 *     for (let i = start; i < start + 10; i++) {
 *         let next = foo(i);
 *         invariant(next > 0, "foo returned a negative number");
 *         output += next;
 *     }
 *     return output;
 * }
 * ```
 *
 * @param {boolean} contract an expression that evaluates to a boolean result (such as `a > 0`)
 * @param {string?} message an optional message detail explaining the contract
 */
export function invariant (contract: boolean, message?: string): void {
  handleContractViolations(ContractTypes.Invariant, contract, message)
}
