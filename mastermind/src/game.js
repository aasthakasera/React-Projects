import React from 'react';
import Colors from './colors';
import {Solution} from './solution';
import Board from './board';
import { COLORS, TOTAL_ROWS } from './constant';


export class Game extends React.Component {
  constructor(props) {
    super(props)

    this.activateColor = this.activateColor.bind(this)
    this.setColor = this.setColor.bind(this)
    this.checkRow = this.checkRow.bind(this)
    this.newGame = this.newGame.bind(this)

    //const colors = ['red', 'green', 'blue', 'orange', 'purple']
    const code = []
    for (let i = 0; i < 4; i++) {
      code.push(COLORS[Math.floor(Math.random() * 4) + 1])
    }   

    this.state = {
      colors: COLORS,
      activeColor: 'red',
      previousRows: [],
      previousFeedback: [],
      currentRow: ['', '', '', ''],
      feedback: [0, 0, 0, 0],
      activeRowIndex: 0,
      totalRows: TOTAL_ROWS,
      code: code,
      // canCheck: false,    //this checks if it's ok to eval currentRow
      // victory: false,
      // defeat: false,
    }

    this.game = {
      canCheck: false,    //this checks if it's ok to eval currentRow
      victory: false,
      defeat: false,
    }
  }

  activateColor(color) {
    this.setState({
      activeColor: color,
    })
  }

  setColor(color, id) {
    if (this.state.victory) {
      return false
    }
    const rowId = +id.substr(1, id.indexOf('-') - 1)
    const pegId = +id.substr(id.indexOf('-') + 1)
    let currentRow = this.state.currentRow
    let isArrayFull = 0

    if (this.state.activeRowIndex === rowId && color) {
      currentRow[pegId] = color
      this.setState({
        currentRow: currentRow,
      })

      /* Checking if currentRow is Full */
      for (let i in currentRow) {
        if (currentRow[i].length > 0) {
          isArrayFull++;
        }
      }
      if (isArrayFull >= currentRow.length) {
        this.setState({ canCheck: true })
      } else {
        this.setState({ canCheck: false })
      }
    }
  }

  checkRow() {
    const currentRow = JSON.parse(JSON.stringify(this.state.currentRow))
    const code = JSON.parse(JSON.stringify(this.state.code))
    const feedback = this.state.feedback
    const previousFeedback = this.state.previousFeedback
    const previousRows = this.state.previousRows

    /* Checking extact matches */
    for (let i = 0; i < 4; i++) {
      if (currentRow[i] === code[i]) {
        feedback[i] = 2
        delete (currentRow[i])
        delete (code[i])
      }
    }

    /* Checking partial matches */
    for (let i in currentRow) {
      for (let j in code) {
        if (currentRow[i] === code[j]) {
          feedback[i] = 1
          delete (currentRow[i])
          delete (code[j])
        }
      }
    }

    feedback.sort((a, b) => (b - a))

    /* checking if player won */
    let victory = true
    for (let i in feedback) {
      if (feedback[i] < 2) {
        victory = false;
        break;
      }
    }

    /* checking if player lost */
    let defeat = this.state.defeat;
    if (this.state.activeRowIndex >= this.state.totalRows-1) {
      defeat = true;
    }

    /* updating board */
    previousFeedback.push(feedback)
    previousRows.push(this.state.currentRow)

    this.setState({
      feedback: [0, 0, 0, 0],
      activeRowIndex: this.state.activeRowIndex + 1,
      previousFeedback: previousFeedback,
      currentRow: ['', '', '', ''],
      previousRows: previousRows,
      canCheck: false,
      victory: victory,
      defeat: defeat,
    })

  }

  newGame() {
    
    const code = []
    for (let i = 0; i < 4; i++) {
      code.push(this.state.colors[Math.floor(Math.random() * 4) + 1])
    }

    console.log('new Game')
    this.setState({
      activeRowIndex: 0,
      previousRows: [],
      previousFeedback: [],
      currentRow: ['', '', '', ''],
      feedback: [0, 0, 0, 0],
      code: code,
      // canCheck: false,
      // victory: false,
      // defeat: false,
    })

    this.setGame({
      canCheck: false,
      victory: false,
      defeat: false,
    })
  }

  render() {
    let msg = this.state.victory ? 'You Win!!' :
               ( this.state.defeat ? 'You Lost :(' : '')
    return (
      <div className='game-container'>

        <Colors
          list={this.state.colors}
          activeColor={this.state.activeColor}
          action={this.activateColor} />

        <Board
          state={this.state}
          pegAction={this.setColor}
          checkAction={this.checkRow} />

        <p className='msg'> {msg} </p>           
        <Solution
          state={this.state}
          newGame={this.newGame} />
      </div>
    );
  }
}

