import { SecondsToClockPipe } from './seconds-to-clock.pipe';

describe('ElapsedTimePipe', () => {
  const pipe = new SecondsToClockPipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should indicates seconds', () => {
    expect(pipe.transform(12)).toEqual({ seconds: 12, minutes: 0 });
  });

  it("should not contain s when there's only one minute", () => {
    expect(pipe.transform(60)).toEqual({ minutes: 1, seconds: 0 });
  });

  it('should indicate seconds and minutes', () => {
    expect(pipe.transform(62)).toEqual({ minutes: 1, seconds: 2 });
  });
});
