import './App.css';
import {Game} from './game.js'

// //set variables for new board
// this.row = row; //something like this, use a constructor or default values.
// //then genrate random values for once which will be your secret code.

// //if user enters and checks values for one row, then disable it and move to next, so total 10 rows and 4 col.

// //Board Function 
// let rows = [];
//     for (let i = 0; i < 4; i++) {
//       rows.push(
//         <Row
//           key
//           id
//           state />
//         )
//     }

//     // 1 1 1 1 --- 2 1 0 0

//     // 1 2 3 4 //code
//     // 4 2 3 1 //user 1 2 2 1

//     // 1 2 4 3 // user2


//     for (4 times) {
//       if (user[i] === code[i]) {  //1 1 1 1
//         feedback[i] = 2 //just to make some checkpoints, feedback.push(2);
//         delete the (user[i])
//         delete the (code[i])
//       }
//     }

//     for (user array) {
//       for (code array) {
//         if (user[i] === code[j]) {
//           feedback[i] = 1
//           delete the (user[i])
//           delete the (code[j])
//         }
//       }
//     }

//     /* Check Win */
//     let win = true
//     for (i in feedback) {
//       if (feedback[i] < 2) {
//         win = false;
//         return feedback
//         //break;
//       }
//     }

function App() {
  return (
    <div className="App">
      <h1>
        MasterMind
      </h1>
      <Game />
    </div>
  );
}

export default App;
