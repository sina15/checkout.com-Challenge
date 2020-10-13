import React from 'react';
import styled from 'styled-components'
import CalendarComponent from './calendar';
import IntoComponent from './intro'

//container div including calendar and text
const Container = styled.section`
   width:95%;
   height:500px;
   background:#f1f1f1;
   position:relative;
   display:flex;
   justify-content:center;
   align-items:center;
   flex-direction:row;
   &::before{
       content:"Financial Data & Reporting ";
       position:absolute;
       top:-20px;
       left:0;
   }

   @media only screen and (max-width: 968px){
      height:600px;
   }

   @media only screen and (max-width: 769px){
      flex-direction:column;
      height:90%;
   }

`
const ContainerComponent = ({ apiData }) => {
   return (
      <Container>
         <IntoComponent apiData={apiData} width="400" height="250"></IntoComponent>
         <CalendarComponent width="500" height="250"></CalendarComponent>
      </Container>
   )
}

export default ContainerComponent
