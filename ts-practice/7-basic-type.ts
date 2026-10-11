// TypeScript 基础类型
// string 字符串类型
let name: string = 'Mashed Potato';
let greeting: string = `Hello, ${name}`;
console.log(greeting);

// number 数字类型
let age: number = 26;
let height: number = 1.85;
console.log(age);
console.log(height);

// boolean 布尔类型
let isTrue: boolean = true;
console.log(isTrue);

// array 数组
let numbers: number[] = [20, 30, 35];
let a = numbers[1];
console.log(a);

// tuple 元组
let person: [string, number] = ['Alice', 25];

// enum 枚举
enum Color {
    Red,
    Green,
    Blue,
}
console.log(Color) // { '0': 'Red', '1': 'Green', '2': 'Blue', Red: 0, Green: 1, Blue: 2 }
console.log(Color[0]) // Red

// any 类型
let value: any = 42;
console.log(value);
value = 'Mashed Potato';
console.log(value);
value = false;
console.log(value);

// void 空类型
function logMessage(message: string): void {
    console.log(message);
}
logMessage(greeting); // Hello, Mashed Potato

// null and undefined 空值和未定义
let empty: null = null;
let unsigned: undefined = undefined;

export {};
