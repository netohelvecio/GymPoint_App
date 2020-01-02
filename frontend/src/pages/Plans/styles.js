import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  margin: 30px auto;
  width: 60%;
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
    background: #ee4d64;
    font-weight: bold;
    color: #fff;
    border: 0;
    border-radius: 4px;
    font-size: 16px;
    transition: background 0.2s;
    height: 35px;
    padding: 0 25px;

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

export const PlanTable = styled.table`
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

      a {
        background: none;
        border: 0;
        font-size: 14px;
        padding: 6px;
        color: #4d85ee;
      }
    }
  }
`;

export const ButtonDelete = styled.button`
  background: none;
  border: 0;
  padding: 6px;
  color: #de3b3b;
  font-size: 14px;
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
