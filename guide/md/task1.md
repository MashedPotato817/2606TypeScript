# 第 1 阶段：消息列表

[返回项目路线](../README.md)

目标：用 TS 描述合法消息，用 JS 添加和筛选消息，为后续智能体面板准备数据。每次只做当前步骤，通过验收再继续。

所有练习放在仓库根目录 `task1/` 下：JS 小实验用 `0-js-basics.ts`，消息列表用 `9-message.ts`。文件由你创建，后续 6 个阶段也继续在 `task1/` 下完成。

## 0. 准备检查与运行

在仓库根目录执行：

```powershell
node --version
tsc --version
```

本指导书使用 Node 24 或更高版本直接运行可擦除类型语法。已有 `tsc` 时优先使用它；如果找不到命令，可用 `npx --package typescript tsc` 替代，首次可能需要下载 TypeScript。

创建 `task1/0-js-basics.ts`，先写 `console.log("开始练习");`，文件末尾写 `export {};`。它把文件标记为模块，避免多个练习的同名变量影响类型检查。后续代码都写在这行之前。

每次修改后，先检查，再运行：

```powershell
tsc --strict --noEmit task1/0-js-basics.ts
node task1/0-js-basics.ts
```

`--strict` 开启严格检查，`--noEmit` 表示不生成 JS 文件。验收：检查无报错，运行输出 `开始练习`。

