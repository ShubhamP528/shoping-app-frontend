import React from 'react'
import styled from 'styled-components';

function Product(props) {


  return (


    <Card>
        <Img src={props.img}></Img>
        <CardBody>
            <Title>{props.title}</Title>
            <Price>{props.price}</Price>
            <Desc>{props.desc.slice(0,90)}...</Desc>
            {/* <Button>Buy</Button> */}
        </CardBody>
     </Card>

  )
}

const Card=styled.div`  
    width: 16rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 5px;
    padding-bottom: 20px;
    border: 2px solid gray;
    border-radius: 5px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
`;

const Img=styled.img`
    border-radius: 2px;
    height: 14rem;
    width: 100%;
`;

const CardBody=styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Title=styled.h2`
    text-transform: capitalize;
`;

const Price=styled.h3`
`;

const Desc=styled.p`

`;

const Button=styled.button`
    font-size: 1rem;
    padding: 2px 8px;
    border-radius: 5px;
    background-color: lightblue;
    border: 2px solid black;
`;

export default Product;
