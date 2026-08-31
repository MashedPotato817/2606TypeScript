# AGENTS.md

This file provides guidance to AI agents when working with code in this repository.

## 项目定位

TypeScript/JavaScript 前端学习工作区。

- **260604learn/** — 当前学习目录，存放练习代码
- **synth-corruption/** — 已完成的一个 Canvas 2D 游戏示例项目（纯 HTML/CSS/JS）

## 当前学习进度

`260604learn/1-run.html` — 第一个 HTML 练习。后续练习文件会继续添加在此目录。

## 如何运行

所有项目均为纯前端，直接用浏览器打开 `.html` 文件即可运行，无构建步骤，无依赖。

## Synth Corruption 参考

如需要参考完整项目，其架构为 IIFE + `window.SC` 命名空间组织模块，11 个 JS 文件通过 `index.html` 的 `<script>` 标签按依赖顺序加载。状态机驱动（Splash → Playing → Paused → GameOver），双缓冲 Canvas 渲染 + CRT 后处理。

## 用户背景

- 技能：C 嵌入式 + Python AI 智能体
- 当前目标：学习 TypeScript/JavaScript 前端，把智能体能力做成产品
- 学习路线：HTML 基础 → CSS → JavaScript 核心 → TypeScript → React/Next.js

## Git 工作流

以下为开发工作流约定，请遵循。

### 分支工作流

- **所有开发都在分支上进行**，不直接提交到 `main`。
- 分支上可以**随时 commit 保存**，无论该改动目前能否正式使用、是否有效、是否只是实验性尝试。
- 只有当你**正式使用过、暂定稳定无明显 bug** 后，才把分支 merge 到 `main`。
- merge 到 `main` 使用**普通合并**（保留分支上的提交历史）。

### Commit 消息格式

采用 MAA 风格（参考 MaaAssistantArknights）：`<类型>(<可选作用域>): <中文主体>`

- **类型前缀全小写英文**：
  - `feat` 新功能
  - `fix` 修复
  - `docs` 文档
  - `chore` 杂项 / 维护
  - `style` 样式 / 界面
  - `refactor` 重构
  - `test` 测试
  - `perf` 性能
- **可选作用域**（英文，小括号内）：如 `fix(server): ...`、`docs(readme): ...`
- **主体用中文**描述，关键名词保留英文。

示例：
- `feat: 新增触控摇杆，支持手机端操作`
- `fix: 修复 WebSocket frame parser 不支持 16 位扩展长度帧的问题`
- `fix(server): 修复中文输入法下 WASD 按键失效`
- `docs: 补充开发日志与 README`

### 分支命名

- 英文短横线，带类型前缀：`feat/xxx`、`fix/xxx`、`docs/xxx`、`chore/xxx`
- 示例：`fix/web-socket-parser`、`feat/mobile-control`

### 推送策略

- 工作分支可定期推到 `origin` 备份（个人仓库，工作分支允许 force-push）。
- 每次 merge 到 `main` 后，推送 `main`。
- 涉及远端强推 / 改写历史前，先与用户确认。

### 稳定判定标准

- "暂定稳定" = 用户亲自在浏览器中验证过该功能可用、无明显 bug。
- 满足后才允许 merge 到 `main`。
