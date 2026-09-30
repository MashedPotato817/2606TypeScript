// class 类
class Person {
    public name: string;
    private age: number;

    constructor(name: string, age: number){
        this.name = name;
        this.age = age;
    }

    show_name(){
        return `${this.name}`;
    }
    show_age(){
        return `${this.age}`;
    }
}

//实例
const p1 = new Person("Mashed Potato", 26);
console.log(p1.show_name());
console.log(p1.name);
console.log(p1.show_age());
// 私有属性无法类外部直接访问
// console.log(p1.age); 

export {};