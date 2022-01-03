import { useClock } from "./useClock";

describe("Clock composable", () => {
  it("Should be inited with 0 minutes and 0 secondes", () => {
    const { clock } = useClock();
    expect(clock).toEqual({
      m: 0,
      s: 0,
    });
  });
  describe("Time flow", () => {
    beforeEach(() => jest.useFakeTimers());

    afterEach(() => jest.useRealTimers());

    it("should start and increment time each seconds", () => {
      const { clock, start } = useClock();

      jest.advanceTimersByTime(1000);
      expect(clock.s).toBe(0);

      start();
      jest.advanceTimersByTime(1000);
      expect(clock.s).toBe(1);
    });

    it("should increment minutes when 60 seconds have passed", () => {
      const { clock, start } = useClock();
      start();
      jest.advanceTimersByTime(60 * 1000);
      expect(clock.s).toBe(0);
      expect(clock.m).toBe(1);
    });

    it("should stop timer", () => {
      const { clock, start, stop } = useClock();
      start();
      jest.advanceTimersByTime(30 * 1000);
      stop();
      expect(clock).toEqual({
        m: 0,
        s: 0,
      });
    });

    it("should throw when stopping a timer that isn't started", () => {
      const { stop } = useClock();

      expect(stop).toThrow("Trying to stop a timer that isn't started");
    });

    it("should reset the time", () => {
      const { start, reset, clock } = useClock();
      start();
      jest.advanceTimersByTime(45 * 1000);
      reset();
      jest.advanceTimersByTime(2 * 1000);

      expect(clock.s).toBe(2);
    });

    it('should define a timer that stops after a given time', () => {
      const {start, clock} = useClock(45)
      start()
      jest.advanceTimersByTime(45 * 1000)
      expect(clock.s).toBe(45)
      jest.advanceTimersByTime(1000)
      expect(clock.s).toBe(45)
    })
  });
});
