import React, { useState, useEffect } from 'react';
import './App.scss';
import COLORS_ARRAY from "./colorsArray.js"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'

let quoteDBUrl = "http://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"

function App() {
  const [quote, setQuote] = useState("There are no traffic jams along the extra mile.")
  const [author, setAuthor] = useState("Roger Staubach")
  const [quotesArray, setQuotesArray] = useState(null)
  const [accentColor, setAccentColor] = useState('#282c34')

  const fetchQuotes = async (url) => {
    const response = await fetch(url)
    const parsedJSON = await response.json()
    setQuotesArray(parsedJSON.quotes)
  }

  useEffect(() => {
    fetchQuotes(quoteDBUrl)
  }, [quoteDBUrl])

  const getRandomQuote = () => {
    let randomInteger = Math.floor(Math.random() * quotesArray.length)
    setAccentColor(COLORS_ARRAY[randomInteger])
    setQuote(quotesArray[randomInteger].quote)
    setAuthor(quotesArray[randomInteger].author)
  }

  return (
    <div className="App">
      <header className="App-header" style={{backgroundColor: accentColor}}>
        <div id="quote-box" style={{color: accentColor}}>
          <p id="text">"{quote}"</p>
          <p id="author">- {author}</p>
          <div className="buttons">
            <a style={{backgroundColor: accentColor}} id="tweet-quote" href={ `http://www.twitter.com/intent/tweet?text=${quote} - ${author}` }>
              <FontAwesomeIcon icon={ faTwitter } />
            </a>
            <button style={{backgroundColor: accentColor}} id="new-quote" onClick={() => getRandomQuote()}>New quote</button>
          </div>
        </div>
        
      </header>
    </div>
  );
}

export default App;
