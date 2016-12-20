function DateBetween(startDate, endDate) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const distance = endDate - startDate;

  if (distance < 0) {
    return 'counter expired';
  }

  function pad(num, size) {
    let s = String(num);
    while (s.length < (size || 2)) { s = `0${s}`; }
    return s;
  }

  const hours = Math.floor((distance % day) / hour);
  pad(hours);
  const minutes = Math.floor((distance % hour) / minute);
  pad(minutes);
  const seconds = Math.floor((distance % minute) / second);
  pad(seconds);

  let between = `${hours}:`;
  between += `${minutes}:`;
  between += seconds;

  return between;
}

module.exports = DateBetween;
