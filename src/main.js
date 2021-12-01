import { createApp } from 'vue'
import App from './App.vue'
import Moralis from './plugins/moralis'
import { Button, Table, Tag, Image, Tooltip, Card, Layout, LayoutHeader, LayoutContent, LayoutFooter } from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

createApp(App)
  .provide('moralis', Moralis)
  .use(Button)
  .use(Table)
  .use(Tag)
  .use(Image)
  .use(Tooltip)
  .use(Card)
  .use(Layout)
  .use(LayoutHeader)
  .use(LayoutContent)
  .use(LayoutFooter)
  .mount('#app')