// import React, { useEffect, useState } from "react";
// import Board from "./board";
// import Colors from "./colors";
// import {Solution} from "./solution";

// /**
//  *
//  * @returns 1. infinite loop  ///because of re-rendering
//  * 2. how to write if we want to invoke set only once //useEffect
//  * 3. how does Set work // it's function like setter
//  * 4. Component life cycle ...... 
//       a. ComponentDidMount : initialized
//       b. ComponentDidUpdate : Update |-->|
//                                      |<--|
//       c. ComponentWillUnmont : Destroy
//       Follow this link to know more :
//       https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/
//       context API ()

//  */
// const colors = ["red", "green", "blue", "orange", "purple"];
//   const [activeColor, setActiveColor] = useState("red");
//   const [currentRow, setCurrentRow] = useState(["", "", "", ""]);
//   const [canCheck, setCanCheck] = useState(false);
//   const [previousRows, setPreviousRows] = useState([]);
//   const [previousFeedback, setPreviousFeedback] = useState([]);
//   const [feedback, setFeedback] = useState([0, 0, 0, 0]);
//   const [activeRowIndex, setRowIndex] = useState(0);
//   const [totalRows, setTotalRows] = useState(10);
//   const [victory, setVictory] = useState(false);
//   const [defeat, setDefeat] = useState(false);
// export const gameRow = {
//   colors: colors,
//   activeColor: activeColor,
//   activeRowIndex: activeRowIndex,
//   totalRows: totalRows,
//   previousRows: previousRows,
//   previousFeedback: previousFeedback,
//   currentRow: currentRow,
//   feedback: feedback,
//   code: code,
//   canCheck: canCheck,
//   victory: victory,
//   defeat: defeat
// };

// function Game() {
  
//   const code = [];
//   for (let i = 0; i < 4; i++) {
//     code.push(colors[Math.floor(Math.random() * 4) + 1]);
//   }
  
//   // const gameRow = {
//   //   colors: colors,
//   //   activeColor: activeColor,
//   //   activeRowIndex: activeRowIndex,
//   //   totalRows: totalRows,
//   //   previousRows: previousRows,
//   //   previousFeedback: previousFeedback,
//   //   currentRow: currentRow,
//   //   feedback: feedback,
//   //   code: code,
//   //   canCheck: canCheck,
//   //   victory: victory,
//   //   defeat: defeat
//   // };

//   const activateColor = (color) => {
//     //gameRow.activeColor = color
//     setActiveColor(color);
//   };

//   // const ActivateCurrentRow = (activeRow) => {
//   //   useEffect(()=>{
//   //     setCurrentRow(activeRow);
//   //   }, [activeRow])
//   // }

//   const setColor = (color, id) => {
//     if (gameRow.victory) {
//       console.log("loose");
//       return false;
//     }
//     const rowId = +id.substr(1, id.indexOf("-") - 1);
//     console.log("row");
//     console.log(rowId);
//     const pegId = +id.substr(id.indexOf("-") + 1);
//     console.log("peg");
//     console.log(pegId);
//     let activeRow = currentRow;
//     let isArrayFull = 0;

//     if (gameRow.activeRowIndex === rowId && color) {
//       activeRow[pegId] = color;
//       console.log(activeRow);
//       //ActivateCurrentRow(activeRow);
//       setCurrentRow(activeRow);
//       console.log(currentRow);
//       //gameRow.currentRow = activeRow

//       for (let i in activeRow) {
//         console.log("length");
//         console.log(activeRow[i].length);
//         if (activeRow[i].length > 0) {
//           isArrayFull++;
//         }
//       }
//       console.log("array");
//       console.log(isArrayFull);
//       if (isArrayFull >= activeRow.length) {
//         console.log("yes");
//         setCanCheck(true);
//         //gameRow.canCheck = true
//       } else {
//         setCanCheck(false);
//         //gameRow.canCheck = false
//       }
//     }
//   };

//   const checkRow = () => {
//     const activeRow = JSON.parse(JSON.stringify(gameRow.currentRow));
//     const secretCode = JSON.parse(JSON.stringify(gameRow.code));
//     const hints = gameRow.feedback;
//     const previousHints = gameRow.previousFeedback;
//     const previousRow = gameRow.previousRows;

//     for (let i = 0; i < 4; i++) {
//       if (activeRow[i] === secretCode[i]) {
//         hints[i] = 2;
//         delete activeRow[i];
//         delete secretCode[i];
//       }
//     }
//     //partially
//     for (let i in activeRow) {
//       for (let j in secretCode) {
//         if (activeRow[i] === secretCode[j]) {
//           hints[i] = 1;
//           delete activeRow[i];
//           delete secretCode[j];
//         }
//       }
//     }
//     hints.sort((a, b) => b - a);

