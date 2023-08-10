export const prettyTime = (time: number) => {
  if (!time) {
    return '00:00:00';
  }
  const hours = Math.floor(time / 3600);
  const remainderHours = time - hours * 3600;
  const minutes = Math.floor(remainderHours / 60);
  const seconds = remainderHours - minutes * 60;

  const strTimer = {
    hours: Math.floor(hours / 10) == 0 ? `0${hours}` : hours,
    minutes: Math.floor(minutes / 10) == 0 ? `0${minutes}` : minutes,
    seconds: Math.floor(seconds / 10) == 0 ? `0${seconds}` : seconds,
  };

  return `${strTimer.hours}:${strTimer.minutes}:${strTimer.seconds}`;
};

export const TIME_PATTERN = '^(([0-9][0-9]):([0-9][0-9]):([0-9][0-9]))$';
