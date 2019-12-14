import React, {useEffect} from 'react'
import PropTypes from 'prop-types';

import './BasicTime.css'

export default function BasicTime({showSeconds = false, use24hTime = false}) {

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
            var hours = pad(date.getHours(), '0', 2);
            var minutes = pad(date.getMinutes(), '0', 2)
            var seconds = (showSeconds ? ":" + pad(date.getSeconds(),'0', 2) : "");
            var ampm = ""

            if(!use24hTime) {
                ampm = hours <= 12 ? " AM" :  " PM";
                hours = hours % 12;
            }

            return hours + ":" + minutes + seconds + ampm
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
    }, [showSeconds, use24hTime])

    return (
        <div className='clock module'>
            <h1 id='date'>...</h1>
            <h4 id='time'>...</h4>
        </div>
    )
}

BasicTime.protoTypes = {
    showSeconds: PropTypes.bool,
    use24hTime: PropTypes.bool
}
