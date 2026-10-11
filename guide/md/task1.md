# 第 1 阶段：消息列表

[返回项目路线](../README.md) · [打开逐步指导页](../h5/task1.html)

用 TS 描述合法消息，用 JS 添加和筛选消息。按下面 15 个小任务逐步练习，每次只做一个；验收通过后再继续。

所有命令在仓库根目录执行。JS 小实验用 `task1/0-js-basics.ts`，消息列表用 `task1/9-message.ts`，文件由你创建。后续 6 个阶段继续在 `task1/` 下完成。

先自己尝试，再逐级展开提示。网页中的步骤编号只表示阅读位置，练习结果由你对照验收检查。

## 小任务目录

1. 确认运行工具（准备）
2. 第一次检查与运行（准备）
3. 展开成一个新数组（JS 基础）
4. 只修改新数组（JS 基础）
5. 普通函数与返回值（JS 基础）
6. 改写成箭头函数（JS 基础）
7. 让 filter 调用回调（JS 基础）
8. 改写筛选条件（JS 基础）
9. 限制消息角色（消息类型）
10. 描述第一条消息（消息类型）
11. 故意写错再修复（消息类型）
12. 建立消息数组（消息类型）
13. 添加消息，保留原数组（消息操作）
14. 筛选用户消息（消息操作）
15. 独立筛选助手消息（消息操作）

## 01. 确认运行工具

练习位置：`仓库根目录`

**目标**：确认终端能找到 Node 和 TypeScript。

**动手**：

- 在仓库根目录执行两条命令，记录版本。

```powershell
node --version
tsc --version
```

**验收**：

- Node 为 24 或更高版本；tsc 能输出版本。

**检查问题**：这两个工具分别负责运行代码，还是检查类型？

<details>

<summary>找不到 tsc 时</summary>

可用 npx --package typescript tsc --version 检查；首次可能提示下载 TypeScript。先提供完整报错，再处理工具问题。

</details>

## 02. 第一次检查与运行

练习位置：`task1/0-js-basics.ts`

**目标**：走通一次“类型检查 → 运行”。

**动手**：

- 自己创建 task1/0-js-basics.ts，写入起步代码。后续实验写在 export {}; 前面。
- 在仓库根目录先执行检查，再执行运行命令。

```ts
console.log("开始练习");
export {};
```

执行命令：

```powershell
tsc --strict --noEmit task1/0-js-basics.ts
node task1/0-js-basics.ts
```

**验收**：

- 类型检查无报错；运行输出 开始练习。

**检查问题**：node 运行成功，是否代表类型检查也通过了？

<details>

<summary>命令与模块</summary>

--strict 开启严格检查；--noEmit 不生成 JS。export {}; 把练习标记为模块，避免多个文件的同名变量干扰类型检查。Node 擦除类型后运行，不做类型检查；默认方式不支持 enum 等需要转换的语法。

</details>

## 03. 展开成一个新数组

练习位置：`task1/0-js-basics.ts`

**目标**：理解展开语法与数组身份。

**动手**：

- 先预测三行输出，再手写并运行下面的实验。

```ts
const numbers = [1, 2];
const copied = [...numbers, 3];
console.log(numbers);
console.log(copied);
console.log(numbers === copied);
```

**验收**：

- 依次输出 [1, 2]、[1, 2, 3]、false。

**检查问题**：为什么元素相似，两个数组用 === 比较却是 false？

<details>

<summary>展开与比较</summary>

...numbers 把原数组的元素放进新数组。=== 在这里比较是否指向同一个数组，不逐个比较元素。

</details>

## 04. 只修改新数组

练习位置：`task1/0-js-basics.ts`

**目标**：理解 const 与数组内部修改。

**动手**：

- 接着上一步，在 copied 末尾追加数字 4，再打印 numbers 和 copied。

**验收**：

- numbers 仍为 [1, 2]；copied 变为 [1, 2, 3, 4]。

**检查问题**：const 限制重新赋值，还是禁止数组内部修改？

<details>

<summary>提示 1：修改哪个数组</summary>

对 copied 追加，不对 numbers 追加。

</details>

<details>

<summary>提示 2：方法语法</summary>

数组.push(元素) 会修改调用它的数组。先观察效果，后面的消息添加函数要求返回新数组。

</details>

## 05. 普通函数与返回值

练习位置：`task1/0-js-basics.ts`

**目标**：确认参数传入与结果返回。

**动手**：

- 运行下面的 double 函数，再分别用 0 和 -2 调用它。

```ts
function double(value: number): number {
  return value * 2;
}
console.log(double(3));
```

**验收**：

- 输入 3、0、-2 时，分别返回 6、0、-4。

