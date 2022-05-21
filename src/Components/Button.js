import React from 'react';
import './style.css'

function Button(props) {
    return(
       <div className='die--button'>
           <button onClick={props.rollDice}>{props.tenzies ? "New GameRoll" : "Roll"}</button>
       </div>
    )
}


export default Button;