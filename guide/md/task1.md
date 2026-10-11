# 任务 1：消息列表

今天只做消息数据，不做页面。目标是学会用 TS 限制角色，用 JS 添加和筛选消息。

练习文件：自己创建 `ts/9-message.ts`。每次只做一步，不必一次写完。

## 第 0 步：知道怎么检查和运行

在仓库根目录的终端中执行：

```powershell
npx --package typescript tsc --strict --noEmit ts/9-message.ts
```

这是类型检查。`--strict` 开启严格检查，`--noEmit` 表示不生成 JS 文件。首次使用可能提示下载 TypeScript；已有 `tsc` 时可直接用 `tsc` 替换命令前面的 `npx --package typescript tsc`。

修复类型错误后，再运行：

```powershell
node ts/9-message.ts
```

当前机器的 Node 是 v24.18.0，可以直接运行本练习中的可擦除 TS 语法。Node 会去掉类型后执行，不做类型检查，所以两个步骤都要做。这种运行方式不能直接运行仓库里的 `enum` 练习。

依据：[Node 的 TS 支持说明](https://nodejs.org/api/typescript.html#type-stripping)。

## 第 1 步：描述一条消息

先手写下面的起步代码：

```ts
type Role = "user" | "assistant" | "system";

interface Message {
  id: number;
  role: Role;
  content: string;
}

const first: Message = {
  id: 1,
  role: "user",
  content: "你好",
};

console.log(first.content);

export {};
```

这里的 `|` 表示类型允许几种选择，不是执行 C 的按位或。`Message` 描述对象需要有哪些字段；`export {}` 延续已有练习的写法，把文件隔离成模块。

先预测输出，再检查、运行。

小实验：每次只改一处，检查后恢复。

1. 把 `role` 改成 `"robot"`。
2. 把 `content` 改成数字 `123`。
3. 删除 `content` 字段。

过关问题：如果把 `Role` 换成 `string`，哪一种错误就检查不出来了？

## 第 2 步：建立消息数组

在 `export {}` 前面添加一个 `Message[]` 数组，放入 `first`，再自己写一条助手消息。

助手消息要求：`id` 为 2，角色为 `assistant`，内容自定。

打印数组长度，预期为 2。再故意放入一个数字，观察检查结果并恢复。

过关问题：`Message[]` 限制的是数组长度，还是数组中元素的类型？

## 第 3 步：添加消息，保留原数组

写这个函数，函数体由你完成：

```ts
function addMessage(list: Message[], message: Message): Message[] {
  // 返回包含原有消息和新消息的新数组
  throw new Error("待实现");
}
```

提示：先试这个 JS 小例子，观察展开语法：

```ts
const numbers = [1, 2];
console.log([...numbers, 3]);
```

理解后，把同样的思路用于消息；删除占位的 `throw`。

调用函数，加入第 3 条消息。打印并核对：原数组长度为 2，新数组长度为 3，两个数组用 `===` 比较为 `false`。

过关问题：`const` 数组可以 `push` 吗？返回新数组是否也复制了里面的每个消息对象？如果不确定，动手改一条消息的 `content`，观察两个数组。

## 第 4 步：筛选用户消息

写 `getUserMessages(list: Message[]): Message[]`，只返回角色为 `user` 的消息。

提示：先理解这个例子：

```ts
const values = [1, 2, 3];
const bigger = values.filter(value => value > 1);
console.log(bigger);
```

`filter` 会对每个元素调用函数，条件为真的元素会被保留。箭头函数和 `filter` 都是 JS 功能。

再用同样的思路筛选消息。把鼠标放到回调参数上，观察 TS 是否已经知道它是 `Message`。

核对：一条用户消息能保留；没有用户消息时返回空数组；原数组长度不变。

过关问题：为什么回调参数通常不需要再手写 `: Message`？

## 第 5 步：不看提示，独立改需求

1. 增加 `getAssistantMessages`，只保留助手消息。
2. 故意传入角色为 `"robot"` 的新消息，确认类型检查拒绝它，再修复。
3. 用自己的话解释：角色联合类型、`Message[]`、展开语法、`filter` 各自解决什么问题。

完成这三项，再回到任务书勾选任务 1。卡住就停在当前步骤，把文件和报错交给我，不必直接跳到下一任务。

参考：[TS 日常类型](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html)。
