import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 50px;
`;

export const Repository = styled.div`
  width: 250px;
  background: #fff;
  border-radius: 3px;
  margin: 0 10px;

  display: flex;
  flex-direction: column;

  header {
    padding: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  img {
    width: 64px;
  }

  strong {
    font-size: 24px;
  }

  small {
    padding: 10px;
    font-size: 14px;
    color: #666;
  }

  ul {
    list-style: none;

    li {
      font-weight: bold;
      padding: 12px 20px;

      small {
        font-weight: normal;
        font-size: 12px;
        color: #999;
        font-style: italic;
      }

      &:nth-child(2n-1) {
        background: #f5f5f5;
      }
    }
  }

  div {
    display: flex;
    flex-direction: row;
    justify-content: center;
    button {
      height: 25px;
      padding: 0 10px;
      margin: 10px;
      background: #63f5b0;
      color: #000;
      border: 0;
      font-size: 14px;
      font-weight: normal;
      border-radius: 5px;

      &:hover {
        background: #52d89f;
      }
      i {
        padding-right: 5px;
      }
    }
  }
`;
