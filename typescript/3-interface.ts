// interface 接口
interface Person
{
    name : string;
    age : number; 
    sex : string;
}

const user: Person = {
    name: 'Mashed Potato',
    age: 26,
    sex: 'male'
}

console.log(user.name);
console.log(user.age);
console.log(user.sex);

// 将文件标记为独立模块，隔离作用域
export {};
