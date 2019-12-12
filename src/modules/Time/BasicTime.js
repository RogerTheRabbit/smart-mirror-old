import React, {useEffect} from 'react'

import './BasicTime.css'

export default function BasicTime() {
    
    function updateClock() {
        var date = document.getElementById('date')
        date.innerText = getFormattedDate();
        var time = document.getElementById('time')
        time.innerText = getFormattedTime();
    }

    function getFormattedDate() {
        var date = new Date();
        return date.toDateString().toUpperCase()
    }

    function getFormattedTime() {
        var date = new Date();
        return date.getHours().pad('0', 2) + ":" + date.getMinutes().pad('0', 2)+":"+date.getSeconds().pad('0', 2);
    }

    Number.prototype.pad = function(padWith, len) {
        var str = this + ''
        while (str.length < len) {
            str = padWith + str;
        }
        return str;
    }

    useEffect(() => {
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
