import React, {useEffect, useState} from 'react'
import './InspirationalQuote.css'

const QUOTES_FEED = 'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.reddit.com%2Fr%2Fquotes%2F.rss'; //'https://www.reddit.com/r/quotes/.rss'

function InspirationalQuote() {

    const [quote, setQuote] = useState('...')
    
    useEffect(() => {

        function FetchDataFromRssFeed() {
            var request = new XMLHttpRequest();
            request.onreadystatechange = () => {
                if (request.readyState === 4 && request.status === 200) {
                    var myObj = JSON.parse(request.responseText);
                    console.log(myObj)
                    setQuote(unescape(myObj.items[1].title))
                }
            }
            request.open("GET", QUOTES_FEED, true);
            request.send();
        }

        FetchDataFromRssFeed()

    }, [setQuote])

    return (
        <div className="quote">
            <h1>{quote}</h1>
        </div>
    )
}

export default InspirationalQuote
