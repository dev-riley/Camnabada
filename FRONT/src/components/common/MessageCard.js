import React from 'react';
import styled from 'styled-components';
// import palette from './lib/styles/palettes';
import palette from '../../lib/styles/palettes';

const Card = styled.div`
    width: 100%;
    height: 80px;
    &:hover {
        background-color: ${palette.gray[2]}
    }
    padding-top: 1rem;
    // padding-left: 4rem;
`;

const Nickname = styled.div`
    float: left;
    width: 70%;
    height: 40px;
`;

const Date = styled.div`
    float: left;
    width: 30%;
    height: 40px;
`;

const Content = styled.div`
    width: 100%;
    height: 80px;
    overflow: hidden;
`;





const MessageCard = ({ item, i }) => {
    return(
        <Card>
            <Nickname>
                { item.user } 
            </Nickname>
            <Date>
                { item.date }
            </Date>
            <Content>
                { item.message }
            </Content>
        </Card>
    );
};

export default MessageCard;