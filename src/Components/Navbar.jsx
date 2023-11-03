import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useState } from 'react';
import { BsFillCaretDownFill } from 'react-icons/bs';
// import { FiSearch } from 'react-icons/fi';

function Navbar(props) {

    const [search, setSearch]= useState("");
    const [show, setShow]= useState(false);
    const [toggle,setToggle]=useState(false);

    useEffect(()=>{
        props.find(search);
    },[search])


    const SearchBarHandler=(e)=>{
        setSearch(e.target.value);
        props.find(search);
        props.sort("");
    }

    const SubmitHandler=(e)=>{
        e.preventDefault();
        // props.find(search);
    }

    const ShowHandler=(e)=>{
        setShow(!show)
    }


    const ClickHandler=(e)=>{
        setToggle(!toggle)
    }

    const SortHandler1=(e)=>{
        props.sort("low");
    }

    const SortHandler2=(e)=>{
        props.sort("high");
    }


  return (
    <NavBar>
        <Brand>ShopKart</Brand>
        <NavLink>
            <Link><Ancer href='#'>Home</Ancer></Link>
            <Link><Ancer href='#'>Electornics</Ancer></Link>
            <Link><Ancer href='#'>Garments</Ancer></Link>
            <Link><Ancer href='#'>Accessories</Ancer></Link>
        </NavLink>
        <InpForm onSubmit={SubmitHandler} >
            <Inp onChange={SearchBarHandler} name='search' value={search} type='text'></Inp>
            {/* <FiSearch style={{position:"relative", right:"185px", color:"gray", }}/> */}
        </InpForm>

        {
            search===""
            ?
                ""
            :
                <DropContainer>

                    <Link onClick={ShowHandler} ><Ancer href='#'>Filter <BsFillCaretDownFill style={{position:"relative", top:"5px", fontSize:"1.2rem"}}/></Ancer></Link>
            
                {
                    show===false ?

                    ""
                        :
                
                
                <Wrap>
                    <DropDown >
                        <DropUl>
                            <DropLi onClick={ClickHandler}>Sort By</DropLi>
                            <DropLi>Category By</DropLi>
                            <DropLi>Brand By</DropLi>
                            <DropLi>Size By</DropLi>
                        </DropUl>
                    </DropDown>



                    {
                     toggle===false
                     ?
                     ""
                     :
                     <DropDown style={{left:"86vw"}}>
                         <DropUl>
                             <DropLi onClick={SortHandler1}>Low to High</DropLi>
                             <DropLi onClick={SortHandler2}>High to Low</DropLi>
                             <DropLi>Featured</DropLi>
                         </DropUl>
                    </DropDown>
                    }

                    </Wrap>

                   
                }
                
                </DropContainer>
        }
    </NavBar>
  )
}

const NavBar=styled.nav`
    display: flex;
    align-items: center;
    background-color: aqua;
    height: 3rem;
    gap: 20px;
    font-size: 1.4rem;
    width: 100vw;
`;

const Brand=styled.h2`
    margin-right: 100px;
`;

const NavLink=styled.ul`
    list-style: none;
    display: flex;
    gap: 50px;
`;

const Link=styled.li`
    list-style: none;
`;

const Ancer=styled.a`
    text-decoration: none;
    color: black;
`;

const InpForm=styled.form`
    display: flex;
    gap: 5px;
`;

const Inp=styled.input`
    padding: 4px 20px;
    &:focus{
        outline: none;
    }
    border: none;
    font-size: 1.2rem;
    border-radius: 20rem;
`;

const DropContainer=styled.div``;

const Wrap=styled.div`

`;

const DropDown=styled.div`
    width: 150px;
    border: 2px solid red;
    position: absolute;
    top: 50px;
    left: 75vw;
    font-size: 1rem;
    background-color: white;
`;

const DropUl=styled.ul`
    list-style: none;
`;

const DropLi=styled.li`
    border: 1px solid gray;
    border-radius: 5px;
    margin: 4px;
    padding: 3px;
    cursor: pointer;
    &:hover{

    }
`;




export default Navbar