import React, { Dispatch, MouseEventHandler, SetStateAction, useCallback, useState } from 'react';
import styled from "styled-components";
import {evaluate} from "mathjs"

const CalcBody = styled.div`
  margin: auto;
  width: 410px;
  height: 400px;
  display: flex;
  flex-wrap: wrap;
`

const Button = styled.button`
  background-color: black;
  color: green;
  width: 25%;
  border-radius: 8px;
  font-size: 20px;
`

const SpecialBtn = styled.button`
  background-color: black;
  color: green;
  width: 33.3%;
  border-radius: 8px;
  font-size: 16px;
`

const buttons = ['7', '8', '9', '÷', '4', '5', '6', '*', '1', '2', '3', '-', '0', '.', '=', '+']

const specialBtns = ['clear', 'MS', 'MR']

const operatorList = ['/', '*', '+', '-', '=']

function CalculatorBody(props: { valueSetter: Dispatch<SetStateAction<string>>; value: string; }) {
  const [expression, setExpression] = useState('');
  const [evaulated, setEvaulated] = useState(false);

  const handleSpecials = useCallback((event: any) => {
    const value = event.target.value
    switch (value) {
      case 'clear':
        props.valueSetter('0')
        break;
      case 'MS':
        fetch('http://localhost:3030/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ value: props.value })
        })
        break;
      case 'MR':
        fetch('http://localhost:3030/', {
          method: 'GET'
        })
        .then((data) => data.json())
        .then((data) => {
          const oldValue = props.value === '0' ? '' : props.value
          const exp = expression === '' ? `${oldValue}${data}` : `${expression}${data}`
          setExpression(exp)
          props.valueSetter(data)
        })
        break;
      default:
        break;
    }
  }, [props.value])

  const handleClick = useCallback((event: any) => {
    let newValue = event.target.value
    if (newValue === "÷") newValue = '/'
    if (evaulated && Number(newValue)) {
      props.valueSetter(newValue)
      setEvaulated(false)
    } else {
      const oldValue = props.value === '0' ? '' : props.value

      if (newValue !== '=') {
        const exp = expression === '' ? `${oldValue}${newValue}` : `${expression}${newValue}`
        setExpression(exp)
      }
      
      if (isNaN(Number(newValue)) && operatorList.includes(newValue)) {
        if (newValue === '=') {
          const result = evaluate(expression)
          setEvaulated(true)
          setExpression('')
          props.valueSetter(`${result}`)
        } else {
          props.valueSetter('0')
          setEvaulated(false)
        }
      } else {
        const concatenatedNumber = `${oldValue}${newValue}`;
        props.valueSetter(concatenatedNumber)
        setEvaulated(false)
      }
    }
    
  }, [props.value])


  return (
    <CalcBody>
      {
        specialBtns.map((sb) => {
          return (
            <SpecialBtn key={sb} onClick={handleSpecials} value={sb}>{sb}</SpecialBtn>
          )
        })
      }
      {
        buttons.map((btn) => {
          return (
            <Button key={btn} onClick={handleClick} value={btn}>{btn}</Button>
          )
        })
      }
    </CalcBody>
  )
}

export default CalculatorBody