import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  background: #fff;
  padding: 0 60px;
`;

export const Content = styled.div`
  height: 70px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  nav {
    display: flex;
    align-items: center;

    img {
      margin-right: 15px;
      padding-right: 20px;
      border-right: 1px solid #d4d4d4;
    }

    a {
      font-weight: bold;
      font-size: 15px;
      color: #999;
      padding: 0 8px;
    }
  }

  div {
    display: flex;
    flex-direction: column;
    text-align: right;

    span {
      font-weight: bold;
      font-size: 16px;
      color: #666;
    }

    a {
      font-size: 14px;
      color: #de3b3b;
      cursor: pointer;

      &:hover {
        color: ${darken(0.08, '#de3b3b')};
      }
    }
  }
`;
