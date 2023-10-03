/**
 * Enum holding the types of contract violation
 */
export type ContractErrorClass =
    | 'PRECONDITION_VIOLATION'
    | 'POSTCONDITION_VIOLATION'
    | 'INVARIANT_VIOLATION'
    | 'GENERIC_CONTRACT_VIOLATION'

/**
 * A Contract Violation Error identifies which kind of contract was violated and provides the details around this, if available
 */
export class ContractViolationError extends Error {
  name: ContractErrorClass
  message: string
  cause: any

  constructor ({ name, message, cause }: { name: ContractErrorClass, message: string, cause?: any }) {
    super()
    this.name = name
    this.message = message
    this.cause = cause
  }
}
