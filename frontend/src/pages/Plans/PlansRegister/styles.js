import styled from 'styled-components';
import { darken } from 'polished';
import { Form } from '@rocketseat/unform';

export const Container = styled.div`
  margin: 30px auto;
  width: 60%;

  form {
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    padding: 20px;
    background: #fff;
    border-radius: 4px;

    span {
      margin-top: 3px;
      color: #f80d46;
    }

    label {
      font-size: 14px;
      font-weight: bold;
      margin: 8px 0;
      color: #444;
    }

    > input {
      background: #fff;
      border: 1px solid #ccc;
      border-radius: 4px;
      height: 44px;
      padding: 0 15px;

      &::placeholder {
        color: #999999;
        font-size: 16px;
      }
    }

    > div {
      display: flex;

      div {
        display: flex;
        flex: 1;
        margin: 5px;
        flex-direction: column;

        input {
          background: #fff;
          border: 1px solid #ccc;
          border-radius: 4px;
          height: 44px;
          padding: 0 15px;
        }

        input:read-only {
          background-color: #eee;
        }

        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
      }
    }
  }
`;

export const ContainerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  h1 {
    font-size: 24px;
    color: #444;
    font-weight: bold;
  }
`;

export const RegisterOptions = styled.div`
  display: flex;

  a {
    background: #bbb;
    font-weight: bold;
    color: #fff;
    border: 0;
    border-radius: 4px;
    font-size: 16px;
    transition: background 0.2s;
    height: 35px;
    padding: 0 25px;
    margin-right: 10px;

    display: flex;
    justify-content: center;
    align-items: center;

    svg {
      margin-right: 8px;
    }

    &:hover {
      background: ${darken(0.05, '#bbb')};
    }
  }

  button {
    background: #ee4d64;
    font-weight: bold;
    color: #fff;
    border: 0;
    border-radius: 4px;
    font-size: 16px;
    transition: background 0.2s;
    height: 35px;
    padding: 0 25px;
    margin-right: 10px;

    display: flex;
    justify-content: center;
    align-items: center;

    svg {
      margin-right: 8px;
    }

    &:hover {
      background: ${darken(0.05, '#ee4d64')};
    }
  }
`;

export default styled(Form)`
  background: red;
`;
