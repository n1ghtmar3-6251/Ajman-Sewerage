import styled from "styled-components";

export const MoveInHeader = styled.header`
  background: #101e8e;
  color: #fff;
  width: 100%;
  height: 20em;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const MiniNav = styled.nav`
  color: white;
  display: flex;
  margin: auto;
  gap: 8px;
  width: 100%;
`;

export const ComplaintContainer = styled.div`
  width: 80%;
  margin: 0 auto;
  padding-top: 60px;
  padding-right: 60px;
  padding-left: 60px;
  background: #fff;
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  place-items: center;
  gap: 1rem;
  * {
    color: #101e8e;
  }

  @media (max-width: 991px) {
    display: block !important;
    width: 100% !important;
    padding: 30px 19px 2rem !important;
 }

`;


export const Table = styled.table`
  width: 100%;
  thead {
    width: 100%;
    background: rgba(229, 239, 242, 0.7);
    tr {
      background: rgba(229, 239, 242, 0.7);
      th:first-child {
        padding: 1rem;
        text-align: left;
      }
      th:last-child {
        padding: 1rem;
        text-align: right;
      }
    }
  }
  tbody {
    width: 100%;
    tr {
      td {
        border-bottom: 1px solid #cfd2e8;
        font-size: 0.9rem;
        &:first-child {
          padding: 0.7rem;
          text-align: left;
        }
        &:nth-child(2) {
          text-align: center;
        }
        &:last-child {
          padding: 1rem;
          text-align: right;
        }
      }
      &:last-child {
        border-top: 1px solid #cfd2e8;
        background: rgba(229, 239, 242, 0.7);
        td {
          font-weight: bolder;
          font-size: 1rem;
        }
      }
    }
  }
`;
