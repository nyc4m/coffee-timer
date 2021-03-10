import { ElapsedTimePipe } from './elapsed-time.pipe';

describe('ElapsedTimePipe', () => {
  const pipe = new ElapsedTimePipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it("should indicates seconds", () => {
    expect(pipe.transform(12)).toBe("12 seconds")
  })

  it("should not contain s when there's only one second", () => {
    expect(pipe.transform(1)).toBe("1 second")
  })

  it("should not contain s when there's only one minute", () => {
    expect(pipe.transform(60)).toBe("1 minute 0 second")
  })
});
