# ChainGuard

面向软件供应链的隐私保护图智能安全分析应用。本地预置数据驱动，采用常规企业软件手动交互。

## 启动

双击 `start.cmd`，或在项目目录执行：

```powershell
npm start
# 等价于 node scripts/serve.mjs
```

打开 http://127.0.0.1:4173/overview 。已包含生产构建 `dist/`，查看成品只需 Node.js 22.12+，不需安装依赖或联网。不要直接双击 dist/index.html。

## 开发与验收

```powershell
npm ci
npm run dev
npm run build
```

构建包含 TypeScript 检查。运行自动化验收时：

```powershell
npm run dev -- --port 5174
# 另一个终端
npm test
```

测试使用本机 Google Chrome；可通过 `TEST_BASE_URL` 指定已启动的生产服务器。自动化脚本仅是开发验收工具，不属于应用运行功能。

## 三个固定案例

| 仓库 | 历史版本 | 直接依赖声明 | 当前案例精选公告 |
| --- | --- | --- | --- |
| expressjs/express | 4.17.1 | 30 | CVE-2024-43796 / XSS |
| axios/axios | 1.6.7 | 3 | CVE-2024-39338 / SSRF |
| koajs/koa | 2.15.3 | 23 | CVE-2025-25200 / 正则拒绝服务 |

右上角案例选择器在所有页面可用。切换后，仓库、版本、依赖图、公告、预置研判、协议材料和报告统一映射到当前案例。每个案例的分析、节点选择、协议阶段和复核勾选按案例隔离，在应用内部导航期间保留；刷新后重新初始化分析状态。最近选择的案例保存在 localStorage。

## 四个页面

- `/overview`：仓库摘要、当前案例指标、可点击依赖预览与清单、官方公告、智能研判入口。
- `/intelligence`：固定分层 DAG；点击节点高亮从根包到选中组件的路径；右侧同步公开情报、声明/锁版本与路径；点击“智能研判”载入该案例的本地 GNN 记录。全部直接依赖可筛选与选择，默认图谱之外的选中组件也会加入视图。
- `/secure-compute`：点击“密态分析”载入该案例的预置协议材料和结果；协议未实际执行，界面明确标为“流程模拟”。
- `/report`：可直接打开，无需先完成其他页面。包含当前案例的影响、证据、修复建议和独立复核清单；可在报告页直接载入预置研判；浏览器打印支持保存 PDF。

全局搜索支持三个仓库、对应 CVE/GHSA 和当前案例的软件包。`/` 聚焦搜索，Esc 关闭浮层。没有自动播放、跨页时间轴、空格演示、R 重播或方向键切页。

## 数据边界

公开事实来自官方 GitHub tag、manifest、安全公告与 npm 元数据；原始 JSON、来源 URL、SHA256 在 `data/` 和 `docs/data-sources.md`。

每个案例精选一条公告，不是完整扫描总数。公告均命中根包，不将根包漏洞错误归到依赖节点。未匹配不意味着无漏洞。图谱是声明关系子集，不是完整 SBOM。

- Express tag 根目录无锁文件，不声称安装解析结果。
- Axios tag 有 package-lock.json，根版本 1.6.7 一致；详情区区分声明和锁定版本。
- Koa tag 2.15.3 的锁文件根版本仍为 2.14.3，已明确标注不一致；锁定记录只作为该 tag 附带快照，不能推定为 2.15.3 的安装结果。
- Axios 公告未提供有效 CVSS 分数，显示“未提供”，不自行填值。Koa 严重等级与 9.2 分数采用 CVSS v4.0；Express Low / 2.3 同样来自官方页面。
- GNN-preset-v1 与 0.78 / 0.86 / 0.91 分类分数均为本地预置记录，不是模型实际输出或漏洞概率；预测目标明确为案例根包。
- ASS/BFV/FSS 材料与结果仅为流程模拟，不构成真实密码实现、安全证明或性能声称。

所有运行资源本地加载；只有用户点击官方来源时才需访问外网。没有业务后端、真实扫描、登录、数据库、真实 GNN 或真实协议执行。

## 交付文件

- `src/`：React + TypeScript 源码，共享数据模型和样式。
- `dist/`：可离线启动的生产构建。
- `data/`：三个案例的原始来源、锁文件、轻量锁摘要与 provenance。
- `screenshots/01-overview.png` 至 `04-report.png`：1920×1080 的 Express 主案例截图。
- `screenshots/express/`、`screenshots/axios/`、`screenshots/koa/`：三个案例共 12 张截图。
- `screenshots/report-print.pdf`：报告打印样例。
- `docs/manual-workflow.md`、`docs/functional-acceptance.md`、`docs/visual-acceptance.md`：使用与验收记录。
- `docs/test-results.json`：最新机器验收结果。

主要适配 1920×1080 和 1366×768；较矮屏幕允许滚动。建议 100% 浏览器缩放，未针对移动端设计。

## 界面排版

最终版采用系统微软雅黑，正文与表格16–18px，页面标题32px、卡片标题20px。移除副标题、宣传语、统计注脚与重复说明，保留必要的预置结果/流程模拟状态。长页面正常滚动。
