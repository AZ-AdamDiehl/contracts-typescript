export type ContractErrorClass = 
    | "PRECONDITION_VIOLATION"
    | "POSTCONDITION_VIOLATION"
    | "INVARIANT_VIOLATION"
    | "GENERIC_VIOLATION"

export class ContractViolationError extends Error {
    name: ContractErrorClass;
    message: string;
    cause: any;

    constructor({name, message, cause}: {name: ContractErrorClass, message: string, cause?: any}) {
        super();
        this.name = name;
        this.message = message;
        this.cause = cause;
    }
}