import {test,expect} from '@playwright/test';
const fixtures=[
 {id:'express',repo:'expressjs/express',version:'4.17.1',count:30,cve:'CVE-2024-43796',score:'0.78',label:'建议人工复核',nodes:11,direct:6,child:'raw-body'},
 {id:'axios',repo:'axios/axios',version:'1.6.7',count:3,cve:'CVE-2024-39338',score:'0.86',label:'优先复核请求边界',nodes:7,direct:3,child:'asynckit'},
 {id:'koa',repo:'koajs/koa',version:'2.15.3',count:23,cve:'CVE-2025-25200',score:'0.91',label:'优先复核代理输入',nodes:10,direct:6,child:'keygrip'},
];
async function choose(page:any,id:string){await page.getByRole('button',{name:'选择分析案例'}).click();await page.getByRole('option').filter({hasText:fixtures.find(x=>x.id===id)!.repo}).click()}

test('three cases across four pages: data consistency, explicit analysis and screenshots',async({page,context})=>{
 const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
 await context.route('**/*',r=>new URL(r.request().url()).hostname==='127.0.0.1'?r.continue():r.abort());
 await page.goto('/overview');await expect(page.locator('h1')).toBeVisible();
 for(const f of fixtures){
  await page.getByRole('button',{name:'运营中心',exact:true}).click();await choose(page,f.id);
  await expect(page.locator('.repo-banner')).toContainText(f.version);await expect(page.locator('.sidebar-case')).toContainText(f.repo);
  await expect(page.locator('.stat-card').nth(1)).toContainText(String(f.count));await expect(page.locator('.advisory-card')).toContainText(f.cve);
  await page.screenshot({animations:'disabled',path:`screenshots/${f.id}/01-overview.png`});if(f.id==='express')await page.screenshot({animations:'disabled',path:'screenshots/01-overview.png'});
  await page.getByRole('button',{name:'风险分析',exact:true}).click();await expect(page.locator('.react-flow__node')).toHaveCount(f.nodes);
  await page.locator(`.react-flow__node[data-id="${f.child}"]`).click();await expect(page.locator('.selected-package h2')).toHaveText(f.child);await expect(page.locator('.path-highlight')).toHaveCount(2);
  await expect(page.locator('.dependency-path')).toContainText(f.id);await expect(page.locator('.unmatched')).toBeVisible();
  await page.getByRole('button',{name:'聚焦根项目'}).click();await page.getByRole('button',{name:'折叠间接依赖'}).click();await expect(page.locator('.react-flow__node')).toHaveCount(f.direct+1);
  await page.getByRole('button',{name:'展开间接依赖'}).click();await expect(page.locator('.react-flow__node')).toHaveCount(f.nodes);
  await page.getByRole('button',{name:`全部 ${f.count} 项依赖`}).click();await expect(page.locator('.dependency-chips button')).toHaveCount(f.count);
  await page.locator('.dependency-chips button').last().click();const selected=await page.locator('.selected-package h2').innerText();await expect(page.locator(`.react-flow__node[data-id="${selected}"]`)).toBeVisible();await expect(page.locator('.path-highlight')).toHaveCount(1);
  await page.getByRole('button',{name:'聚焦根项目'}).click();await page.getByRole('button',{name:'收起清单'}).click();await page.getByRole('button',{name:'智能研判',exact:true}).click();
  await expect(page.locator('.model-score')).toContainText(f.score);await expect(page.locator('.model-result')).toContainText(f.label);
  await page.waitForTimeout(400);await page.evaluate(()=>window.scrollTo(0,0));await page.screenshot({animations:'disabled',path:`screenshots/${f.id}/02-intelligence.png`});if(f.id==='express')await page.screenshot({animations:'disabled',path:'screenshots/02-intelligence.png'});
  await page.getByRole('button',{name:'计算平台',exact:true}).click();await expect(page.locator('.compute-summary')).toContainText(f.repo);
  await expect(page.locator('.execution-panel')).toContainText('密态分析');await page.locator('.execution-panel').getByRole('button',{name:'密态分析',exact:true}).click();await expect(page.locator('.result-preview')).toContainText(f.label);await expect(page.locator('.result-preview')).toContainText(f.score);
  await expect(page.locator('.lifecycle')).toHaveCount(0);await expect(page.locator('.protocol-active')).toHaveCount(3);
  await page.waitForTimeout(400);await page.evaluate(()=>window.scrollTo(0,0));await page.screenshot({animations:'disabled',path:`screenshots/${f.id}/03-secure-compute.png`});if(f.id==='express')await page.screenshot({animations:'disabled',path:'screenshots/03-secure-compute.png'});
  await page.getByRole('button',{name:'风险报告',exact:true}).click();await expect(page.locator('.report-summary')).toContainText(f.version);await expect(page.locator('.report-table')).toContainText(f.cve);await expect(page.locator('.report-model')).toContainText(f.score);
  await page.getByLabel('已确认漏洞适用条件').check();await page.waitForTimeout(300);await page.evaluate(()=>window.scrollTo(0,0));await page.screenshot({animations:'disabled',path:`screenshots/${f.id}/04-report.png`});if(f.id==='express')await page.screenshot({animations:'disabled',path:'screenshots/04-report.png'});
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBeTruthy();
 }
 await choose(page,'express');await expect(page.locator('.report-checklist h3')).toContainText('1 / 3');await expect(page.locator('.report-model')).toContainText('0.78');
 expect(errors).toEqual([]);
});

