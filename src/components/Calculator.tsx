import React, { useState } from 'react';
import CalculatorHeader from './CalculatorHeader';
import CalculatorBody from './CalculatorBody';

function Calculator() {
  const [value, setValue] = useState<string>('0');

  return (
    <>
      <CalculatorHeader value={value}/>
      <CalculatorBody valueSetter={setValue} value={value}/>
    </>
  )
}

export default Calculator;