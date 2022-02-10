import React from 'react';
import "./App.css";
import { Dropdown } from './Dropdown';

export const SpellingSuggestion = (props) => {
    const { type, length, offset, message, suggestions, textVal, setText} = props;
    
    if(textVal===null){
        return <></>
    }
    if(suggestions) {
        const intialValue = textVal.substr(offset,length); //console.log(intialValue);
            return (
                <div>
                    <Dropdown 
                        offset={offset}
                        length={length}
                        title={intialValue}
                        list={suggestions}
                        setText={setText}
                        text={textVal}
                    />
                    <br/>
                </div>
            )
        }

    return(
      <article>
        <div >
            <p>{type}</p>
            <p>{offset}</p>
            <p>{length}</p>
            <p>{message}</p>
            <p>{suggestions}</p>
            
        </div>
    </article>
    )
}