test('free navigation, no autoplay hotkeys or timers, search, case state isolation',async({page})=>{
 await page.goto('/report');await expect(page.locator('.pending-model')).toBeVisible();
 await page.locator('.pending-model').getByRole('button',{name:'智能研判'}).click();await expect(page.locator('.report-model')).toContainText('0.78');
 await choose(page,'axios');await expect(page.locator('.pending-model')).toBeVisible();await expect(page.locator('.report-table')).toContainText('CVE-2024-39338');
 await choose(page,'express');await expect(page.locator('.report-model')).toContainText('0.78');
 await page.locator('h1').click();for(const k of ['Space','r','ArrowRight','ArrowLeft'])await page.keyboard.press(k);await expect(page).toHaveURL(/report/);
 await page.waitForTimeout(6500);await expect(page).toHaveURL(/report/);await expect(page.locator('.demo-controller')).toHaveCount(0);await expect(page.getByText('40 秒演示')).toHaveCount(0);
 await page.getByLabel('全局搜索').fill('CVE-2025-25200');await page.locator('.search-results button').first().click();await expect(page).toHaveURL(/intelligence/);await expect(page.locator('.sidebar-case')).toContainText('koajs/koa');await expect(page.locator('.advisory-card')).toContainText('CVE-2025-25200');
 await page.getByLabel('全局搜索').fill('cookies');await page.locator('.search-results button').last().click();await expect(page.locator('.selected-package h2')).toHaveText('cookies');
 await page.getByRole('button',{name:'帮助',exact:true}).click();await expect(page.getByRole('dialog')).toContainText('四个页面间自由操作');await page.getByRole('button',{name:'了解，继续使用'}).click();
 await page.getByRole('button',{name:'通知',exact:true}).click();await expect(page.locator('.notifications time')).toHaveText('2026-11-18');await page.getByRole('button',{name:'关闭通知'}).click();
 await page.reload();await expect(page.locator('.sidebar-case')).toContainText('koajs/koa');
});