//     let win = true;
//     for (let i in hints) {
//       if (hints[i] < 2) {
//         win = false;
//         break;
//       }
//     }

//     let loss = gameRow.defeat;
//     if (gameRow.activeRowIndex >= gameRow.totalRows - 1) {
//       loss = true;
//     }

//     /* updating board */
//     previousHints.push(hints);
//     previousRow.push(activeRow);

//     setFeedback([0, 0, 0, 0]);
//     setRowIndex(activeRowIndex + 1);
//     setPreviousFeedback(previousHints);
//     setCurrentRow(["", "", "", ""]);
//     setPreviousRows(previousRow);
//     setCanCheck(false);
//     setVictory(win);
//     setDefeat(loss);
//   };
//   const newGame = () => {
//     const secretCode = [];
//     for (let i = 0; i < 4; i++) {
//       secretCode.push(this.state.colors[Math.floor(Math.random() * 4) + 1]);
//     }
//     this.code = secretCode;
//     console.log("new Game");

//     setRowIndex(0);
//     setPreviousRows([]);
//     setPreviousFeedback([]);
//     setCurrentRow(["", "", "", ""]);
//     setFeedback([0, 0, 0, 0]);
//     setCanCheck(false);
//     setVictory(false);
//     setDefeat(false);
//     setTotalRows(10);
//   };

//   return (
//     <div className="game">
//       {/* <p>HIIIIIIIIII</p>
//             <h1>hi </h1> */}

//       <Colors
//         list={colors}
//         activeColor={gameRow.activeColor}
//         action={activateColor}
//       />

//       <Board 
//         state={gameRow} 
//         pegAction={setColor} 
//         checkAction={checkRow} />

//       {/* <p className='msg'> {msg} </p>            */}
//       <Solution state={gameRow} newGame={newGame} />
//     </div>
//   );
// }

// export default Game;








// //import React, { useState } from 'react';
// import Board from './board';
// import Colors from './colors';
// import Solution from './solution';

// /**
//  * 
//  * @returns 1. infinite loop
//  * 2. how to write if we want to invoke set only once
//  * 3. how does Set work
//  * 4. Component life cycle ......
//  */


// function Game() {
//     const colors = ['red', 'green', 'blue', 'orange', 'purple'];
//     const code = [];
//     for(let i=0;i<4;i++) {
//         code.push(colors[Math.floor(Math.random() * 4) + 1])
//     }

//     this.state = {
//       colors: colors,
//       activeColor: "red",
//       previousRows: [],
//       previousFeedback: [],
//       currentRow: ["", "", "", ""],
//       feedback: [0, 0, 0, 0],
//       activeRowIndex: 0,
//       totalRows: 10,
//       code: code,
//       canCheck: false, //this checks if it's ok to eval currentRow
//       victory: false,
//       defeat: false
//     };
//     //let currentRow = ['','','',''];
//     // const [activeColor, setActiveColor] = useState('red');
//     // const [currentRow, setCurrentRow] = useState(["", "", "", ""]);
//     // const [canCheck, setCanCheck] = useState(false);
//     // const [previousRows, setPreviousRows] = useState([]);
//     // const [previousFeedback, setPreviousFeedback] = useState([]);
//     // const [feedback, setFeedback] = useState([0,0,0,0]);
//     // const [activeRowIndex, setRowIndex] = useState(0);
//     // const [totalRows, setTotalRows] = useState(10);
//     // const [victory, setVictory] = useState(false);
//     // const [defeat, setDefeat] = useState(false);
//     // const gameRow = {
//     //   colors: colors,
//     //   activeColor: activeColor,
//     //   activeRowIndex: activeRowIndex,
//     //   totalRows : totalRows,
//     //   previousRows: previousRows,
//     //   previousFeedback: previousFeedback,
//     //   currentRow: currentRow,
//     //   feedback: feedback,
//     //   code: code,
//     //   canCheck: canCheck,
//     //   victory: victory,
//     //   defeat: defeat,
//     // };
  
//     const activateColor = (color) => {
//         //gameRow.activeColor = color
//         //setActiveColor(color)
//         this.setState({
//           activeColor: color
//         });
//     }

