import React from 'react';
import styled from 'styled-components';

const StyledError = styled.div`
    height: 100px; 
    padding: 15px;
    margin: 0 auto;
    text-align: center;
    background-color: red;
    color: white;
`;

const Error = () => {
    return (
        <StyledError>
            Произошла ошибка! <br/>
            Проверьте соединение и обновите страницу
        </StyledError>
    );
};

export default Error;