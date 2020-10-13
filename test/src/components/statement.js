import React from 'react'
import styled from 'styled-components';

const Header = styled.h6`
width:90%;
font-family:bold;
padding:0;
margin:0;
margin-top:10px;
margin-left:5%;

`
const Div1 = styled.section`
width:90%;
font-family:bold;
padding:0;
margin-left:5%;
margin-top:10px;
display:flex;
flex-direction:row;
justify-content:space-between;
div{
  width:30%;

  &:first-child{
    color:green;
  }
}
`

const Div2 = styled(Div1)`
justify-content{
  space-around;
}
margin-top:80px;
hr{
  width:100%;
}
div{
  width:20%;
}
`
const Statement = (props) => {
  return (
    <section className="floatItem statement" style={{ top: props.top, left: props.left }}>
      <Header>Statement {props.dataValue}</Header>
      <Div1>
        <div>
          <hr></hr><hr></hr><hr></hr>
        </div>
        <div>
          <hr></hr><hr></hr><hr></hr>
        </div>

      </Div1>
      <hr></hr>
      <Div2>

        <div>
          <hr></hr><hr></hr><hr></hr>
        </div>

        <div>
          <hr></hr><hr></hr><hr></hr>
        </div>

        <div>
          <hr></hr>
          <hr></hr>
          <hr></hr>
        </div>

      </Div2>

    </section>
  )
}

export default Statement;