# 视觉验收记录（手动应用版）

参考标准：用户提供的白色企业级 SaaS 截图。保留固定侧栏、全局工具栏、浅色卡片、依赖表、来源链接与一致的风险状态色。已去除底部播放条、时间轴与演示入口。

## 页面截图

最终主案例图为 1920×1080 viewport，路径：

- screenshots/01-overview.png：仓库摘要、3 个可选案例、当前依赖数、精选公告、图谱预览和组件清单。
- screenshots/02-intelligence.png：固定 DAG、可点击路径、案例专属预置 GNN 结果及模型/事实边界。
- screenshots/03-secure-compute.png：手动阶段、双云计算角色、流程模拟材料与当前案例对应输出。
- screenshots/04-report.png：根包影响、公告、预置结果、修复行动、复核与来源。

三个案例的 12 张截图分别存于 screenshots/express、screenshots/axios、screenshots/koa。Axios 仅有三项生产依赖，保留真实数量，用分析说明解释精简结构，不补造依赖。

已逐页检查卡片边界、表格、中文字体、图谱节点、版本与公告、选中和动作反馈。GNN 面板支持局部滚动，避免较矮屏幕溢出；1366×768 页面允许纵向滚动。

报告 print media 保存为 screenshots/report-print.pdf，隐藏应用操作栏和会话复核控件，保留公开事实、结果标注与来源。未在实体投影设备验收。

截图设置 animations: disabled，仅在采集时结束短过渡，应用运行仍保留必要的按钮反馈与页面过渡。

## 大字号最终版

已按用户补充要求统一微软雅黑、扩大四页字号，删除默认页面中的解释小字。截图保存前回到页面顶部，长报告内容可滚动查看。额外保存完整报告长图用于检查全部模块。浏览器实际中文字体核验为Microsoft YaHei（本机字体，不是下载字体）。

## 导航精简验收

已按用户9项页面批注删除/改名，新增1092×871头像菜单截图 screenshots/05-avatar-navigation.png 与折叠工作台截图 screenshots/06-workspace-collapsed.png。重新采集三个案例四页截图；移除面包屑后内容区从页面标题开始。
