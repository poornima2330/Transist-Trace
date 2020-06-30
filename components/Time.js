import { useState, useEffect } from 'react';

export default function Timer() {
  const [currentTime, setCurrentTime] = useState('Getting current time');

  useEffect(() => {
    startTime(), [];
  });

  function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    var t = setTimeout(startTime, 500);
    setCurrentTime(h + ':' + m + ':' + s);
    return h + ':' + m + ':' + s;
  }

  function checkTime(i) {
    if (i < 10) {
      i = '0' + i;
    } // add zero in front of numbers < 10
    return i;
  }

  return <div className='current-time'>{currentTime}</div>;
}
