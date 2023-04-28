import styled from "styled-components";
import bg from "../../assets/login-bg.png";

export const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: url(${bg});
  background-repeat: no-repeat;
  background-size: cover;
  min-height: 120vh;
`;

export const LoginCard = styled.div`
  background: #fff;
  color: #101e8e;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 2rem 3rem;
`;

export const ButtonSecondary = styled.button`
  background-color: #fff;
  border: 1px solid #101e8e;
  text-transform: uppercase;
  width: 100%;
  padding: 10px 45px;
  color: #101e8e;
  text-size: 16px;
  font-family: "Segoe UI";
  font-style: normal;
  font-weight: 700;
  display: flex;
  height: 3rem;
  align-items: center;
  justify-content: center;
  &:hover {
    opacity: 0.8;
  }
`;

export const LoginInput = styled.input`
  outline: none;
  background: #eee;
  border: 1px solid #efefef;
  width: 100%;
  color: #101e8e;
  padding: 1rem;
  border: 1px solid #b6bfdc;
`;

export const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .beYpBJ {
    justify-content: center;
    width: 100% !important;
  }
`;
