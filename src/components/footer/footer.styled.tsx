import styled from "styled-components";

export const FooterContainer = styled.div`
  display: flex;
  align-items: start;
  justify-content: space-between;
  width: 100%;
  @media (max-width: 768px) {
    flex-direction: column;
    width: 50%;
  }
`;
export const Disclaimer = styled.section`
  color: white;
  @media (max-width: 768px) {
    margin: 0 auto;
    text-align: center;
  }
`;
export const RequestsAndInfo = styled.section`
  color: white;
  @media (max-width: 768px) {
    margin: 0 auto;
    text-align: center;
  }
`;
export const Socials = styled.section`
  color: white;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.2rem;
  @media (max-width: 768px) {
    margin: 0 auto;
    text-align: center;
  }
`;
export const FaqSection = styled.section`
  color: white;
  @media (max-width: 768px) {
    margin: 0 auto;
    text-align: center;
  }
`;
export const MobileApp = styled.section`
  color: white;
  @media (max-width: 768px) {
    text-align: center;
  }
`;
export const Marginer = styled.span`
  background: gray;
  width: 100%;
  height: 2px;
`;
export const SvgsContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: space-between;
  svg{
    color: #fff;
  }
`;

export const Platforms = styled.div`
  color: white;
  border-radius: 10px;
  display: flex;
  align-items: center;
  max-width: 8rem;
  height: 3rem;
  img {
    width: 100%;
    height: 100%;
  }
`;
export const PlatformContainer = styled.div`
  display: flex;
  gap: 10px;
  @media (width<=768px) {
    justify-self: flex-start;
  }
`;
