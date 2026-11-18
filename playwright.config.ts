import { defineConfig } from '@playwright/test';
export default defineConfig({testDir:'./tests',timeout:80000,workers:1,use:{baseURL:process.env.TEST_BASE_URL||'http://127.0.0.1:5174',viewport:{width:1920,height:1080},launchOptions:{channel:'chrome',headless:true}},reporter:[['list'],['json',{outputFile:'docs/test-results.json'}]]});

