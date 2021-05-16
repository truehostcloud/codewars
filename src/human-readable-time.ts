/**
 
Write a function, which takes a non-negative integer (seconds) as input and returns the time in a human-readable format (HH:MM:SS)

    HH = hours, padded to 2 digits, range: 00 - 99
    MM = minutes, padded to 2 digits, range: 00 - 59
    SS = seconds, padded to 2 digits, range: 00 - 59

The maximum time never exceeds 359999 (99:59:59)

You can find some examples in the test fixtures.

*/

interface ITime {
  hours: number;
  minutes: number;
  seconds: number;
}

class Time implements ITime {
  constructor(
    public hours: number = 0,
    public minutes: number = 0,
    public seconds: number = 0
  ) {}

  setSeconds(val: number) {
    const sum = this.seconds + val;
    if (sum < 60) {
      this.seconds = sum;
    } else {
      this.seconds = sum - 60;
      this.setMinutes(1);
    }
  }

  setMinutes(val: number) {
    const sum = this.minutes + val;
    if (sum < 60) {
      this.minutes = sum;
    } else {
      this.minutes = sum - 60;
      this.setHours(1);
    }
  }
  setHours(val: number) {
    const sum = this.hours + val;
    if (sum < 100) {
      this.hours = sum;
    } else {
      throw new Error("Illegal Value: cannot go beyond 99 Hours");
    }
  }

  private decorate(num: number) {
    return num.toString().length > 1 ? `${num}` : `0${num}`;
  }

  toString() {
    return `${this.decorate(this.hours)}:${this.decorate(
      this.minutes
    )}:${this.decorate(this.seconds)}`;
  }
}

export function humanReadable(seconds: number): string {
  let time = new Time();
  for (let num = 0; num < seconds; num++) {
    try {
      time.setSeconds(1);
    } catch (error) {
      console.log(error.message);
    }
  }
  return time.toString();
}
// 00:01:00
console.log(humanReadable(60));
// 99:59:59
console.log(humanReadable(359999));
