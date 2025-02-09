import React, { useState } from "react";

const Timer = (props) => {
  
    const [time, setTime] = useState('');
    const [isAm,set_Am]=useState("AM");
    setInterval(myTimer, 500);
    function myTimer() {
        const today = new Date();
        let h = today.getHours();
        let m = today.getMinutes();
        let s = today.getSeconds();
        if(h>12)
        {
            h=h-12;
            set_Am("PM");
        }
        m = checkTime(m);
        s = checkTime(s);
        setTime( h + ":" + m + ":" + s);
    }
    function checkTime(i) {
        if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
        return i;
      }
    return (
        <div className="text-center">
            <span className="timer_front">{time}</span><span>{isAm}</span>
           
        </div>
    );
};

export default Timer;
