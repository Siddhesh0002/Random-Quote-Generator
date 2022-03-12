
import React from 'react';
import './App.css';
import COLORS_ARRAY from './colorsArray'
import {Button } from '@material-ui/core'
import TwitterIcon from '@material-ui/icons/Twitter';




let quoteLink='https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json'

function App() {
  const[quote, setQuote]= React.useState("You can’t use up creativity. The more you use, the more you have.")
  const[author, setAuthor]=React.useState("Maya Angelou")
  const[randomNumber, setRandomNumber]= React.useState(1)
  const[quotesArray, setQuotesArray]= React.useState(null)
  const[accentColor, setAccentColor]= React.useState("#282c34")
  const fetchQuotes= async (url)=>{
    const responce= await fetch(url)
    const parsedJSON= await responce.json()
    setQuotesArray(parsedJSON.quotes)
  }
  React.useEffect(() => {
    fetchQuotes(quoteLink)
  }, [])

  const getRandomQuote= ()=>
  {
    let randomInt= Math.floor(quotesArray.length*Math.random())
    setRandomNumber(randomInt)
    setAccentColor(COLORS_ARRAY[randomInt])
    setQuote(quotesArray[randomInt].quote)
    setAuthor(quotesArray[randomInt].author)
    
  }




  return (
    <div className="App">
      <header className='header' style={{backgroundColor:accentColor}}>
     <div className='box' style={{color: accentColor}}>
       <div className='quote-num'>
       <h2>Quote Number : {randomNumber}</h2>
       </div>
       <p className='description'>"{quote}"</p>
        <p className='author'>-{author}</p>
          <div className='wrapper'>
            <div className='button'>
              <a className="tweet-quote-btn" style={{color:accentColor}} rel="noopener noreferrer" target='_blank' href={encodeURI(`http://www.twitter.com/intent/tweet?text=${quote} -${author}`)}><TwitterIcon size='large'/></a>
        </div> 
       <Button variant="contained" style={{backgroundColor:accentColor, color:'white'}} onClick={()=>getRandomQuote()}>Next Quote</Button>
    </div>
    </div>
    </header>
    </div>
    
  );
}

export default App;
