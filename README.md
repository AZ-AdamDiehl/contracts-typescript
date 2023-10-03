# Contract Programming for Typescript

This library adds support for "design by contract" into Typescript. The interface is heavily inspired by the [D language](https://dlang.org/spec/contracts.html) (although `in` is a reserved keyword so we had to use different names). 

Unfortunately, because contracts are not a language feature, the API isn't quite as nice as the actual D language - namely around postconditions. 

Generated documentation is available [here](https://az-adamdiehl.github.io/contracts-typescript/).

### Usage

There are 3 supported constructs, defined as functions:

* Preconditions (`pre`)
* Postconditions (`post`)
* Invariants (`invariant`)

Every contract function takes 2 arguments: `(contract: boolean, message?: string)`. The contract should be an expression or function that returns a boolean, and does **not** have any side effects (don't mutate a variable or do a database insert when checking a contract!). 

Each of these functions will throw a `ContractViolationError` if the contract is violated.

### Examples

Precondition

```ts
function add(a: number, b: number): number {
    pre(a>0, "a must be greater than 0");
    return a + b;
}
```

Postcondition

```ts
function add(a: number, b: number): number {
    let c = a + b;
    post(c>0, "output must be greater than 0");
    return c;
}
```

Invariant

```ts
function add(a: number, b: number, iters: number): number {
    let output = a;
    for (let i = 0; i < iters; i++) {
        let c = a + b + i;
        invariant(c % 2 === 0);
        output += c;
    }
    return output;
}
```