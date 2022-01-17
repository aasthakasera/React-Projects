import React from 'react';

const Colors = (props) => {

  const allColors = props.list.map((color) => {    
    const active = color === props.activeColor ? 'active' : '';  

    return (
      <div
        className={'color-holder ' + color + ' ' + active}
        key={color}
        onClick={() => { props.action(color) }} >
      </div>
      )
    })

  return (
    <div className='colors'>
      {allColors}
    </div>
    );
}

export default Colors;