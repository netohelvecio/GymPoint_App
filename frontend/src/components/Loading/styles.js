import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  from{
    transform: rotate(0deg);
  }
  to{
    transform: rotate(360deg);
  }
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 60px 0;

  span {
    margin-left: 10px;
    color: #444;
    font-weight: bold;
    font-size: 20px;
  }

  svg {
    margin: 0px;
    padding: 0px;
    animation: ${rotate} 1s linear infinite;
  }
`;
