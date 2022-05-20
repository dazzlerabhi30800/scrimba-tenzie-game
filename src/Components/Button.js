import React from 'react';
import './style.css'

function Button(props) {
    return(
       <div className='die--button'>
           <button onClick={props.rollDice}>Roll</button>
       </div>
    )
}


export default Button;