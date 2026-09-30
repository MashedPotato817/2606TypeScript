---
name: git-workflow
description: 通用 git 开发工作流规范，适用于任何软件项目。当用户提到分支管理、commit 消息格式、合并消息、合并到 main、推送策略、分支命名、"暂定稳定"、"merge 到 main"、"commit 提交规范"、"merge 消息"、"push 备份"等开发工作流话题，或用户开始一个新功能分支、准备提交、准备合并、准备推送时触发。包括分支工作流、MAA 风格 commit 与合并消息格式、分支命名、推送策略与稳定判定标准。
metadata:
  version: "1.0.0"
---

# Git 开发工作流

适用于任何 git 项目（个人仓库）。目标：让提交历史清晰可回溯，main 始终保持在稳定状态。

## 核心原则

1. **main 永远稳定**：只有验证过的成果才允许进入 main。
2. **随时提交**：分支上的提交只用于保存进度与降低试错成本，不要求当前可用。
3. **历史可回溯**：普通合并保住每次实验的来龙去脉。

## 分支工作流

- 所有开发都在分支上进行，不直接提交到 `main`。
- 分支上可以随时 commit 保存，无论改动目前能否正式使用、是否有效、是否只是实验性尝试。
- 只有当你正式使用过、暂定稳定无明显 bug 后，才把分支 merge 到 `main`。
- merge 到 `main` 使用普通合并（保留分支上的提交历史）。
- merge 消息不用默认的 `Merge branch 'xxx' into main`，手动写一条规范格式消息（相当于 PR 标题），格式同 commit：`<类型>(<作用域>): 中文主体`，正文按需分点说明本次合并内容。
- 把 `main` 最新改动同步到工作分支时，用 `chore(branch): 同步main最新改动`。

### 完整流程示例

```bash
# 1. 从最新 main 创建功能分支
git checkout main
git pull
git checkout -b feat/export-pdf

# 2. 开发过程中随时提交（可保存实验性改动）
git add .
git commit -m "feat: 新增导出功能，支持 PDF 格式"

# 3. main 有更新时，同步到工作分支
git checkout main && git pull
git checkout feat/export-pdf
git merge main -m "chore(branch): 同步main最新改动"

# 4. 亲自验证稳定后，合并到 main（普通合并，手动写 merge 消息）
git checkout main
git merge feat/export-pdf -m "feat: 新增导出功能，支持 PDF 格式"
# 正文按需分点：
#   - 支持 PDF / PNG / SVG 三种格式
#   - 修复中文文件名乱码

# 5. 推送
git push origin main
```

## Commit 消息格式

采用 MAA 风格（参考 MaaAssistantArknights）：`<类型>(<可选作用域>): <中文主体>`

- 类型前缀全小写英文、无标点（禁止 `fix.`、`feat!` 之类写法）：
  - `feat` 新功能
  - `fix` 修复
  - `docs` 文档
  - `chore` 杂项 / 维护
  - `style` 样式 / 界面
  - `refactor` 重构
  - `test` 测试
  - `perf` 性能
  - `ci` 持续集成 / 构建脚本
  - 无法归入以上任何类型时，一律用 `chore`
- 可选作用域（英文，小括号内）：如 `fix(server): ...`、`docs(readme): ...`
- 主体用中文描述，关键名词保留英文。
- 多行提交：首行为主题，空一行后写正文，用中文分点说明。
- `git revert` 生成的 `Revert "..."` 保持原样，不要改写。

示例：
- `feat: 新增导出功能，支持 PDF 格式`
- `fix: 修复文件编码检测在 UTF-16 下失效的问题`
- `fix(server): 修复中文输入法下快捷键冲突`
- `docs: 补充开发日志与 README`

## 分支命名

- 英文短横线，带类型前缀：`feat/xxx`、`fix/xxx`、`docs/xxx`、`chore/xxx`
- 示例：`fix/parser-encoding`、`feat/export-pdf`

## 推送策略

- 工作分支可定期推到 `origin` 备份（个人仓库，工作分支允许 force-push）。
- 每次 merge 到 `main` 后，推送 `main`。
- 涉及远端强推 / 改写历史前，先与用户确认。

## 稳定判定标准

- "暂定稳定" = 用户亲自完整使用过一遍、无明显 bug。
- 满足后才允许 merge 到 `main`。
- 若在 main 上发现回归，在分支上修复后重新合入，不要把 main 当作开发场地。

## 撤销与回滚

- 只想撤销某次提交的改动但保留历史：`git revert <commit>`，保留生成的 `Revert "..."` 消息。
- 需要改写本地历史：允许在个人工作分支上使用 `git reset` / `git rebase`，但强推前先与用户确认。

## 冲突处理

- 合并冲突先通读冲突文件，理解双方意图后再解决，不要机械丢弃任何一方。
- 解决完冲突后 `git add` + `git commit`，commit 消息沿用当前合并消息格式。