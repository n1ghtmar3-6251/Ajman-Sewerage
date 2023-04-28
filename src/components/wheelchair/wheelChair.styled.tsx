import styled from "styled-components";
const background = localStorage.getItem("color");

export const NavDiv = styled.div`
  position: absolute;
  z-index: 999999999999999999999999999999999999999999999999;
  top: 60px;
  right: 30%;
`;

export const Container = styled.div`
  width: 350px;
  height: 350px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background: ${background};
`;

export const Tab = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #fff;
`;

export const Items = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  .chosen {
    background: #101e8e;
    color: #fff;
  }
`;

export const FontChanger = styled.button`
  border: 1px solid #fff;
  padding: .5rem;
  color: #101e8e;
  background: #fff;
  width: 40px;
`;

export const ColorChanger = styled(FontChanger)`
  height: 25px;
`;
