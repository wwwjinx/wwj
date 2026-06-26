# wwj

基于 GitHub 模板仓库的交互式项目脚手架工具，类似 `create-vite`。

## 用法

```bash
# 交互式创建
npx @yugutou/wwj create

# 指定项目名，跳过名称输入
npx @yugutou/wwj create my-app
```

### 交互流程

```
✔ Project name: … my-app
✔ Select template: › vue / react / koa / nestjs

✔ Downloading template from yugutou-cli/vue-template...
✔ Template extracted to my-app/
✔ Project name updated in package.json

  Done! cd my-app && pnpm install
```

## 安装

```bash
pnpm install
```

## 开发

```bash
pnpm dev create my-app
```

## 构建

```bash
pnpm build
```

## 脚本命令

| 命令 | 描述 |
|------|------|
| `pnpm dev create <name>` | 开发模式运行 |
| `pnpm build` | 编译 TypeScript |
| `pnpm publish` | 发布到 npm |

## 模板映射

模板配置在 `src/templates.ts`：

| 选项 | GitHub 仓库 |
|------|------------|
| vue | `yugutou-cli/vue-template` |
| react | `yugutou-cli/react-template` |
| koa | `yugutou-cli/koa-template` |
| nestjs | `yugutou-cli/nestjs-template` |

## 技术栈

- **运行时**: Node.js >= 18
- **语言**: TypeScript
- **CLI 框架**: cac
- **交互提示**: @clack/prompts
- **模板下载**: degit（跳过 .git 历史）
- **包管理器**: pnpm

## 项目结构

```
wwj/
├── src/
│   ├── index.ts              # CLI 入口
│   ├── templates.ts          # 模板映射表
│   ├── commands/
│   │   └── create.ts         # wwj create 逻辑
│   └── utils/
│       ├── download.ts       # 模板下载
│       └── rename.ts         # 项目重命名
├── dist/                     # 编译产物
├── package.json
├── tsconfig.json
└── README.md
```

## 添加新模板

在 `src/templates.ts` 的 `templates` 数组中添加条目：

```ts
{ name: 'svelte', repo: 'yugutou-cli/svelte-template', display: 'Svelte' },
```

然后在 `yugutou-cli` 下创建同名仓库即可。
