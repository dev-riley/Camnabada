import React from "react";
import styled from "styled-components";
import palette from '../../../lib/styles/palettes';
// src\lib\styles\palettes.js

const SearchButtonArea = styled.div`
    width: 60px;
    float: left;
`;

const Button = styled.button`
    width: 90px;
    height: 40px;
    border-radius: 4px;
    background-color: ${ palette.blue[1] };
    color: #ffffff;
    outline: none;
    border: none;
    &: hover {
        width: 90px;
        height: 40px;
        border-radius: 4px;
        background-color: ${ palette.blue[2] };
        color: #ffffff;
        outline: none;
        border: none;
    }
`;

const InputButton = () =>{
    return(
        <SearchButtonArea>
            <Button>
                검색
            </Button>
        </SearchButtonArea>
    );
};

export default InputButton;