import * as TimeFormatter from '../api/timeFormatter';

export function duration(value) {
  return TimeFormatter.relativeDuration(value);
}