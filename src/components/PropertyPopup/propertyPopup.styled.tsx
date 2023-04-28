import styled from "styled-components";

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  height: 80%;
  width: 80%;
`;

export const CardHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #101e8e;
  color: #fff;
  height: 20%;
  width: 100%;
  svg {
    color: #fff !important;
    path {
      color: #fff !important;
    }
  }
`;

export const CardSpacer = styled.div`
  width: 100%;
  background: #edf4f6;
  display: flex;
  align-items: flex-start;
  justify-content: space-evenly;
  color: #101e8e;
  height: 125px;
  div {
    width: max-content;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    p {
      font-weight: 700;
    }
  }
`;

export const PopupCenterSection = styled.section`
  height: 97px;
  width: 100%;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-left: 1rem;
  justify-content: space-evenly;
  background: #edf4f6;
  p {
    font-weight: 700;
  }
`;

export const Input = styled.input`
  padding: 0.2rem;
  background: #fff;
  border: 1px solid #b6bfdc;
  outline: none;
  width: 50%;
`;

export const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  p {
    font-size: 2.3rem;
    font-weight: 700;
  }
`;
