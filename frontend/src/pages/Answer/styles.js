import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  margin: 30px auto;
  width: 40%;
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

export const AnswerTable = styled.table`
  width: 100%;
  margin-top: 20px;
  background: #fff;
  padding: 30px 30px;
  border-radius: 8px;

  thead {
    color: #444;
    text-align: left;
    padding-bottom: 10px;

    th {
      & + th {
        text-align: center;
        vertical-align: middle;
      }
    }
  }

  td {
    font-size: 16px;
    color: #666;
    text-align: left;
    line-height: 20px;

    & + td {
      padding: 12px 0;

      text-align: center;
      vertical-align: middle;
    }

    div {
      display: flex;
      justify-content: flex-end;
      align-items: baseline;

      button {
        background: none;
        border: 0;
        font-size: 14px;
        padding: 6px;
        color: #4d85ee;
      }
    }
  }
`;

export const Pagination = styled.div`
  padding-top: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;

  span {
    color: #666;
    font-size: 16px;
  }

  button {
    border-radius: 4px;
    outline: 0;
    border: 0;
    background: #ee4d64;
    color: #fff;
    padding: 8px;

    &:disabled {
      opacity: 0.35;
      cursor: not-allowed;
    }
  }
`;

export const AnswerModal = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;

  > span {
    font-size: 14px;
    font-weight: bold;
    color: #444;
    text-align: left;
    margin-bottom: 10px;
  }

  p {
    font-size: 16px;
    color: #666;
    max-width: 400px;
    line-height: 26px;
    margin-bottom: 15px;
  }

  form {
    display: flex;
    flex-direction: column;
    justify-content: center;

    label {
      font-size: 14px;
      font-weight: bold;
      color: #444;
      text-align: left;
      padding: 8px 0;
    }

    span {
      color: #f80d46;
      margin-top: 4px;
    }

    textarea {
      background: #fff;
      border: 1px solid #ccc;
      border-radius: 4px;
      padding: 8px;
      font-size: 16px;
      resize: none;
      min-width: 400px;

      &::placeholder {
        color: #999999;
        font-size: 16px;
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
    margin-top: 18px;

    &:hover {
      background: ${darken(0.05, '#ee4d64')};
    }
  }
`;
