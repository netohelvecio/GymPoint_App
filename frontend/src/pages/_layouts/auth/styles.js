import styled, { keyframes } from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  height: 100%;
  background: #ee4d64;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const rotate = keyframes`
  from{
    transform: rotate(0deg);
  }
  to{
    transform: rotate(360deg);
  }
`;

export const Content = styled.div`
  background: #fff;
  width: 100%;
  max-width: 350px;
  padding: 60px 25px;
  border-radius: 8px;
  box-shadow: 0px 2px 12px -5px rgba(0, 0, 0, 0.75);

  form {
    display: flex;
    justify-content: center;
    flex-direction: column;

    img {
      width: 160px;
      align-self: center;
      margin-bottom: 15px;
    }

    label {
      font-size: 14px;
      font-weight: bold;
      margin: 8px 0;
    }

    input {
      background: #fff;
      border: 1px solid #eee;
      border-radius: 4px;
      height: 44px;
      padding: 0 15px;

      &::placeholder {
        color: #999999;
      }
    }

    button {
      margin-top: 15px;
      height: 44px;
      background: #ee4d64;
      font-weight: bold;
      color: #fff;
      border: 0;
      border-radius: 4px;
      font-size: 16px;
      transition: background 0.2s;

      display: flex;
      justify-content: center;
      align-items: center;

      &:hover {
        background: ${darken(0.05, '#ee4d64')};
      }

      svg {
        margin: 0px;
        padding: 0px;
        animation: ${rotate} 1s linear infinite;
      }
    }

    span {
      color: #fa4571;
      align-self: flex-start;
      margin: 5px 0;
      font-weight: bold;
    }
  }
`;
