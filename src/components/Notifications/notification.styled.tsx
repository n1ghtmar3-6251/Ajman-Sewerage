import styled from "styled-components";

export const NotificationMainContainer = styled.main`
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin: auto;
  color: #101e8e;
`;

export const NotificationContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 0.5rem;
  align-items: center;
`;

export const Notification = styled.div`
  width: 100%;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #101e8e;
  padding: 0.2rem 2rem;
  font-weight: bold;
  p{
    font-weight: 500;
  }
`;
