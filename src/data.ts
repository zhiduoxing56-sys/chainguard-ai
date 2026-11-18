import expressManifest from '../data/express-package.json';
import expressTag from '../data/tag.json';
import body from '../data/body-parser.json';
import serve from '../data/serve-static.json';
import axiosManifest from '../data/axios-package.json';
import axiosTag from '../data/axios-tag-object.json';
import axiosLock from '../data/axios-lock-summary.json';
import form from '../data/form-data.json';
import koaManifest from '../data/koa-package.json';
import koaTag from '../data/koa-tag.json';
import koaLock from '../data/koa-lock-summary.json';
import accepts from '../data/koa-accepts.json';
import cookies from '../data/koa-cookies.json';
import koaAdvisory from '../data/koa-advisory.json';

export type EvidenceKind = 'public-fact' | 'model-preset' | 'protocol-simulation';
export interface Dependency {name:string;version:string;source:string;kind:EvidenceKind}
export interface GraphPackage {name:string;version:string;parent?:string;source:string}
export interface CaseStudy {
 id:string;title:string;name:string;package:string;version:string;tag:string;commit:string;description:string;license:string;category:string;
 sources:{manifest:string;repository:string;advisory:string;lock?:string};
 dependencies:Dependency[];preview:string[];graph:GraphPackage[];lockNote:string;
 advisory:{id:string;cve:string;package:string;title:string;severity:string;severityLabel:string;affected:string;allRanges:string;fixed:string;allFixed:string;score:string;scoreVersion:string;description:string;surface:string;type:string};
 model:{version:string;label:string;score:number;category:string;reason:string;signals:{name:string;value:string}[]};
 remediation:string[];
}
const fact='public-fact' as const;
function base(name:string,tag:string){return {manifest:`https://github.com/${name}/blob/${tag}/package.json`,repository:`https://github.com/${name}/tree/${tag}`,advisory:''}}
function deps(values:Record<string,string>,source:string):Dependency[]{return Object.entries(values).map(([name,version])=>({name,version,source,kind:fact}))}
function graph(root:string,version:string,d:Dependency[],preview:string[],source:string,extra:GraphPackage[]):GraphPackage[]{return [{name:root,version,source},...preview.map(name=>({name,version:d.find(x=>x.name===name)!.version,parent:root,source})),...extra]}
const es=base('expressjs/express','4.17.1');es.advisory='https://github.com/advisories/GHSA-qw6h-vgh9-j6wx';
const ed=deps(expressManifest.dependencies,es.manifest),ep=['body-parser','cookie','path-to-regexp','serve-static','qs','debug'];
const ax=base('axios/axios','v1.6.7');ax.advisory='https://github.com/advisories/GHSA-8hc4-vh64-cxmj';
const ad=deps(axiosManifest.dependencies,ax.manifest),ap=['follow-redirects','form-data','proxy-from-env'];
const ks=base('koajs/koa','2.15.3');ks.advisory='https://github.com/advisories/GHSA-593f-38f6-jp5m';
const kd=deps(koaManifest.dependencies,ks.manifest),kp=['accepts','cookies','koa-compose','debug','http-errors','koa-convert'];
export const cases:CaseStudy[]=[{
 id:'express',title:'Express',name:'expressjs/express',package:'express',version:expressManifest.version,tag:'4.17.1',commit:expressTag.object.sha,description:'Fast, unopinionated, minimalist web framework for Node.js',license:expressManifest.license,category:'Web 应用框架',sources:es,
 dependencies:ed,preview:ep,graph:graph('express',expressManifest.version,ed,ep,es.manifest,[...['raw-body','bytes','iconv-lite'].map(name=>({name,version:(body.dependencies as Record<string,string>)[name],parent:'body-parser',source:'https://registry.npmjs.org/body-parser/1.19.0'})),{name:'send',version:serve.dependencies.send,parent:'serve-static',source:'https://registry.npmjs.org/serve-static/1.14.1'}]),lockNote:'该 tag 根目录无锁文件；图谱为依赖声明关系。',
 advisory:{id:'GHSA-qw6h-vgh9-j6wx',cve:'CVE-2024-43796',package:'express',title:'Express 重定向跨站脚本漏洞',severity:'Low',severityLabel:'低危',affected:'< 4.20.0（4.x 分支）',allRanges:'< 4.20.0；另含 ≥ 5.0.0-alpha.1, < 5.0.0',fixed:'4.20.0',allFixed:'4.20.0 / 5.0.0',score:'2.3',scoreVersion:'4.0',description:'不可信输入传入 response.redirect() 时，在特定用户交互条件下可能执行脚本。当前历史版本落入公告影响范围。',surface:'response.redirect()',type:'跨站脚本（XSS）'},
 model:{version:'GNN-preset-v1',label:'建议人工复核',score:.78,category:'重定向输入链路',reason:'预置模型记录关注根包输入处理特征与解析组件邻域；结合公开证据安排人工复核。',signals:[{name:'关注对象',value:'express 根包'},{name:'结构线索',value:'请求解析与路由邻域'},{name:'建议动作',value:'复核重定向输入'}]},
 remediation:['本公告在 4.20.0 修复。升级时选择经过当前完整公告复核和兼容性测试的维护版本。','审计 response.redirect() 调用点，对目标地址采用明确允许列表，复核不可信输入。','更新锁文件与依赖清单，执行回归测试，并重新进行完整 SCA 扫描。']
},{
 id:'axios',title:'Axios',name:'axios/axios',package:'axios',version:axiosManifest.version,tag:'v1.6.7',commit:axiosTag.object.sha,description:'Promise based HTTP client for the browser and Node.js',license:axiosManifest.license,category:'HTTP 客户端',sources:{...ax,lock:'https://github.com/axios/axios/blob/v1.6.7/package-lock.json'},
 dependencies:ad,preview:ap,graph:graph('axios',axiosManifest.version,ad,ap,ax.manifest,['asynckit','combined-stream','mime-types'].map(name=>({name,version:(form.dependencies as Record<string,string>)[name],parent:'form-data',source:'https://registry.npmjs.org/form-data/4.0.0'}))),lockNote:'已保存该 tag 的 package-lock.json；主表保留声明约束，锁定值可在版本详情中核对。',
 advisory:{id:'GHSA-8hc4-vh64-cxmj',cve:'CVE-2024-39338',package:'axios',title:'Axios URL 解析服务端请求伪造',severity:'High',severityLabel:'高危',affected:'≥ 1.3.2, ≤ 1.7.3',allRanges:'≥ 1.3.2, ≤ 1.7.3',fixed:'1.7.4',allFixed:'1.7.4',score:'未提供',scoreVersion:'',description:'相对路径 URL 可能被作为协议相对 URL 处理，产生 SSRF 风险。1.6.7 位于公告列出的影响范围；实际可利用性需结合服务端调用复核。',surface:'URL / baseURL 处理',type:'服务端请求伪造（SSRF）'},
 model:{version:'GNN-preset-v1',label:'优先复核请求边界',score:.86,category:'网络请求目标',reason:'预置模型记录结合 HTTP 客户端特征与重定向依赖邻域，提示优先审计请求目标边界。',signals:[{name:'关注对象',value:'axios 根包'},{name:'结构线索',value:'HTTP 请求与重定向邻域'},{name:'建议动作',value:'复核 URL 允许列表'}]},
 remediation:['本公告在 1.7.4 修复。选择当前受维护且经完整公告复核的兼容版本，不将此版本视为全部风险的终点。','审计服务端 URL / baseURL 使用，采用目标主机与协议允许列表，复核重定向和内网访问边界。','更新 package-lock.json 并检查实际解析版本；执行网络请求回归测试和完整 SCA 扫描。']
},{
 id:'koa',title:'Koa',name:'koajs/koa',package:'koa',version:koaManifest.version,tag:'2.15.3',commit:koaTag.object.sha,description:'Expressive HTTP middleware framework for Node.js',license:koaManifest.license,category:'HTTP 中间件框架',sources:{...ks,lock:'https://github.com/koajs/koa/blob/2.15.3/package-lock.json'},
 dependencies:kd,preview:kp,graph:graph('koa',koaManifest.version,kd,kp,ks.manifest,[...['mime-types','negotiator'].map(name=>({name,version:(accepts.dependencies as Record<string,string>)[name],parent:'accepts',source:'https://registry.npmjs.org/accepts/1.3.5'})),{name:'keygrip',version:cookies.dependencies.keygrip,parent:'cookies',source:'https://registry.npmjs.org/cookies/0.9.0'}]),lockNote:'该 tag 锁文件根版本仍为 2.14.3，与 manifest 2.15.3 不一致；仅作快照证据，不声称为该版本实际安装结果。',
 advisory:{id:'GHSA-593f-38f6-jp5m',cve:'CVE-2025-25200',package:'koa',title:'Koa 代理请求头正则拒绝服务',severity:koaAdvisory.severity==='critical'?'Critical':'High',severityLabel:koaAdvisory.severity==='critical'?'严重':'高危',affected:'≥ 2.0.0, < 2.15.4',allRanges:'2.x：≥ 2.0.0, < 2.15.4；另含受影响的 0.x / 1.x / 3.x 预发布分支',fixed:'2.15.4',allFixed:'2.15.4；其他分支修复见官方公告',score:'9.2',scoreVersion:'4.0',description:'解析 X-Forwarded-Proto 与 X-Forwarded-Host 请求头的正则表达式可能导致拒绝服务。2.15.3 位于该公告影响范围。',surface:'代理请求头正则解析',type:'正则拒绝服务（ReDoS）'},
 model:{version:'GNN-preset-v1',label:'优先复核代理输入',score:.91,category:'代理请求头解析',reason:'预置模型记录关注请求头处理与中间件邻域，建议安全团队优先确认代理信任边界和输入限制。',signals:[{name:'关注对象',value:'koa 根包'},{name:'结构线索',value:'请求头与中间件邻域'},{name:'建议动作',value:'复核代理信任与输入长度'}]},
 remediation:['2.x 分支在 2.15.4 修复本公告。升级至经当前公告复核和业务兼容性测试的维护版本。','审计代理信任配置，约束 X-Forwarded-Proto / X-Forwarded-Host 来源与输入长度。','回归代理请求头处理、异常输入及中间件行为，更新依赖清单并执行完整 SCA 扫描。']
}];
export function versionOf(c:CaseStudy,name:string){return name===c.package?c.version:c.dependencies.find(d=>d.name===name)?.version||c.graph.find(d=>d.name===name)?.version||'未获取'}
export function pathTo(c:CaseStudy,name:string):string[]{if(name===c.package)return [name];const parent=c.graph.find(n=>n.name===name)?.parent||c.package;return [...pathTo(c,parent),name]}
export function sourceOf(c:CaseStudy,name:string){return c.graph.find(n=>n.name===name)?.source||c.sources.manifest}
export function lockedVersion(c:CaseStudy,name:string):string|undefined{if(c.id==='express')return;const lock=(c.id==='axios'?axiosLock:koaLock) as {packages?:Record<string,{version?:string}>};return lock.packages?.[`node_modules/${name}`]?.version}
export const modelNote='本地预置 GNN 记录，未执行真实训练或推理；分类分数不是漏洞概率，也不代表真实安全结论。';
export const protocols=[
 {name:'数据保护',code:'ASS',desc:'将输入表示为两份加法秘密份额；当前仅显示预置协议材料结构。'},
 {name:'密态训练',code:'BFV + FSS',desc:'展示同态图聚合、秘密共享线性计算与安全激活的衔接方式。'},
 {name:'模型安全发布',code:'Protected model',desc:'展示受保护模型权重、模型版本与授权策略的绑定关系。'},
 {name:'密态推理',code:'ASS / BFV / FSS',desc:'展示双云协同图聚合、线性计算及非线性激活；未执行密码运算。'},
 {name:'授权结果交付',code:'Authorized output',desc:'向授权主体呈现当前案例的预置分析输出；不构成真实密码计算结果。'},
];