**检查问题**：实参 3 怎样传给 value？返回值来自哪一行？

<details>

<summary>参数与类型</summary>

value: number 描述参数类型，括号后的 : number 描述返回类型；return value * 2 是 JS 的计算与返回。

</details>

## 06. 改写成箭头函数

练习位置：`task1/0-js-basics.ts`

**目标**：学会一个简单的箭头函数。

**动手**：

- 保留 double，自己写 doubleArrow：接收一个数字，返回它的两倍。

**验收**：

- doubleArrow 对 3、0、-2 的结果与 double 一致。

**检查问题**：=> 后直接写表达式，与使用花括号时的 return 有什么区别？

<details>

<summary>提示 1：表达式版本</summary>

参考这个原样返回参数的函数，再改成翻倍。

```ts
const identity = (value: number): number => value;
```

</details>

<details>

<summary>提示 2：花括号版本</summary>

使用花括号时显式写 return。本步只比较参数与返回值，其他差异之后用到时再学。

```ts
const identityWithBlock = (value: number): number => {
  return value;
};
```

</details>

## 07. 让 filter 调用回调

练习位置：`task1/0-js-basics.ts`

**目标**：理解数组如何调用你提供的函数。

**动手**：

- 先预测输出，再运行下面的筛选实验。
- 临时在回调内打印 value，观察每次传入的值；观察后去掉这行日志。

```ts
const values = [1, 2, 3, 4];
const larger = values.filter(function (value) {
  return value > 2;
});
console.log(larger);
console.log(values);
```

**验收**：

- 结果为 [3, 4]，原数组仍为 [1, 2, 3, 4]；回调依次收到 1、2、3、4。

**检查问题**：回调由谁调用？它接收一个元素，还是整个数组？

<details>

<summary>回调的返回值</summary>

filter 对每个元素执行回调，返回真值时保留当前元素，否则丢弃。这里的比较表达式返回 true 或 false；不要返回元素来代替条件。

</details>

## 08. 改写筛选条件

练习位置：`task1/0-js-basics.ts`

**目标**：把箭头函数用到 filter，再独立改变条件。

**动手**：

- 先把上一步的普通回调改成箭头函数，保持筛选结果一致。通过后再改条件，只保留偶数。一次只改一处。

**验收**：

- 改写后大于 2 的结果仍为 [3, 4]；改为偶数后是 [2, 4]；原数组不变。

**检查问题**：比较条件怎样决定一个元素是否被保留？

<details>

<summary>提示 1：回调形状</summary>

把 filter 接收的函数写成 (value) => 条件表达式。

</details>

<details>

<summary>提示 2：偶数判断</summary>

用取余运算 % 检查一个数除以 2 的余数是否为 0。

</details>

## 09. 限制消息角色

练习位置：`task1/9-message.ts`

**目标**：用字面量联合表达允许的角色。

**动手**：

- 创建 task1/9-message.ts，末尾写 export {};。定义 Role，只允许 user、assistant、system。
- 创建一个明确标注为 Role 的变量。先赋合法值，再尝试 robot，检查后恢复。

执行命令：

```powershell
tsc --strict --noEmit task1/9-message.ts
node task1/9-message.ts
```

**验收**：

- 合法角色通过严格检查；robot 被类型检查拒绝。

**检查问题**：如果 Role 改成 string，检查会漏掉哪种错误？

<details>

<summary>提示 1：可选值</summary>

用字面量联合连接允许的值。在类型位置，| 表达可选类型，不执行 C 的按位或。

</details>

<details>

<summary>提示 2：其他类型的例子</summary>

把这个模式迁移到消息角色。

```ts
type SwitchState = "on" | "off";
```

</details>

## 10. 描述第一条消息

练习位置：`task1/9-message.ts`

**目标**：用对象类型约束一条消息。

**动手**：

- 定义 Message，字段为数字 id、角色 role、字符串 content。
- 创建 first，明确标注为 Message：id 为 1，角色为 user，内容为 你好。打印 first.content。

**验收**：

- 严格检查通过；运行输出 你好。

**检查问题**：运行时还存在 Message 这个类型吗？

<details>

<summary>提示 1：字段类型</summary>

interface 描述对象字段。把 Role 用作 role 的类型，不要把角色重新写成任意 string。

</details>

<details>

<summary>提示 2：语法参考</summary>

参考其他对象的类型；对象值中的字段用逗号分隔。

```ts
interface SwitchInfo {
  id: number;
  state: SwitchState;
}
```

</details>

## 11. 故意写错再修复

练习位置：`task1/9-message.ts`

**目标**：亲自确认检查能发现错误。

**动手**：

- 依次修改 first：角色改成 robot、content 改成数字 123、删除 content。每次只做一种错误，执行类型检查，记录报错后恢复。

