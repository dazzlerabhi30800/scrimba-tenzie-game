import React, {useState, useEffect} from 'react';
import './style.css'
import Die from './Die'
import Button from './Button'
import {nanoid} from 'nanoid';
import Confetti from 'react-confetti';

function Header() {
    const [dice, setDice] = useState(allNewDice());
    const [tenzies, setTenzies] = useState(false);

    useEffect(() => {
        const allHeld = dice.every(die => die.isHeld);
        const firstValue = dice[0].value;
        const allSameValues = dice.every(die => die.value === firstValue);
        if(allHeld && allSameValues ) {
            setTenzies(true);
            console.log("You Won!");
        }
    },[dice])

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
        if(!tenzies){
            setDice(oldDice => oldDice.map(die => {
                return die.isHeld ?
                die :
                generateNewDie()
            }));
        }else {
            setTenzies(false);
            setDice(allNewDice());
        }
    }

    function holdDice(id) {
        setDice(oldDice => oldDice.map(die => {
            return die.id === id ? {...die, isHeld: !die.isHeld}:
                    die
        }))
    }

    return(
        <main>
            {tenzies && <Confetti width="800" height="500" />}
            <h1 className='titles'>Tenzies</h1>
            <p className='instructions'>Roll until all dice are the dice. Click each die to freeze it at its current value between rolls.</p>
          <div className='dice--container'>
            {diceElements} 
          </div> 
          <Button rollDice={rollDice} tenzies={tenzies} />
        </main>
    )
}

export default Header;