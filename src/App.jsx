import styled from 'styled-components';
import './App.css';
import Navbar from './Components/Navbar';
import ProductList from './Components/ProductList';
import { useState } from 'react';

function App() {

  const [search,setSearch]=useState("");
  const [S, setS]=useState("");

  const data=(s)=>{
    setSearch(s);
  }



function Sfun(data){
  setS(data);
}

  return (

    <MainContainer>
      <Navbar sort={Sfun} find={data}/>
      <ProductList send={S} find={search}/>

    </MainContainer>
 
  );
}

const MainContainer=styled.div``;





export default App;
