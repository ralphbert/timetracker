import moment from 'moment';
import momentDuration from 'moment-duration-format';

export function relativeDuration(duration) {
  console.log('relativeDuration', duration);
  return moment.duration(duration / 1000, 'seconds').format('w[w] d[d] hh[h] mm[m] ss[s]');
}