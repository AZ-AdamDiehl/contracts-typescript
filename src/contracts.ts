import { ContractErrorClass, ContractViolationError } from "./errors";

enum ContractTypes {
    PreCondition,
    PostCondition,
    Invariant
}

function handle_contract_violation(c_type: ContractTypes, contract: boolean, message?: string): void {
    if (!contract) {
        var errorMessage: string;
        var name: ContractErrorClass;
        switch (c_type) {
            case ContractTypes.PreCondition:
                name = "PRECONDITION_VIOLATION";
                errorMessage = "precondition contract violated";
                break;
            case ContractTypes.PostCondition:
                name = "POSTCONDITION_VIOLATION";
                errorMessage = "postcondition contract violated";
                break;
            case ContractTypes.Invariant:
                name = "INVARIANT_VIOLATION";
                errorMessage = "invariant contract violated";
                break;
            default:
                name = "GENERIC_VIOLATION";
                errorMessage = "contract of unknown type violated"
                break;
        }
        if (message) {
            errorMessage += ": " + message;
        }
        throw new ContractViolationError({
            name: name,
            message: errorMessage
        });
    }
}

export function pre(contract: boolean, message?: string): void {
    handle_contract_violation(ContractTypes.PreCondition, contract, message);
}

export function post(contract: boolean, message?: string): void {
    handle_contract_violation(ContractTypes.PostCondition, contract, message);
}

export function invariant(contract: boolean, message?: string): void {
    handle_contract_violation(ContractTypes.Invariant, contract, message);
}