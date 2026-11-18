# 三案例数据来源与核验

核验日期：2026-11-18。公开数据全部来自官方 GitHub 或 npm。模型与协议数据是本地预置，不能视作已执行计算。

## 案例事实

| 案例 | Tag / commit | 直接依赖 | 公告与修复 |
| --- | --- | --- | --- |
| Express 4.17.1 | 4.17.1 / e1b45ebd050b6f06aa38cda5aaf0c21708b0c71e | 30 | CVE-2024-43796；4.x <4.20.0；本分支修复4.20.0 |
| Axios 1.6.7 | v1.6.7 / a52e4d9af51205959ef924f87bcf90c605e08a1e | 3 | CVE-2024-39338；>=1.3.2,<=1.7.3；修复1.7.4 |
| Koa 2.15.3 | 2.15.3 / 77cbf2e47ea7067c937b0f21ea0aa4fb73bac115 | 23 | CVE-2025-25200；2.x >=2.0.0,<2.15.4；本分支修复2.15.4 |

三案例均为 MIT。Axios 为 annotated tag，已进一步读取 tag object 获取 commit，未误用 tag-object SHA。所有数据计数只使用 dependencies，不计 devDependencies。

## 锁文件与关系边界

- Express tag 根目录无锁文件，保留声明约束。二级结构取 body-parser@1.19.0、serve-static@1.14.1 的 npm 元数据。
- Axios 官方 lock 根版本与 manifest 同为1.6.7。锁定 follow-redirects 1.15.4、form-data4.0.0、proxy-from-env1.1.0；对应依赖声明也单独保留。form-data 二级声明取官方4.0.0元数据。
- Koa tag 随附锁文件的根版本仍是2.14.3，与 manifest 2.15.3 不一致。锁记录仅为官方随附快照，不推断为2.15.3真实安装结果。accepts锁记录1.3.7、cookies0.9.0；图谱展示的是显式说明的声明关系，二级关系取 accepts@1.3.5、cookies@0.9.0 的元数据。
- 原始 lock 全文保留，运行时只导入轻量锁摘要，避免打包上千个无关开发依赖。
- 图谱为局部声明关系子集，不是完整依赖解析树或 SBOM。

## 公告与评分

- Express：GHSA-qw6h-vgh9-j6wx，GitHub当前LOW，CVSS v4.0 2.3；另含5.x alpha到5.0.0之前的影响分支。
- Axios：GHSA-8hc4-vh64-cxmj，HIGH；官方 API 没有有效 CVSS vector/score，界面显示未提供，不采纳聚合站猜测分数。
- Koa：GHSA-593f-38f6-jp5m，CRITICAL，CVSS v4.0 9.2。其他受影响分支为<0.21.2；>=1.0.0,<1.7.1；>=3.0.0-alpha.0,<3.0.0-alpha.3，对应修复0.21.2、1.7.1、3.0.0-alpha.3。

三个公告都影响对应根包。精选一条不代表没有其他漏洞；未匹配不意味着安全。修复版本是此条公告的修复，不声称为当前最新或全面安全的版本。

## 本地预置记录

根包预置GNN分数：Express0.78、Axios0.86、Koa0.91，模型标识GNN-preset-v1。分数不是漏洞概率，没有真实训练或推理结果。查看依赖节点时仍明确记录的预测目标为案例根包，不把分数移植到该节点。

协议数据为protocol-simulation。用户点击密态分析后显示ASS/BFV/FSS材料结构与案例绑定输出；阶段由用户选择，没有定时推进或跨页脚本。双云不串通为说明性假设，不构成实际协议安全证明。

## 原始快照与哈希

以下SHA256针对保存后的格式化JSON文件；不是原始HTTP响应字节。

- data/express-package.json
  来源：https://raw.githubusercontent.com/expressjs/express/4.17.1/package.json
  SHA256：`da3ce527ac7912fb61c7015040e7ee5137a7e842e1663de5391142c9832b3a8d`

- data/tag.json
  来源：https://api.github.com/repos/expressjs/express/git/ref/tags/4.17.1
  SHA256：`efe8378f430c9abb982e54ef2415da2d4cb068e4b2c071ea9c0bdf01b646a984`

- data/advisory.json
  来源：https://raw.githubusercontent.com/github/advisory-database/main/advisories/github-reviewed/2024/09/GHSA-qw6h-vgh9-j6wx/GHSA-qw6h-vgh9-j6wx.json
  SHA256：`d0da2902224c8b5b6f11edd68d14900d9356218aaad20e9d9c204768b32ecad2`

