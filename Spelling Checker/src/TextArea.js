import {useState, useCallback, useEffect } from "react";
import debounce from "lodash.debounce";
import { SpellingsSuggestionList } from "./SpellingsSuggestionList";
import "./App.css";

const url = 'https://svc.webspellchecker.net/api?cmd=check&text=' 
const url_next = '&lang=en_US&format=json&customerid=bpzFeDBBcPBbZax'

const TextArea = () => {
  const [text, setText] = useState('');
  const [correctSpellingList, setCorrectSpellingList] = useState([{}]);

  const fetchResult = async(val) => {
    try {
      const response = await fetch(`${url}${val}${url_next}`);
      console.log(response);
      const data = await response.json();
      console.log(data);
      console.log(data.result);
      const result = data.result
      console.log(result);

      if(result.length>0) {
        const { matches } = result[0];
        const newMatchingValues = matches.map((match) => {
          console.log("match : ", match);
          const {type, suggestions, offset, message, length} = match
          return {
            type : type,
            suggestions : suggestions,
            offset : offset,
            message : message,
            length : length
          }
        })
        console.log(newMatchingValues);
        setCorrectSpellingList(newMatchingValues);
      }
    } catch (e) {
      console.log(e);
    }
  }

  const optimisedVersion = useCallback(
    debounce(fetchResult, 100),
    []
  );

  useEffect(()=>{
    console.log('this is coming into picture');
    setText(text);
  },[text])

  const handleChange = (e) => {
      let val = e.target.value;
      console.log(val);
      setText(val);
      console.log("text value : ", text);
      optimisedVersion(val);
  }


  const handleSubmit = (e) => {
      e.preventDefault()
      console.log(e.target);
      console.log(correctSpellingList);
      console.log(text);
  }

  return (
    <div >
      <form className="form" onSubmit={handleSubmit}>
        <textarea 
              type="text"
              placeholder="Type something....."
              value={text} 
              onChange={handleChange}
        />
        <SpellingsSuggestionList 
          correctSpellingList={correctSpellingList} 
          text={text} 
          setText={setText}
        />
      </form>
    </div>
  );
};

export default TextArea;

