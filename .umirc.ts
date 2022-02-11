import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [{ path: '/**', component: '@/pages/index' }],
  fastRefresh: {},
  title: 'G Paint - An easy drawing board powered by @antv/g',
  hash: true,
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  outputPath: 'docs',
});