- data/tree.json
  来源：https://api.github.com/repos/expressjs/express/git/trees/4.17.1
  SHA256：`7df0ff1d150fb4ee48a8186f7e17c4ea6d6a2924cdf13e4afe23f7916ef0f60c`

- data/body-parser.json
  来源：https://registry.npmjs.org/body-parser/1.19.0
  SHA256：`bb053d0bfa80242b995545777a0bfd6adfe93cf4431ed6e4015659caeb00acd1`

- data/serve-static.json
  来源：https://registry.npmjs.org/serve-static/1.14.1
  SHA256：`d99dfec7d9210205e7bd92d899799dd5352041c1459e49e7bf92865555426cc2`

- data/axios-package.json
  来源：https://raw.githubusercontent.com/axios/axios/v1.6.7/package.json
  SHA256：`6735c88370016d6645c6cfa2e19cbddec0f7043d67e09615cc723c1435664dce`

- data/axios-tag.json
  来源：https://api.github.com/repos/axios/axios/git/ref/tags/v1.6.7
  SHA256：`736427eb02088140d35858ea9ef149cde908877cf42295870e799f3e0ab99912`

- data/axios-tree.json
  来源：https://api.github.com/repos/axios/axios/git/trees/v1.6.7
  SHA256：`783e329b5b276decc1b2c15036fc715bb400cdfb26555bb4e0cfbad37d11a054`

- data/axios-lock.json
  来源：https://raw.githubusercontent.com/axios/axios/v1.6.7/package-lock.json
  SHA256：`9333e67200971e7a9aa2477b8ac4bde0da472dbaad540627d1342ce1d299a97a`

- data/koa-package.json
  来源：https://raw.githubusercontent.com/koajs/koa/2.15.3/package.json
  SHA256：`bea6bab40aadfdd8001fbc07c0cd66af275e74486af91c58f081fcec82163dc0`

- data/koa-tag.json
  来源：https://api.github.com/repos/koajs/koa/git/ref/tags/2.15.3
  SHA256：`8230123e303a1b6f2e968373d629bdf9bcc19de9f36f272c702dd4ba75ef7a3d`

- data/koa-tree.json
  来源：https://api.github.com/repos/koajs/koa/git/trees/2.15.3
  SHA256：`21b3ede2b6c629bd18da5074b29cd5f85ffa85085c3e3ec0d7fb5760fc0fed5e`

- data/koa-lock.json
  来源：https://raw.githubusercontent.com/koajs/koa/2.15.3/package-lock.json
  SHA256：`cff5b6bc3776357a1fc24f542f003f58c9196a038d709c24dd8403c58d78f1b1`

- data/axios-advisory.json
  来源：https://api.github.com/advisories/GHSA-8hc4-vh64-cxmj
  SHA256：`e073954e44b9ecca890ae9f09b5cc87a74575c2d1b5120851ea67e34cdc905b4`

- data/koa-advisory.json
  来源：https://api.github.com/advisories/GHSA-593f-38f6-jp5m
  SHA256：`eaf9c9d63a273fb6b1ef099f6697b0dded127077427aed6ccb2d2134259d15b4`

- data/axios-tag-object.json
  来源：https://api.github.com/repos/axios/axios/git/tags/f187a000102c6063f137db3fffe03623294b02c0
  SHA256：`689cfbc4cbe84a64bfb162c644474be0493981f60df6b3c39d8d3d9c786b4a19`

- data/form-data.json
  来源：https://registry.npmjs.org/form-data/4.0.0
  SHA256：`c54f423fca1780a5ed4600a40d0cf353981909822377727b4b5f341369b3d130`

- data/follow-redirects.json
  来源：https://registry.npmjs.org/follow-redirects/1.15.4
  SHA256：`8429d14e3fc58c87863aa93947529149c831fd12ae4d1a647f8624775beef487`

- data/koa-accepts.json
  来源：https://registry.npmjs.org/accepts/1.3.5
  SHA256：`babec97d0b51fe110effe0741038e287b1425025b5c64c0fb4416a6628f63eca`

- data/koa-cookies.json
  来源：https://registry.npmjs.org/cookies/0.9.0
  SHA256：`92a649a1c8d869b87ac63570d7a81998fdad49b24d6ec7291254df54bc996297`

- data/axios-lock-summary.json
  来源：data/axios-lock.json
  SHA256：`8280445cb6808022d291c36bb7ba2bcbd2a180abc41d5fe027890626378384a0`

- data/koa-lock-summary.json
  来源：data/koa-lock.json
  SHA256：`379a2d163e4ed3c6d7a6a07f62731e1d6270e47ab7176b6061de6c1d099a2fcd`