test('desktop viewports, node overlap, print layout and official lock evidence',async({page})=>{
 await page.goto('/intelligence');await expect(page.locator('.graph-node')).toHaveCount(11);await page.waitForTimeout(450);
 expect(await page.locator('.react-flow__node').evaluateAll(es=>{const rs=es.map(e=>e.getBoundingClientRect());return rs.every((a,i)=>rs.slice(i+1).every(b=>!(a.left<b.right&&a.right>b.left&&a.top<b.bottom&&a.bottom>b.top)))})).toBeTruthy();
 await choose(page,'axios');await page.locator('.react-flow__node[data-id="form-data"]').click();await expect(page.locator('.version-evidence')).toContainText('4.0.0');
 for(const f of fixtures){await choose(page,f.id);await page.setViewportSize({width:1366,height:768});for(const name of ['运营中心','风险分析','计算平台','风险报告']){await page.getByRole('button',{name,exact:true}).click();await expect(page.locator('h1')).toBeVisible();expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBeTruthy()}}
 await page.setViewportSize({width:1920,height:1080});await choose(page,'express');await page.locator('.pending-model').getByRole('button',{name:'智能研判'}).click();await page.emulateMedia({media:'print'});await expect(page.locator('.topbar')).toBeHidden();await expect(page.locator('.sidebar')).toBeHidden();await page.pdf({path:'screenshots/report-print.pdf',format:'A4',printBackground:true});
});



test('workspace collapse and avatar hover navigation at commented viewport',async({page})=>{
 await page.setViewportSize({width:1092,height:871});await page.goto('/overview');
 await expect(page.getByRole('heading',{name:'运营中心',exact:true})).toBeVisible();
 await expect(page.locator('.breadcrumb')).toHaveCount(0);await expect(page.getByText('声明版本约束',{exact:true})).toHaveCount(0);await expect(page.getByText('公开数据已核验',{exact:true})).toHaveCount(0);await expect(page.getByText('预置案例',{exact:true})).toHaveCount(0);await expect(page.locator('.sidebar-help')).toHaveCount(0);
 const before=await page.locator('main').boundingBox();await page.getByRole('button',{name:'折叠分析工作台'}).click();await expect(page.locator('.app')).toHaveClass(/sidebar-collapsed/);await page.waitForTimeout(250);
 const after=await page.locator('main').boundingBox();expect(after!.x).toBeLessThan(before!.x);await expect(page.locator('.sidebar-case')).toBeHidden();
 await page.locator('nav').getByRole('button',{name:'风险分析',exact:true}).click();await expect(page).toHaveURL(/intelligence/);await page.reload();await expect(page.locator('.app')).toHaveClass(/sidebar-collapsed/);
 await page.getByRole('button',{name:'展开分析工作台'}).click();await expect(page.locator('.sidebar-case')).toBeVisible();await page.waitForTimeout(550);
 const canvas=await page.locator('.graph-canvas').boundingBox();expect(await page.locator('.react-flow__node').evaluateAll((es,r)=>es.every(e=>{const n=e.getBoundingClientRect();return n.left>=r!.x-2&&n.right<=r!.x+r!.width+2}),canvas)).toBeTruthy();
 await page.getByRole('button',{name:'用户导航'}).hover();const menu=page.getByRole('menu',{name:'页面导航'});await expect(menu).toBeVisible();await expect(menu.getByRole('menuitem')).toHaveCount(4);
 await page.screenshot({animations:'disabled',path:'screenshots/05-avatar-navigation.png'});
 for(const [name,route] of [['计算平台','secure-compute'],['风险报告','report'],['运营中心','overview'],['风险分析','intelligence']]){
  await page.getByRole('button',{name:'用户导航'}).hover();await page.getByRole('menuitem',{name,exact:true}).click();await expect(page).toHaveURL(new RegExp(route));await expect(page.locator('h1')).toHaveText(name);await expect(menu).toBeHidden();
 }
 await page.getByRole('button',{name:'用户导航'}).focus();await expect(menu).toBeVisible();await page.keyboard.press('Escape');await expect(menu).toBeHidden();await page.locator('h1').click();
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBeTruthy();
 await page.getByRole('button',{name:'折叠分析工作台'}).click();await page.waitForTimeout(550);await page.screenshot({animations:'disabled',path:'screenshots/06-workspace-collapsed.png'});
});
