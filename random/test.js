const {
    Instant,
} = require('@js-joda/core');
const N = 1000000;
function print(list, fn) {
    console.time('print');
    list.forEach(fn);
    console.timeEnd('print');
}
const array = [];
for(let i = 0; i < N; i++) {
    array.push(Date.now());
}
print(array, (x) => Instant.ofEpochMilli(x).toString())
print(array, (x) => {
    return new Date(x).toISOString();
});
print(array, (x) => {
    const time = new Date(x);
    const year = String(time.getUTCFullYear()).padStart(2, '0');
    const mo = String(time.getUTCMonth()+1).padStart(2, '0');
    const da = String(time.getUTCDate()).padStart(2, '0');
    const ho = String(time.getUTCHours()).padStart(2, '0');
    const mi = String(time.getUTCMinutes()).padStart(2, '0');
    const se = String(time.getUTCSeconds()).padStart(2, '0');
    const mil = String(time.getUTCMilliseconds()).padStart(3, '0');
    return `${year}-${mo}-${da}T${ho}:${mi}:${se}.${mil}Z`;
});