Node 运行时擦除类型，不做类型检查；它的默认运行方式也不支持需要转换的 `enum` 等语法。不要把本练习的运行命令直接套到所有已有 TS 练习上。依据：[Node 24 的 TS 支持说明](https://nodejs.org/docs/latest-v24.x/api/typescript.html#type-stripping)。

## 1. JS 小实验：先理解数组与函数

下面三段实验均写在 `task1/0-js-basics.ts`，每段先预测输出，再检查和运行。实验中的语法属于 JavaScript，TS 可以检查其中的数据类型。

### 1.1 展开：用旧数组组成新数组

先观察这段语法：

```ts
const numbers = [1, 2];
const copied = [...numbers, 3];
console.log(numbers);
console.log(copied);
console.log(numbers === copied);
```

`...numbers` 把数组里的元素放进新数组。`===` 在这里比较两个变量是否指向同一个数组。

你的任务：运行后，在 `copied` 末尾追加 `4`，再次打印两个数组。

验收：开始时分别是 `[1, 2]`、`[1, 2, 3]`、`false`；追加后 `numbers` 仍为 `[1, 2]`，`copied` 为 `[1, 2, 3, 4]`。

检查问题：`const` 限制的是重新赋值，还是数组内部的修改？

<details>
<summary>卡住再看：追加元素的语法</summary>

数组的 `push` 方法会修改调用它的数组，例如 `copied.push(4)`。本实验用它观察修改发生在哪个数组；后面的消息添加函数要求返回新数组。

</details>

### 1.2 箭头函数：先从普通函数改写

```ts
function double(value: number): number {
  return value * 2;
}

console.log(double(3));
```

你的任务：保留普通函数，再写一个名为 `doubleArrow` 的箭头函数，接收一个数字并返回它的两倍。

验收：输入 `3` 时两者都返回 `6`；输入 `0` 时都返回 `0`；输入 `-2` 时都返回 `-4`。

检查问题：调用函数时，实参如何传给 `value`？为什么 `=>` 后没有花括号时可以省略 `return`？

<details>
<summary>提示 1：箭头函数的形状</summary>

```ts
const identity = (value: number): number => value;
```

左边保存函数，右边的 `value` 是参数。最后一个 `value` 是要返回的表达式。把这个思路用于翻倍函数。

</details>

<details>
<summary>提示 2：使用花括号的版本</summary>

```ts
const identityWithBlock = (value: number): number => {
  return value;
};
```

本练习只比较参数与返回值；箭头函数还有其他行为差异，之后用到时再学。

</details>

### 1.3 filter：把函数交给数组执行

```ts
const values = [1, 2, 3, 4];
const larger = values.filter(function (value) {
  return value > 2;
});
console.log(larger);
console.log(values);
```

`filter` 会遍历数组，对每个元素调用你传入的函数。这个函数称为回调：返回真值时保留当前元素，否则丢弃。这里用比较表达式返回 `true` 或 `false`。

你的任务：先用普通函数筛选，再将回调改写为箭头函数。最后自己改条件，只保留偶数。

验收：大于 `2` 的结果为 `[3, 4]`，偶数结果为 `[2, 4]`；两种函数写法结果一致；原数组仍为 `[1, 2, 3, 4]`。

检查问题：回调中的 `value` 每次是什么？是谁调用了这个函数？

<details>
<summary>提示 1：回调接收一个元素，不是整个数组</summary>

在回调里打印 `value`，观察它依次是 `1`、`2`、`3`、`4`。`filter` 根据每次返回的条件决定是否保留这个元素，不要求回调返回元素本身。

</details>

<details>
<summary>提示 2：连接前两个知识点</summary>

把 `filter` 接收的普通函数改成 `(value) => 条件表达式`。判断偶数可以用取余运算 `%`，再比较余数是否为 `0`。

</details>

完成三个实验，并能解释展开、箭头函数、回调和 `filter` 的用途，再进入消息练习。

## 2. 描述一条合法消息

创建 `task1/9-message.ts`，末尾保留 `export {};`。后续统一执行：

```powershell
tsc --strict --noEmit task1/9-message.ts
node task1/9-message.ts
```

你的任务：

1. 定义 `Role`，只允许 `user`、`assistant`、`system` 三种角色。
2. 定义 `Message`，字段为数字 `id`、角色 `role`、字符串 `content`。
3. 创建 `first`，给它明确的 `Message` 类型：`id` 为 `1`，角色为 `user`，内容为 `你好`。
4. 打印 `first.content`。

验收：合法消息通过严格检查，运行输出 `你好`。依次尝试下面的错误，每次只改一处，检查后恢复：

| 改动 | 类型检查应发现什么 |
| --- | --- |
| 角色改为 `"robot"` | 不属于允许的角色 |
| 内容改为数字 `123` | 字段类型错误 |
| 删除 `content` | 缺少必填字段 |

检查问题：如果把 `Role` 换成 `string`，上面哪种错误会漏过检查？运行时还存在 `Message` 这个类型吗？

<details>
<summary>提示 1：先限制角色的可选值</summary>

字面量联合用 `|` 连接几个允许的值。在类型位置，它表达可选类型，不执行 C 的按位或。

</details>

<details>
<summary>提示 2：类型的语法参考</summary>

```ts
type SwitchState = "on" | "off";

interface SwitchInfo {
  id: number;
  state: SwitchState;
}
```

把这个模式用于角色和消息。`const first: Message = ...` 用于检查对象是否满足消息要求；对象字段用 `字段名: 值`，字段之间用逗号分隔。

</details>

## 3. 建立消息数组

你的任务：再创建助手消息 `second`，`id` 为 `2`，内容自定。定义 `messages: Message[]`，按顺序放入 `first` 和 `second`。

验收：长度为 `2`，角色顺序为 `user`、`assistant`。尝试放入数字 `123`，确认检查报错后恢复。

检查问题：`Message[]` 限制数组长度，还是元素类型？

<details>
<summary>提示：数组语法</summary>

数字数组写作 `const items: number[] = [1, 2]`。把元素类型换成 `Message`，元素换成已经创建的消息。

</details>

## 4. 添加消息，保留原数组

你的任务：写 `addMessage(list: Message[], message: Message): Message[]`，返回包含原有消息和新消息的新数组。创建 `third`：`id` 为 `3`，角色为 `user`，内容自定。调用后把结果保存为 `updated`。

验收：

| 检查项 | 预期 |
| --- | --- |
| `messages.length` | `2` |
| `updated.length` | `3` |
| 两个数组的 id 顺序 | 原数组 `[1, 2]`，新数组 `[1, 2, 3]` |
| `messages === updated` | `false` |
| 向空数组添加 `third` | 得到仅含 id `3` 的数组 |

检查问题：直接对 `list` 调用 `push` 能否满足要求？展开数组后，里面的消息对象也独立复制了吗？

<details>
<summary>提示 1：回想展开实验</summary>

把原数组的元素放进一个新数组，再放入新消息，返回这个新数组。

</details>

<details>
<summary>提示 2：先补函数骨架</summary>

```ts
function addMessage(list: Message[], message: Message): Message[] {
  // 在这里返回新数组
  throw new Error("请先完成函数体");
}
```

占位的 `throw` 让未实现的函数在调用时明确失败；它不表示练习完成。完成时替换为你自己的实现。

</details>

<details>
<summary>通过验收后再看：浅拷贝实验</summary>

在已有 `first` 的基础上做独立实验：

```ts
const original = [first];
const shallow = [...original];
console.log(original === shallow);
console.log(original[0] === shallow[0]);
```

预期是 `false`、`true`。新数组和旧数组不同，但其中的对象仍是同一个对象。如果修改消息对象的字段，两边都会看到变化；本阶段不要求深拷贝。

</details>

## 5. 筛选用户消息

你的任务：写 `getUserMessages(list: Message[]): Message[]`，按原顺序返回角色为 `user` 的消息，保持输入数组不变。

验收：打印结果中的 id，检查以下四种输入：

| 输入 | 结果 id |
| --- | --- |
| `messages` | `[1]` |
| `updated` | `[1, 3]` |
| 仅含 `second` 的数组 | `[]` |
| 空数组 | `[]` |

运行筛选前后，`messages` 和 `updated` 的长度、id 顺序及消息内容应一致。把鼠标放到回调参数上，观察 TS 推断的类型。

检查问题：为什么通常不用给回调参数再手写 `: Message`？筛选时的比较属于 TS 类型检查，还是 JS 运行行为？

<details>
<summary>提示 1：把数字筛选迁移到消息筛选</summary>

数字实验比较当前元素的数值；这里比较当前消息的 `role` 字段是否等于目标角色。

</details>

<details>
<summary>提示 2：拆开看回调</summary>

先用普通函数作为 `filter` 的回调，只写一个角色比较条件，确认结果后再改成箭头函数。参数类型可以从 `Message[]` 推断出来。

</details>

## 6. 关掉提示，独立变式

1. 增加 `getAssistantMessages`，筛选助手消息。对 `updated` 应得到 id `[2]`，对空数组应得到 `[]`。
2. 给新消息使用角色 `"robot"`，确认严格检查拒绝它，然后修复。
3. 用自己的话解释：角色联合类型、`Message[]`、展开、箭头函数、`filter` 各自负责什么。

完成记录：

- [ ] 三个 JS 小实验均通过，能解释回调如何执行。
- [ ] 消息练习通过严格类型检查，故意写错时检查能发现。
- [ ] 添加与筛选通过上述输入检查，原数组不变。
- [ ] 不看提示完成助手筛选，并能解释关键代码。

全部完成后，回到 [项目路线](../README.md) 勾选第 1 阶段。卡住时提交当前步骤、代码、命令和完整输出，我每轮给一级提示，等你尝试后继续。

参考：[TS 日常类型](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html)。
