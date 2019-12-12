import React, {useEffect, useState} from 'react'
import './InspirationalQuote.css'

const QUOTES_FEED = 'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.reddit.com%2Fr%2Fquotes%2F.rss'; //'https://www.reddit.com/r/quotes/.rss'
const updateInterval = 3600000

function InspirationalQuote() {

    const [quote, setQuote] = useState('...')

    function FetchDataFromRssFeed() {
        var request = new XMLHttpRequest();
        request.onreadystatechange = () => {
            if (request.readyState === 4 && request.status === 200) {
                var myObj = JSON.parse(request.responseText);
                console.log(myObj)
                setQuote(myObj.items[0].title.replace(/&quot;/g, '"'))
            }
        }
        request.open("GET", QUOTES_FEED, true);
        request.send();
    }

    useEffect(() => {

        FetchDataFromRssFeed()
        const interval = setInterval(() => {
            FetchDataFromRssFeed()
        }, updateInterval)
        
        return () => clearInterval(interval);

    }, [])

    return (
        <div className="quote">
            <h1>{quote}</h1>
        </div>
    )
}

export default InspirationalQuote
