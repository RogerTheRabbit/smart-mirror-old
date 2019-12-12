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
        return date.getHours() + ":" + date.getMinutes()+":"+date.getSeconds();
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
        <div>
            <h1 id='date'>...</h1>
            <h4 id='time'>...</h4>
        </div>
    )
}
