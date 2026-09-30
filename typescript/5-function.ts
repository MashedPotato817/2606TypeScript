// function 函数
function greet(name: string): string {
    return "Hello, " + name;
}

const pi = 3.14;
function caculate(r: number): number {
    return pi * r;
}

let name = "Mashed Potato";
let message = greet(name);
let r = 3;
let C = caculate(r);

console.log(message);
console.log(C);

export {};