//     // const activateCircleColor = (props) => {
//     //   setCurrentRow(props);
//     // }
//     const setColor = (color, id) => {
//       if (this.state.victory) {
//         return false;
//       }
//       const rowId = +id.substr(1, id.indexOf("-") - 1);
//       const pegId = +id.substr(id.indexOf("-") + 1);
//       let currentRow = this.state.currentRow;
//       let isArrayFull = 0;
//       if (this.state.activeRowIndex === rowId && color) {
//         currentRow[pegId] = color;
//         this.setState({
//           currentRow: currentRow
//         });
//         /* Checking if currentRow is Full */
//         for (let i in currentRow) {
//           if (currentRow[i].length > 0) {
//             isArrayFull++;
//           }
//         }
//         if (isArrayFull >= currentRow.length) {
//           this.setState({ canCheck: true });
//         } else {
//           this.setState({ canCheck: false });
//         }
//       }
//     }
//     // const setColor = (color, id) => {
//     //   if (gameRow.victory) {
//     //       console.log("loose");
//     //       return false;
//     //   }
//     //   const rowId = +id.substr(1, id.indexOf("-") - 1);
//     //   console.log("row");
//     //   console.log(rowId);
//     //   const pegId = +id.substr(id.indexOf("-") + 1);
//     //   console.log("peg");
//     //   console.log(pegId);
//     //   let activeRow = gameRow.currentRow;
//     //   let isArrayFull = 0;
//     //     //activateCircleColor(activeRow);
//     //   if (gameRow.activeRowIndex === rowId && color) {
//     //     activeRow[pegId] = color;
//     //     console.log(activeRow);
//     //     console.log(currentRow);
//     //     gameRow.currentRow = activeRow
    
//     //     for (let i in activeRow) {
//     //         console.log("length");
//     //         console.log(activeRow[i].length);
//     //         if (activeRow[i].length > 0) {
//     //           isArrayFull++;
//     //       }
//     //     }
//     //     console.log("array");
//     //     console.log(isArrayFull);
//     //     if (isArrayFull >= activeRow.length) {
//     //         console.log("yes");
//     //         setCanCheck(true);
//     //         //gameRow.canCheck = true
//     //     } else {
//     //         setCanCheck(false);
//     //         //gameRow.canCheck = false
//     //     }
//     //   }
//     // };    
    
//     const checkRow = () => {
//         const activeRow = JSON.parse(JSON.stringify(this.state.currentRow))
//         const secretCode = JSON.parse(JSON.stringify(this.state.code))
//         const hints = this.state.feedback
//         const previousHints = this.state.previousFeedback
//         const previousRow = this.state.previousRows
    
//         for (let i = 0; i < 4; i++) {
//           if (activeRow[i] === secretCode[i]) {
//             hints[i] = 2
//             delete (activeRow[i])
//             delete (secretCode[i])
//           }
//         }
//         //partially 
//         for (let i in activeRow) {
//           for (let j in secretCode) {
//             if (activeRow[i] === secretCode[j]) {
//               hints[i] = 1
//               delete (activeRow[i])
//               delete (secretCode[j])
//             }
//           }
//         }
//         hints.sort((a, b) => (b - a))

//         let win = true
//         for (let i in hints) {
//           if (hints[i] < 2) {
//             win = false;
//             break;
//           }
//         }
    
//         let loss = this.state.defeat;
//         if (this.state.activeRowIndex >= this.state.totalRows-1) {
//           loss = true;
//         }
    
//         /* updating board */
//         previousHints.push(hints)
//         previousRow.push(activeRow)

//         this.setState({
//           feedback: [0, 0, 0, 0],
//           activeRowIndex: this.state.activeRowIndex + 1,
//           previousFeedback: this.state.previousFeedback,
//           currentRow: ['', '', '', ''],
//           previousRows: previousRow,
//           canCheck: false,
//           victory: win,
//           defeat: loss,
//         });

//         // setFeedback([0, 0, 0, 0])
//         // setRowIndex(activeRowIndex+1)
//         // setPreviousFeedback(previousHints)
//         // setCurrentRow(["","","",""])
//         // setPreviousRows(previousRow)
//         // setCanCheck(false)
//         // setVictory(win)
//         // setDefeat(loss)
    
//       }
//     const newGame = () => {
    
//         const secretCode = []
//         for (let i = 0; i < 4; i++) {
//             secretCode.push(this.state.colors[Math.floor(Math.random() * 4) + 1])
//         }
//         //this.code = secretCode
//         console.log('new Game')

//         // setRowIndex(0)
//         // setPreviousRows([])
//         // setPreviousFeedback([])
//         // //setCurrentRow(['','','',''])
//         // setFeedback([0,0,0,0])
//         // setCanCheck(false)
//         // setVictory(false)
//         // setDefeat(false)
//         // setTotalRows(10)
//       }
    
//     return (
//         <div className='game'>
//             {/* <p>HIIIIIIIIII</p>
//             <h1>hi </h1> */}
  
//           <Colors
//             list={this.state.colors}
//             activeColor={this.state.activeColor}
//             action={activateColor} />

//           <Board
//             state={this.state}
//             pegAction={setColor}
//             checkAction={checkRow} />

//         {/* <p className='msg'> {msg} </p>            */}
//           <Solution
//             state={this.state}
//             newGame={newGame} />
//           </div>
//       );  
      
// }

// export default Game;
