import styled from "styled-components";

export const ButtonsContainer = styled.div`
  display: flex;
  width: 40%;
  align-items: center;
  justify-content: space-between;
`;

export const InfoContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  place-items: right;
  gap: 1rem;
  label {
    width: 100%;
    input {
      background: #fff;
      padding-left: 10px;
    }
    select {
      background: #e5eff2;
      width: 100%;
      padding-left: 10px;
      &:focus{
        outline: none;
      }
    }
  }
`;