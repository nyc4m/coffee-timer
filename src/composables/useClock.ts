import { reactive, ref } from "vue";

export function useClock() {
  const clock = reactive({ m: 0, s: 0 });
  const timerRef = ref<NodeJS.Timer | null>(null);
  function start() {
    timerRef.value = setInterval(() => {
      clock.s += 1;
      if (clock.s === 60) {
        clock.m += 1;
        clock.s = 0;
      }
    }, 1000);
  }
  function stop() {
    if (!timerRef.value) {
      throw new Error("Trying to stop a timer that isn't started");
    }
    clearInterval(timerRef.value);
    clock.m = 0;
    clock.s = 0;
  }
  function reset() {
    stop();
    start();
  }
  return {
    clock,
    start,
    stop,
    reset,
  };
}
