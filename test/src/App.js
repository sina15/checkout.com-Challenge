import React, { useEffect,useState } from 'react';
import logo from './logo.svg';
import './App.css';
import styled from 'styled-components'
import ContainerComponent from './components/container';
import { fetchMasterRef } from './actions/api';
import { mainUrl } from './constants'

const Wrapper = styled.section`
  width:100%;
  height:100vh;
  margin:0;
  padding:0;
  display:flex;
  justify-content:center;
  align-items:center;
  background:#dcdcdc;
`
function App() {
 
  const [apiData,setApiData] = useState();
  useEffect(() => {
    fetchMasterRef(mainUrl).then(data => {
      if(data.action) setApiData(data);
    })
  }, [])
  return (
    
    <Wrapper >
      <ContainerComponent apiData = {apiData}/>
    </Wrapper>
  );
}

export default App;