**验收**：

- 分别发现非法角色、字段类型错误、缺少必填字段；最终恢复后检查通过。

**检查问题**：哪些限制是 TS 检查出来的，哪些需要程序在运行时检查？

<details>

<summary>看证据</summary>

保留完整命令与错误信息，不靠能否运行判断类型是否正确。对象类型约束不会自动变成运行时校验。

</details>

## 12. 建立消息数组

练习位置：`task1/9-message.ts`

**目标**：把多条消息放进有类型的数组。

**动手**：

- 创建助手消息 second，id 为 2，内容自定。定义 messages: Message[]，按顺序放入 first 和 second。
- 打印长度与两个角色；临时放入数字 123，确认检查拒绝后恢复。

**验收**：

- 长度为 2，角色顺序为 user、assistant；数字不能作为消息元素。

**检查问题**：Message[] 限制数组长度，还是元素类型？

<details>

<summary>数组语法</summary>

数字数组可写为 const items: number[] = [1, 2]。把元素类型与元素换成消息。

</details>

## 13. 添加消息，保留原数组

练习位置：`task1/9-message.ts`

**目标**：将展开实验迁移到消息数组。

**动手**：

- 写 addMessage(list: Message[], message: Message): Message[]，返回带有新消息的新数组。
- 创建 third：id 为 3，角色为 user，内容自定。把添加到 messages 的结果保存为 updated。

**验收**：

- 原数组 id 为 [1, 2]，新数组 id 为 [1, 2, 3]；长度分别为 2、3；messages === updated 为 false。
- 向空数组添加 third，得到仅含 id 3 的数组；原有消息内容不变。

**检查问题**：直接对 list 使用 push，能否满足保留原数组的要求？

<details>

<summary>提示 1：回想展开实验</summary>

用原数组元素与新消息组成一个新数组，再返回它。

</details>

<details>

<summary>提示 2：函数骨架</summary>

完成时替换占位 throw。它只让未实现的函数在调用时明确失败，不表示练习完成。

```ts
function addMessage(list: Message[], message: Message): Message[] {
  throw new Error("请先完成函数体");
}
```

</details>

<details>

<summary>验收后再看：浅拷贝</summary>

先预测 false、true，再运行。新数组不同，但其中的消息对象仍共享；本阶段不要求深拷贝。

```ts
const original = [first];
const shallow = [...original];
console.log(original === shallow);
console.log(original[0] === shallow[0]);
```

</details>

## 14. 筛选用户消息

练习位置：`task1/9-message.ts`

**目标**：将 filter 实验迁移到消息筛选。

**动手**：

- 写 getUserMessages(list: Message[]): Message[]，按原顺序返回用户消息。
- 依次检查 messages、updated、仅含 second 的数组和空数组。

**验收**：

- 结果 id 依次为 [1]、[1, 3]、[]、[]；输入数组的长度、顺序与内容不变。

**检查问题**：回调参数为什么通常不用再写 : Message？角色比较发生在检查时，还是运行时？

<details>

<summary>提示 1：当前元素是消息</summary>

数字实验比较元素的数值；这里比较当前消息的 role 是否等于目标角色。

</details>

<details>

<summary>提示 2：先普通函数，再箭头</summary>

先用普通函数作为回调，只写一个角色比较条件。通过后改成箭头函数，并观察 TS 从 Message[] 推断参数类型。

</details>

## 15. 独立筛选助手消息

练习位置：`task1/9-message.ts`

**目标**：不看提示，独立完成一次需求变化。

**动手**：

- 关闭前面提示，写 getAssistantMessages，只保留助手消息。
- 检查 updated 与空数组。随后解释 Role、Message[]、展开、箭头函数、filter 各自负责什么。

**验收**：

- updated 的结果 id 为 [2]，空数组的结果为 []；原数组不变；严格检查通过。
- 能解释关键代码，且没有照搬前面的提示。

**检查问题**：哪部分是 TS 类型约束，哪部分是 JS 运行行为？

## 过关与求助

- [ ] JS 小实验通过，能解释回调如何执行。
- [ ] 消息练习通过严格检查，故意写错时检查能发现。
- [ ] 添加与筛选覆盖正常输入、无匹配消息与空数组，原数组不变。
- [ ] 不看提示完成助手筛选，能解释关键代码。

全部满足后，回到 [项目路线](../README.md) 勾选第 1 阶段。卡住时提供小任务编号、文件路径、代码、执行命令、预期结果和完整输出；我每轮给一级提示，等你尝试后继续。

参考：[Node 24 的 TS 支持说明](https://nodejs.org/docs/latest-v24.x/api/typescript.html#type-stripping)、[TS 日常类型](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html)。
