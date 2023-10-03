import { invariant } from '../src/contracts';

// Fn with generic contract
function add(a: number, b: number): number {
    let c = a + b;
    invariant(c > 0);
    return c + 3;
}

// Fn with specific contract
function add_specific(a: number, b: number): number {
    let c = a + b;
    invariant(c > 0, "intermediate sum must be > 0");
    return c + 3;
}

test('contract without message - should pass', () => {   
    expect(add(1, 1)).toBe(5);
});

test('contract without message - catch generic error', () => {   
    expect(
        () => {
            add(0, 0)
        }
    ).toThrow();
});

test('contract without message - check error data', () => {   
    try {
        add(0, 0);
    } catch (error) {
        let errorName: string = "error type";
        let errorMessage: string = "error message";
        if (error instanceof Error) {
            errorName = error.name;
            errorMessage = error.message;
        }
        expect(errorName).toBe("INVARIANT_VIOLATION");
        expect(errorMessage).toBe("invariant contract violated");
    }    
});

test('contract with message - check error data', () => {   
    try {
        add_specific(0, 0);
    } catch (error) {
        let errorName: string = "error type";
        let errorMessage: string = "error message";
        if (error instanceof Error) {
            errorName = error.name;
            errorMessage = error.message;
        }
        expect(errorName).toBe("INVARIANT_VIOLATION");
        expect(errorMessage).toBe("invariant contract violated: intermediate sum must be > 0");
    }
});