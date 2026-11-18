# 统一设计系统

本项目以用户参考图为首页视觉基准，保持白色卡片、浅蓝灰工作区、固定导航、全局顶栏、分区表格和克制状态色。

- 背景 #F6F8FB，卡片 #FFFFFF，品牌蓝 #2563EB，文字 #182338，边框 #E6EBF3。
- 成功 #10B981，公开公告 #B87B26，密码流程 #0891B2，模型预置 #7C5BDD。公告实际为 LOW，不使用高危红色制造紧张感。
- 侧栏 244px，顶栏 80px；Full HD 主内容左右 35px；卡片间距 16–21px，圆角 9–10px。
- 页面标题 26px，卡片标题 16px，关键数值 29px；表格 12px，辅助证据标签 10–11px。字体采用本机 Segoe UI / Microsoft YaHei 回退，离线不下载字体。
- Lucide 线性图标，图标 stroke 1.8。徽章统一语义，公开事实 / 模型预置 / 协议模拟始终分区。
- Panel、Badge、Source、RepoBanner、AdvisoryCard 共享组件；四页共用 data.ts 数据。
- 依赖节点按固定三列坐标排列，关闭拖拽和连接修改；选择通过透明度和蓝色路径表达，不使用力导向随机布局。
- Full HD 密度规则保留全部主要模块；1366×768 允许纵向滚动；固定控制器底部保留操作区。

成熟体系参考：GitHub Code Security 的来源证据结构、Socket 的包风险详情、Sonatype 的修复闭环、Wiz Code 的风险上下文。检索评估了 Ant Design Pro 与 React Flow 官方节点示例；为精确贴近参考图并控制体积，采用自有轻量组件与 React Flow，不复制其他品牌布局。

参考链接：https://docs.github.com/en/code-security 、https://socket.dev/ 、https://www.sonatype.com/ 、https://www.wiz.io/platform/wiz-code 、https://github.com/ant-design/ant-design-pro 、https://reactflow.dev/examples/nodes/custom-node 。

手动应用交互：顶部提供三个真实仓库案例选择，页面底部不设置播放条。用户按钮操作载入结果，协议阶段手动切换，短 CSS 动画只表达操作反馈。

## 字体与内容精简（最终）

统一使用 Windows 系统微软雅黑，英文回退 Arial，不加载外部字体。页面标题32px、卡片标题20px，常用正文/表格/操作16–18px，状态与版本14–16px。图谱节点使用24px原始字号，适配视口后保持清楚可读。

移除页面副标题、统计注脚、宣传语、英文装饰标题、重复说明提示、底部说明条；保留来源、版本、业务证据、修复行动与预置/模拟状态。正常工作区不再依靠8–12px注脚表达信息。

字号放大后，报告和较矮屏幕采用正常纵向滚动，不为首屏容纳全部内容而缩小正文。
