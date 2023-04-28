import styled from "styled-components";
import { Link } from "react-router-dom";
const fontSize = localStorage.getItem('fontSize');

export const DrawerMain = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: row-reverse;
  height: 100%;
  min-width: 200px;
  padding: 1rem;
  @media (width <= 768px) {
    width: 180px;
  }
  @media (width <= 400) {
    width: 100%;
  }
`;

export const DrawerLinks = styled.div`
  color: #000;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 0.3rem;
  width: 230px;
  padding: 1rem;
  p {
    cursor: pointer;
    font-weight: 900;
  }
  .selected-link {
    color: #62aa51;
  }
`;

export const DrawerItems = styled(DrawerMain)`
  color: #101e8e;
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  align-items: flex-start;
  justify-content: flex-start;
  border-width: 3px;
  border-style: solid;
  border-image: linear-gradient(to bottom, #eee, rgba(0, 0, 0, 0)) 1 100%;
  border-left: none;
  border-top: none;
  border-bottom: none;
  transition: ease-in-out 5s;
`;

export const DrawerLink = styled(Link)`
  text-decoration: none;
  color: #101e8e;
  font-weight: 900;
  padding: 0.5rem;
  max-width: 11rem;
  line-height: 1.1rem;
  font-size: calc(${fontSize} - 0.25rem);
  padding-top: 0.7rem;
  min-width: 100%;
  &:hover {
    opacity: 0.7;
  }
`;

export const DrawerTitle = styled.h3`
  font-weight: 900;
  font-size: calc(${fontSize} + 0.2rem);
  color: #101e8e;
`;

export const DrawerServicesContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 0.7rem;
`;
export const DrawerServices = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 0.2rem;
  min-width: 250px;
`;

export const DrawerCard = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  background: #fff;
  color: #101e8e;
  padding: 1rem;
  span {
    font-weight: 700;
    font-size: calc(${fontSize} - 0.3rem);
  }
`;
