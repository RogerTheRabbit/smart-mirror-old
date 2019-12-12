import React, {useEffect} from 'react'

export default function BasicTime() {
    
    function updateTime() {
        var time = document.getElementById('time')
        time.innerText = getFormattedTime();
    }

    function getFormattedTime() {
        var date = new Date();
        return date.toDateString().toUpperCase()
    }

    useEffect(() => {
        updateTime()
        const interval = setInterval(() => {
            updateTime()
        }, 1000)
        return () => {
            clearInterval(interval)
        };
    }, [])

    return (
        <div>
            <h1 id='time'>...</h1>
        </div>
    )
}
