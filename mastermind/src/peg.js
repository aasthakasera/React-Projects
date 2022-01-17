import React from 'react';

const Peg = (props) => {
    const pegId = +props.pegId.substr(props.pegId.indexOf('-') + 1)
    const rowId = +props.pegId.substr(1, props.pegId.indexOf('-') - 1)
    let clase = ''
    if (props.state.activeRowIndex === rowId) {
      clase = props.state.currentRow[pegId]
      console.log({clase})
      
    } else {
      for (let i in props.state.previousRows) {
        if (+i === +rowId) {
          clase = props.state.previousRows[rowId][pegId]
        }
      }
      console.log({clase});
    }

    return (
      <span
        id={props.pegId}
        className={'peg ' + clase}
        onClick={(e) =>
          props.pegAction(props.state.activeColor, props.pegId, e)} >
      </span>
    )
}

// const Peg = (props) => {
//     const pegId = +props.pegId.substr(props.pegId.indexOf("-") + 1);
//     const rowId = +props.pegId.substr(1, props.pegId.indexOf("-") - 1);
//     let clase = "";
//     if (props.state.activeRowIndex === rowId) {
//         clase = props.state.currentRow[pegId];
//         console.log("clase");
//         console.log(clase);
//     } else {
//         for (let i in props.state.previousRows) {
//           if (+i === +rowId) {
//             clase = props.state.previousRows[rowId][pegId];
//           }
//         }
//       }
//       console.log(props.state.activeColor);
//     //   return (
//     //     <div
//     //         id={props.pegId}
//     //         className={"peg" + clase}
//     //         //key={color}
//     //         onClick={() => { props.pegAction(props.state.activeColor, props.pegId) }} >
//     //     </div>
//     //   );

//     //   return <div className="colors">{allColors}</div>;
//       return (
//         <span
//           id={props.pegId}
//           className={"peg " + clase}
//           onClick={() =>
//             props.pegAction(props.state.activeColor, props.pegId)
//           }
//         >
//         </span>
//       );
//   }

export default Peg;