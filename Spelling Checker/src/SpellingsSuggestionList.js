import React from 'react';
import { SpellingSuggestion } from './SpellingSuggestion';

export const SpellingsSuggestionList = (props) => {
    const data = props.correctSpellingList;
    const textVal = props.text; //console.log(textVal);
    const setText = props.setText; //console.log('text value : ',textVal);
    return (
        <div>
            {
                data.map((spellingData) => {
                    console.log('Suggestion for wrong/similar words : ', spellingData);
                      return (
                          <SpellingSuggestion
                            //key = {id}
                            textVal = {textVal}
                            setText = {setText}
                            {...spellingData}
                          />
                      )
                })
            }
        </div>
    );
}