import React from 'react';
import styled from "styled-components"

const Header = styled.div`
  background-color: black;
  color: green;
  width: 400px;
  height: 30px;
  border-radius: 8px;
  text-align: end;
  margin: auto;
  padding: 10px 10px 0 0;
  font-weight: bold;
`

function CalculatorHeader(props: {value: string;}) {
  return (
    <Header>
      {props.value}
    </Header>
  )
}

export default CalculatorHeader