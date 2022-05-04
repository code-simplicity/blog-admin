/*
 * @Author: bugdr
 * @Date: 2022-05-04 10:24:46
 * @LastEditors: bugdr
 * @LastEditTime: 2022-05-04 10:47:57
 * @FilePath: \blog-admin\src\views\sys\login\useCountdown.ts
 * @Description:按钮封装的倒计时函数
 */
import { tryOnUnmounted } from '@vueuse/core';
import { ref, unref } from 'vue';

/**
 * 获取倒计时的函数
 * @param count
 */
export function useCountDown(count: number) {
  // 倒计时的时间
  const currentCount = ref(count);
  // 倒计时的状态
  const isStart = ref(false);
  // 循环id
  let timerId: ReturnType<typeof setInterval> | null;
  // 清除定时器
  function clear() {
    timerId && window.clearInterval(timerId);
  }
  // 暂停
  function stop() {
    isStart.value = false;
    clear();
    timerId = null;
  }
  // 开始
  function start() {
    if (unref(isStart) || !!timerId) {
      return;
    }
    isStart.value = true;
    timerId = setInterval(() => {
      if (unref(currentCount) === 1) {
        stop();
        currentCount.value = count;
      } else {
        currentCount.value -= 1;
      }
    });
  }
  // 重置
  function reset() {
    currentCount.value = count;
    stop();
  }
  // 重置状态
  function restart() {
    reset();
    start();
  }
  tryOnUnmounted(() => {
    reset();
  });
  return { start, reset, restart, clear, stop, currentCount, isStart };
}
