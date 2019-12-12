import React, {useEffect} from 'react'

import './BasicTime.css'

export default function BasicTime() {

    function pad(num, padWith, len) {
        var str = num + '' // Convert number into string
        while (str.length < len) {
            str = padWith + str;
        }
        return str;
    }

    useEffect(() => {
        
        function getFormattedDate() {
            var date = new Date();
            return date.toDateString().toUpperCase()
        }
    
        function getFormattedTime() {
            var date = new Date();
            return pad(date.getHours(), '0', 2) + ":" + pad(date.getMinutes(), '0', 2)+":"+pad(date.getSeconds(),'0', 2);
        }

        function updateClock() {
            var date = document.getElementById('date')
            date.innerText = getFormattedDate();
            var time = document.getElementById('time')
            time.innerText = getFormattedTime();
        }

        updateClock()
        const interval = setInterval(() => {
            updateClock()
        }, 1000)
        return () => {
            clearInterval(interval)
        };
    }, [])

    return (
        <div className='clock module'>
            <h1 id='date'>...</h1>
            <h4 id='time'>...</h4>
        </div>
    )
}
