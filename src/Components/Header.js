import React, {useState} from 'react';
import './style.css'
import Die from './Die'
import Button from './Button'
import {nanoid} from 'nanoid';

function Header() {
    const [dice, setDice] = useState(allNewDice());

    function generateNewDie() {
        return{
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }
    }

    function allNewDice() {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push(generateNewDie())
        }
        return newDice
    }
    
    const diceElements = dice.map((die, index) => <Die holdDice={() => holdDice(die.id)} key={die.id} id={die.id}  value={die.value} isHeld={die.isHeld} />)
    
    function rollDice() {
        setDice(oldDice => oldDice.map(die => {
            return die.isHeld ?
                die :
                generateNewDie()
        }));
    }

    function holdDice(id) {
        setDice(oldDice => oldDice.map(die => {
            return die.id === id ? {...die, isHeld: !die.isHeld}:
                    die
        }))
    }

    return(
        <main>
            <h1 className='titles'>Tenzies</h1>
            <p className='instructions'>Roll until all dice are the dice. Click each die to freeze it at its current value between rolls.</p>
          <div className='dice--container'>
            {diceElements} 
          </div> 
          <Button rollDice={rollDice} />
        </main>
    )
}

export default Header;