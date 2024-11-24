import React, {useState} from 'react'

export default function TextForm(props) {
   const handleUpClick=()=>{  
    let newText = text.toUpperCase();
    setText(newText)
    props.showAlert("converted to uppercase!", "success");
   }
   const handleLoClick=()=>{   
    let newText = text.toLowerCase();
    setText(newText)
    props.showAlert("converted to lowercase!", "success");
   }
   const handleClearClick=()=>{
    let newText = '';
    setText(newText)
    props.showAlert("clear text !", "success");
   }

   const handleCopy =()=>{
    navigator.clipboard.writeText(text);  
    props.showAlert("text copied !", "success");
   }

   
   const handleOnChange = (event)=>{
    setText(event.target.value)
    // props.showAlert("!", "success");
   }

   const handleExtraSpaces =()=>{
    let newText =text.split(/[ ]+/);
    setText(newText.join(" "));
    props.showAlert("handle extra spaces!", "success");
   }
   const handleEncode64 = ()=>{
    if(text.length===0) props.showAlert("Enter something!","warning");
    else
    { 
      let newText = btoa(text);
      setText(newText);
      props.showAlert("Encoded to base64!","success");
    }
  }

  const handleDecode64 = ()=>{
    if(text.length===0) props.showAlert("Enter something!","warning");
    else
    {
      try{
        let newText = atob(text);
      setText(newText);
      props.showAlert("Base64 decoded!","success");
      }
      catch(e){
        props.showAlert("Invalid String Entered!","warning");
      }
      
    }
  }

  const handleListen = ()=>{
    if(text.length===0) props.showAlert("Enter something!","warning");
    else{
    var msg = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(msg);
    }
  }

  const handleCapitalizeWords = () => {
    let capitalizedText = text
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
    setText(capitalizedText);
    props.showAlert("Capitalized each word!", "success");
  };

  const handleReverseText = () => {
    let reversedText = text.split("").reverse().join("");
    setText(reversedText);
    props.showAlert("Text reversed!", "success");
  };

  const handleRemovePunctuation = () => {
    let noPunctuation = text.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
    setText(noPunctuation);
    props.showAlert("Punctuation removed!", "success");
  };
  
  const handleCountVowelsConsonants = () => {
    let vowels = text.match(/[aeiouAEIOU]/g)?.length || 0;
    let consonants = text.match(/[bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ]/g)?.length || 0;
    props.showAlert(`Vowels: ${vowels}, Consonants: ${consonants}`, "info");
  };
  
  
  const handleExtractURLs = () => {
    let urls = text.match(/https?:\/\/[^\s]+/g) || [];
    if (urls.length > 0) {
      props.showAlert("URLs extracted! Check the console.", "info");
      console.log(urls);
    } else {
      props.showAlert("No URLs found!", "warning");
    }
  };
  
  
  const handleDownloadText = () => {
    const element = document.createElement("a");
    const file = new Blob([text], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "textutils-output.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    props.showAlert("Text downloaded!", "success");
  };
  

  
  const handleWordFrequency = () => {
    let words = text.split(" ").filter(word => word !== "");
    let frequency = {};
    words.forEach(word => {
      frequency[word] = (frequency[word] || 0) + 1;
    });
    let freqString = Object.entries(frequency)
      .map(([word, count]) => `${word}: ${count}`)
      .join("\n");
    props.showAlert("Word frequency calculated! Check the console.", "info");
    console.log(freqString);
  };

  const handleTextCompression = () => {
    let compressedText = text.replace(/[aeiouAEIOU]/g, "");
    setText(compressedText);
    props.showAlert("Text compressed by removing vowels!", "success");
  };

  const handleRemoveHTMLTags = () => {
    let cleanedText = text.replace(/<\/?[^>]+(>|$)/g, "");
    setText(cleanedText);
    props.showAlert("HTML tags removed!", "success");
  };

  const handleKeywordDensity = () => {
    let words = text.toLowerCase().split(/\s+/).filter(word => word !== "");
    let totalWords = words.length;
    let frequency = {};
    words.forEach(word => {
      frequency[word] = (frequency[word] || 0) + 1;
    });
    let density = Object.entries(frequency).map(([word, count]) => ({
      word,
      percentage: ((count / totalWords) * 100).toFixed(2),
    }));
    console.log("Keyword Density:", density);
    props.showAlert("Keyword density calculated! Check the console.", "info");
  };
  
  
  const handleSortWords = () => {
    let sortedText = text
      .split(/\s+/)
      .filter(word => word !== "")
      .sort((a, b) => a.localeCompare(b))
      .join(" ");
    setText(sortedText);
    props.showAlert("Words sorted alphabetically!", "success");
  };

  const handleNumbersToWords = () => {
    const numberToWords = require("number-to-words");
    let convertedText = text.replace(/\d+/g, num => numberToWords.toWords(num));
    setText(convertedText);
    props.showAlert("Numbers converted to words!", "success");
  };
  
  
 
  
  const handleSentimentAnalysis = () => {
    let positiveWords = ["good", "happy", "excellent", "awesome", "great"];
    let negativeWords = ["bad", "sad", "terrible", "horrible", "poor"];
    let words = text.toLowerCase().split(/\s+/);
    let positiveCount = words.filter(word => positiveWords.includes(word)).length;
    let negativeCount = words.filter(word => negativeWords.includes(word)).length;
  
    let sentiment =
      positiveCount > negativeCount
        ? "Positive Sentiment"
        : negativeCount > positiveCount
        ? "Negative Sentiment"
        : "Neutral Sentiment";
  
    props.showAlert(`Text Sentiment: ${sentiment}`, "info");
  };

 
  
  

  
  
  
  

   const [text, setText] = useState('');
    // text = "new text";  // Wrong wya to change the state
    // setText("new text");  // correct way to change the state
   


  return (
    <>
    <div className="conatiner" style ={{color : props.mode === 'dark'?'white':'#03022f'}}>
      <h1 className="mb-4">{props.heading}</h1>
      <div className="mb-3"> 
      <textarea className="form-control" value={text} onChange={handleOnChange} style ={{backgroundColor : props.mode === 'dark'?'#13466e':'white',color: props.mode==='dark'?'white':'#03022f'}} id="myBox" rows="8"></textarea>
      </div>
      <button disabled={text.length===0}
      className="btn btn-primary mx-1 my-1 "  onClick={handleUpClick}>Convert to Uppercase</button>
      <button disabled={text.length===0} className="btn btn-primary mx-1 my-1"  onClick={handleLoClick}>Convert to Lowercase</button>
      <button disabled={text.length===0} className="btn btn-primary mx-1 my-1"  onClick={handleClearClick}>Clear Text</button>
      <button disabled={text.length===0} className="btn btn-primary mx-1 my-1"  onClick={handleCopy}>copy Text</button>
      <button disabled={text.length===0} className="btn btn-primary mx-1 my-1"  onClick={handleExtraSpaces}>Remove Extra spaces Text</button>
      <button disabled={text.length===0} className="btn btn-primary mx-2 my-1" onClick={handleEncode64}>Encode to Base64</button>
      <button disabled={text.length===0} className="btn btn-primary  mx-2 my-1" onClick={handleDecode64}>Decode Base64</button>
      <button disabled={text.length===0} className="btn btn-primary mx-2 my-1" onClick={handleListen}>Listen</button>
      <button disabled={text.length===0} className="btn btn-primary mx-2 my-1" onClick={handleReverseText}>Reverse text</button>
      <button disabled={text.length===0} className="btn btn-primary mx-2 my-1" onClick={handleCapitalizeWords}>Capitalize Words</button>
      <button disabled={text.length===0} className="btn btn-primary mx-2 my-1" onClick={handleRemovePunctuation}>Remove Punctuation</button>
      <button disabled={text.length===0} className="btn btn-primary mx-2 my-1" onClick={handleDownloadText}>Download Text</button>
      <button disabled={text.length===0} className="btn btn-primary mx-2 my-1" onClick={handleWordFrequency}>Word Frequency</button>
      <button disabled={text.length===0} className="btn btn-primary mx-2 my-1" onClick={handleCountVowelsConsonants}>Count Vowels Consonants</button>
      
      

 

  {/* Extract URLs */}
  <button
    disabled={text.length === 0}
    className="btn btn-primary mx-2 my-1"
    onClick={handleExtractURLs}
  >
    Extract URLs
  </button>

  {/* Text Compression */}
  <button
    disabled={text.length === 0}
    className="btn btn-primary mx-2 my-1"
    onClick={handleTextCompression}
  >
    Compress Text
  </button>

  {/* Remove HTML Tags */}
  <button
    disabled={text.length === 0}
    className="btn btn-primary mx-2 my-1"
    onClick={handleRemoveHTMLTags}
  >
    Remove HTML Tags
  </button>

  {/* Keyword Density Analysis */}
  <button
    disabled={text.length === 0}
    className="btn btn-primary mx-2 my-1"
    onClick={handleKeywordDensity}
  >
    Keyword Density
  </button>

  {/* Sort Words */}
  <button
    disabled={text.length === 0}
    className="btn btn-primary mx-2 my-1"
    onClick={handleSortWords}
  >
    Sort Words
  </button>

  {/* Sentiment Analysis */}
  <button
    disabled={text.length === 0}
    className="btn btn-primary mx-2 my-1"
    onClick={handleSentimentAnalysis}
  >
    Sentiment Analysis
  </button>

  {/* Numbers to Words */}
  <button
    disabled={text.length === 0}
    className="btn btn-primary mx-2 my-1"
    onClick={handleNumbersToWords}
  >
    Numbers to Words
  </button>

  


  
    </div>

    

    
      <div className="container my-3" style={{color: props.mode==='light'?'black':'white'}}>
        <h2>Your text summary</h2>
        <p>
          {text.split(/\s+/).filter((element)=>{return element.length!==0}).length} words and {text.length} characters
        </p>
        <p>{0.008 * text.split(/\s+/).filter((element)=>{return element.length!==0}).length} Minutes read</p>
        <h2>Preview</h2>
        <p className="my-4">{text.length>0?text:"Enter something in the textbox above to preview it here!"}</p>
      </div>
    </>
  )
}
