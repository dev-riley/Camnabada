import React from 'react';
import styled from 'styled-components';
import Input from '../../common/Input';

const InputBarArea = styled.div`
    float: left;
    width: inherit;
`;

const InputBar = ({ placeholder }) => {
    return(
        <InputBarArea>
            <Input name="InputBar"
                   type="text"
                   placeholder={ placeholder }
            />
        </InputBarArea>
    );
};

export default InputBar;