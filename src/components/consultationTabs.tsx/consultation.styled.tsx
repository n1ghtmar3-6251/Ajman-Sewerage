import styled from "styled-components";

export const CardsContainer = styled.div`
  width: 90%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media (max-width: 991px) {
    width: 100%;
 }

`;

export const MainCardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  color: #101e8e;
  align-items: center;
  gap: 1.5rem;
  justify-content: space-between;
  width: 100%;
  section {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    width: 100%;
  }
`;

export const ButtonSecondary = styled.button`
  background-color: #101e8e;
  text-transform: uppercase;
  width: 100%;
  padding: 10px 45px;
  color: #fff;
  outline: none;
  border: none;
  text-size: 16px;
  font-family: "Segoe UI";
  font-style: normal;
  font-weight: 700;
  display: flex;
  height: 3rem;
  align-items: center;
  justify-content: center;
  z-index: 0;
  &:hover {
    opacity: 0.8;
  }
  &:focus {
    border: none;
  }

  @media screen and (min-width: 991px) {
    padding: 0px;
    width: 80%;
  }


`;

export const BottomContainer = styled.div`
  width: 100%;
  background: #eee;
  padding-top: 20px;
`;

export const TopCards = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`;

export const MainCard = styled.div`
  background: #fff;
  border-left: 6px solid #101e8e;
  display: flex;
  align-items: flex-end;
  padding: 5px 20px;
  width: 24%;
  height: 130px;
  gap: 3rem;
  span {
    font-size: 55px;
    width: 25%;
  }
  div {
    display: flex;
    height: 100%;
    gap: 1rem;
    flex-direction: column;
    width: 75%;
    .circle{
      width: 60px;
      height: 60px;
      background: #E7F2E5;
      border-radius: 50%;
      border: 1px solid #E7F2E5;
    }
    img {
      width: 60px;
      height: 60px;
      
      padding: 11px;
      
    }
    span {
      font-size: 0.9rem;
      font-weight: 700;
      width: 30%;
    }
  }
`;
export const BottomCard = styled.div`
  display: flex;
  width: 32%;
  height: 100px;
  background: #fff;
  border-left: 6px solid #101e8e;
  justify-content: space-evenly;
  
  .circle{
    width: 60px;
    height: 60px;
    background: #E7F2E5;
    border-radius: 50%;
    border: 1px solid #E7F2E5;
    
    margin-left: 10px;
    margin-right: 10px;
    margin-top: auto;
    margin-bottom: auto;
  }
  img {
    width: 60px;
    height: 60px;
    
    padding: 11px;
    
  }
  div {
    width: 75%;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    font-size: 0.8rem;
    font-weight: 700;
    span {
      font-weight: 500;
      font-size: 60px;
    }
  }
`;

export const BaseCard = styled.div`
  flex: 1;
  margin-top: 20px;
  background: #fff;
  display: flex;
  flex-direction: column;
  gap: 1em;
  align-items: center;
  padding-bottom: 1em;
  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 92%;
    
  }
  .viewall{
    font-family: "Noto Sans";
    font-style: normal;
    font-weight: 700;
    font-size: 1rem;
    line-height: 1rem;
 
    text-align: center;
    text-transform: uppercase;

    color: #101E8E;
  }
  h3 {
    font-family: "Noto Sans";
    font-style: normal;
    font-weight: 700;
    font-size: 1.8rem;
    line-height: 3rem;
    color: #62AA51;

  }
  p {
    color: #101e8e;
  }
`;
export const Table = styled.table`
  border-collapse: collapse;
  width: 92%;
  color: #101e8e;
  background: #fff;
  &:nth-child(3) {
    align: left;
  }
`;

export const Td = styled.td`
  border-bottom: 1px solid #ddd;
  padding: 8px;
  width: 50%;
  font-size: calc(1rem - 0.3rem);
`;

export const Th = styled.th`
  padding: 4px;
  width: auto;
  text-align: left;
  background-color: #f6fafb;
  color: #101e8e;
  font-size: 12px;
  font-family: 'Segoe UI';
  line-height: 16px;
  /* identical to box height, or 114% */


  /* primory */

  
`;

export const Tr = styled.tr`
  height: 3rem;
  &:hover {
    background-color: #ddd;
  }
`;
