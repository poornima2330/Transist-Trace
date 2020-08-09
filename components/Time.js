import { useState, useEffect } from 'react';

export default function Timer() {
  const [currentHour, setCurrentHour] = useState('Getting current hour');
  const [currentMinute, setCurrentMinute] = useState('Getting current minute');
  const [currentSecond, setCurrentSecond] = useState('Getting current second');

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
    setCurrentHour(h);
    setCurrentMinute(m);
    setCurrentSecond(s);
    return `${h}:${m}:${s}`;
  }

  function checkTime(i) {
    if (i < 10) {
      i = '0' + i;
    } // add zero in front of numbers < 10
    return i;
  }

  return (
    <div className='current-time'>
      <div className='time hour'>{currentHour}</div>:
      <div className='time minute'>{currentMinute}</div>:
      <div className='time minute'>{currentSecond}</div>
    </div>
  );
}
