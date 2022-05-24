import { ref } from 'vue';

import Vditor from 'vditor';
import 'vditor/dist/index.css';

const vditorInit = ref<Vditor | null>(null);

// 获取浏览器的高度
export function initHeight() {
  return window.document.documentElement.clientHeight - 170;
}

/**
 * 渲染markdown函数
 * @param el id
 * @param language 语言
 * @returns
 */
export function initVditor(el: string, language, height) {
  vditorInit.value = new Vditor(el, {
    // 编辑器异步渲染完成后的回调方法
    after: () => {
      vditorInit.value!.setValue('Vue Composition API + Vditor + TypeScript Minimal Example');
    },
    lang: language,
    height: height,
    placeholder: '请尽情书写你的才华吧！！！',
    // 文字选中触发
    select: () => {},
    // 是否开启打字机模式
    typewriterMode: false,
    mode: 'sv',
    theme: 'classic',
    //初始化是否展示大纲
    outline: {
      enable: false,
      position: 'left',
    },
    // 预览
    preview: {
      markdown: {
        toc: true,
        mark: true,
        footnotes: true,
        autoSpace: true,
      },
      // 数学公式
      math: {
        // 数学公式渲染引擎
        engine: 'KaTeX',
      },
    },
    // 是否隐藏工具栏
    toolbarConfig: {
      pin: true, // 是否固定
      hide: false, // 是否隐藏
    },
    // 统计
    counter: {
      // 是否启用计数器
      enable: true,
      // 类型
      type: 'markdown',
    },
    // 解析配置
    hint: {
      emojiPath: 'https://cdn.jsdelivr.net/npm/vditor@1.8.3/dist/images/emoji',
      emojiTail: '<a href="https://ld246.com/settings/function" target="_blank">设置常用表情</a>',
      emoji: {
        sd: '💔',
        j: 'https://unpkg.com/vditor@1.3.1/dist/images/emoji/j.png',
      },
      parse: false,
      extend: [
        {
          key: '@',
          hint: (key) => {
            console.log(key);
            if ('vanessa'.indexOf(key.toLocaleLowerCase()) > -1) {
              return [
                {
                  value: '@Vanessa',
                  html: '<img src="https://avatars0.githubusercontent.com/u/970828?s=60&v=4"/> Vanessa',
                },
              ];
            }
            return [];
          },
        },
        {
          key: '#',
          hint: (key) => {
            console.log(key);
            if ('vditor'.indexOf(key.toLocaleLowerCase()) > -1) {
              return [
                {
                  value: '#Vditor',
                  html: '<span style="color: #999;">#Vditor</span> ♏ 一款浏览器端的 Markdown 编辑器，支持所见即所得（富文本）、即时渲染（类似 Typora）和分屏预览模式。',
                },
              ];
            }
            return [];
          },
        },
      ],
    },
    tab: '\t',
    // 上传
    upload: {
      // 接受的类型
      accept: 'image/*,.mp3, .wav, .rar',
      // 接口地址
      url: '',
    },
  });
  return vditorInit;
}
