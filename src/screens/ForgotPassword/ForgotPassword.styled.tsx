import styled from 'styled-components'

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  background: #fff;
  padding: 2rem 0;
  @media (min-width: 600px) {
    padding: 2rem 3rem;
  }
`
export const RegistrationCard = styled.section`
  border-radius: 16px;
  width: 100%;
  box-shadow: 0 6px 12px #cad4e4;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  min-height: 80vh;
  padding: 40px 12px;
  max-width: 670px;
  > form {
    width: 100%;
  }
  @media (min-width:0px) and (max-width:991px)  {
    padding: 40px 20px;
    width: 90%;
    min-height: 45vh;
  }
`

export const FormLabelContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
`
export const RenderBeforeContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
`

export const SectionTitle = styled.h3`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  color: #101e8e;
  font-size: 25px;
  font-weight: 700;
  margin-top: 33px;
  height: 47px;
  letter-spacing: 0;
  opacity: 0.6;
  margin-bottom: 0;
`

export const SectionMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  color: #101e8e;
  font-size: 14px;
  font-weight: 500;
  height: 47px;
  letter-spacing: 0;
  opacity: 0.6;
  margin-bottom: 0;
`
