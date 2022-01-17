import React from 'react'
import Circles from './circles';

const Board = (props) => {
    let rows = [];
    console.log(props.state.totalRows);
    console.log(props.state.activeRowIndex)
    for (let i = 0; i < props.state.totalRows; i++) {
      rows.push(
        <Row
          key={'row_' + i}
          id={'row_' + i}
          state={props.state}
          pegAction={props.pegAction}
          checkAction={props.checkAction} />
        )
    }
    return (
      <div className='board'>
        {rows}
      </div>
    );
}


const Row = (props) => {
  let active = ''
  if (+props.id.substr(4) === props.state.activeRowIndex) {
    active = 'active'
  }

  return (
    <div className={'row ' + active} id={props.id}>
      <Circles
        rowId={props.id}
        state={props.state}
        pegAction={props.pegAction} />
      <OkButton
        state={props.state}
        rowId={props.id}
        checkAction={props.checkAction} />
      <Hints
        state={props.state}
        rowId={props.id} />
    </div>
  )
}

const Hints = (props) => {
  let allHints = []
  let hintClass = ''
  const rowId = +props.rowId.substr(4)
  const hintArr = props.state.feedback
  const prevHints = props.state.previousFeedback

  for (let i = 0; i < hintArr.length; i++) {
    if (rowId === props.state.activeRowIndex) {
      hintClass = hintArr[i] === 2 ? 'exact' : (hintArr[i] === 1 ? 'partial' : '')
    } else {
      for (let j = 0; j < prevHints.length; j++) {
        if (rowId === j) {
          hintClass = prevHints[j][i] === 2 ? 'exact' : (prevHints[j][i] === 1 ? 'partial' : '')
        }
      }
    }

    allHints.push(
      <CheckBox
        hintClass={hintClass}
        key={'h_' + rowId + i}
        id={'h_' + rowId + i} />
    )
  }
  return (
    <div className='hints'>
      {allHints}
    </div>
  )
}

const CheckBox = (props) => (
  <span
    className={props.hintClass}
    id={props.id}>
  </span>
)

const OkButton = (props) => {
  const row = +props.rowId.substr(4)
  let disabled = 'disabled'
  const doNothing = () => (false)

  if (props.state.activeRowIndex === row) {
    disabled = props.state.canCheck ? '' : 'disabled'
  }
  const checkAction = disabled === 'disabled' ? doNothing : props.checkAction

  return (
    <div
      className={'ok-button ' + disabled}
      onClick={checkAction}>
      check
    </div>
  )
}

export default Board;
