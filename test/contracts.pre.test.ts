import { pre } from '../src/contracts';

// Fn with default contract
function add(a: number, b: number): number {
    pre(a>0);
    return a + b;
}

// Fn with specific contract
function add_specific(a: number, b: number): number {
    pre(a>0, "a must be greater than 0");
    return a + b;
}

function check_mod(a: number): number {
    pre(a % 2 === 0, "a must be even");
    return a / 2;
}

test('contract without message - should pass', () => {   
    expect(add(1, 1)).toBe(2);
});

test('contract without message - catch generic error', () => {   
    expect(
        () => {
            add(0, 1)
        }
    ).toThrow();
});

test('contract without message - check error data', () => {   
    try {
        add(0, 1);
    } catch (error) {
        let errorName: string = "error type";
        let errorMessage: string = "error message";
        if (error instanceof Error) {
            errorName = error.name;
            errorMessage = error.message;
        }
        expect(errorName).toBe("PRECONDITION_VIOLATION");
        expect(errorMessage).toBe("precondition contract violated");
    }    
});

test('contract with message - check error data', () => {   
    try {
        add_specific(0, 1);
    } catch (error) {
        let errorName: string = "error type";
        let errorMessage: string = "error message";
        if (error instanceof Error) {
            errorName = error.name;
            errorMessage = error.message;
        }
        expect(errorName).toBe("PRECONDITION_VIOLATION");
        expect(errorMessage).toBe("precondition contract violated: a must be greater than 0");
    }
});

test('contract using equality', () => {   
    expect(check_mod(2)).toBe(1);
    expect(
        () => {
            check_mod(1)
        }
    ).toThrow();
});
