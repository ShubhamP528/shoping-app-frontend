import React from 'react'
import styled from 'styled-components';
import Product from './Product';
import { useState, useEffect } from 'react';
import axios from 'axios';


function ProductList(props) {

    const [product, setProduct]=useState([]);
    const [tempProduct, setTempProduct]=useState([]);
    const [sor,setSor]=useState(props.send);
    useEffect(()=>{
        axios.get('/products')
        .then((fatcheddata)=>{
            // console.log(fatcheddata.data)
            setProduct(fatcheddata.data);
            setTempProduct(fatcheddata.data);
        })
    },[])

    const F=props.find.toLowerCase();
    function Pro(P) {
        if(P.title.indexOf(F)===-1){
            return false;
        }
        else{
            return true;
        }  
    }

    function comapare(a,b){
        return a.price-b.price;
    }
 


    useEffect(()=>{
        setTempProduct(product.filter(Pro)) 
        if(F===""){
            axios.get('/products')
            .then((fatcheddata)=>{
                setProduct(fatcheddata.data);
                setTempProduct(fatcheddata.data);

            })
        }

    },[props.find])

    // const [sortby, setSortby]=useState([]);


    useEffect(()=>{
       if(props.send==="low"){
        setSor("some")
        tempProduct.sort(comapare)
       }
       else
       if(props.send==="high"){
        setSor("so")
        tempProduct.sort(comapare)
        tempProduct.reverse();
       }

    },[props.send])


        const prod=tempProduct.map(p=><Product
            key={p._id}
            title={p.title}
            img={p.img}
            price={p.price}
            desc={p.desc}
            ></Product>)


    

  return (
    <MainContainer>{
        product.filter(Pro).length==0 ?  <Error><ErrorMess>404 NOT Found!!</ErrorMess></Error> : prod
        }
    </MainContainer>  )
}

const MainContainer=styled.div`
  margin: 20px 50px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 90px;
`;

const ErrorMess=styled.h1`
    font-size: 10rem;
    color: #121212;

  text-shadow: 0 2px 1px #747474, 
      -1px 3px 1px #767676, 
      -2px 5px 1px #787878, 
      -3px 7px 1px #7a7a7a,
      -4px 9px 1px #7f7f7f,
      -5px 11px 1px #838383,
      -6px 13px 1px #878787,
      -7px 15px 1px #8a8a8a, 
      -8px 17px 1px #8e8e8e,
      -9px 19px 1px #949494,
      -10px 21px 1px #989898,
      -11px 23px 1px #9f9f9f,
      -12px 25px 1px #a2a2a2, 
      -13px 27px 1px #a7a7a7,
      -14px 29px 1px #adadad,
      -15px 31px 1px #b3b3b3,
      -16px 33px 1px #b6b6b6,
      -17px 35px 1px #bcbcbc, 
      -18px 37px 1px #c2c2c2,
      -19px 39px 1px #c8c8c8,
      -20px 41px 1px #cbcbcb,
      -21px 43px 1px #d2d2d2,
      -22px 45px 1px #d5d5d5, 
      -23px 47px 1px #e2e2e2,
      -24px 49px 1px #e6e6e6,
      -25px 51px 1px #eaeaea,
      -26px 53px 1px #efefef;
`;

const Error=styled.div`
    height: 90vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;

`;

export default ProductList