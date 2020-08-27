import styled from 'styled-components';
import { MdLocalCafe, MdLocalDining } from 'react-icons/md';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background: rgba(9, 8, 8, 0.25);
  border-radius: 0.8rem;
  padding: 2rem 0.4rem;
  margin: 2rem 2.5rem;
  /* max-width: 1300px; */
`;
export const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem 0.4rem;

  @media (min-width: 700px) {
    display: grid;
    column-gap: 10rem;

    grid-template-columns: 1fr 1fr;

    padding: 3rem 4rem;
  }
`;

export const Title = styled.h3`
  font-weight: 300;
  font-size: 2.7rem;
  line-height: 2rem;

  text-align: center;
  color: #ffffff;
`;
export const HeaderContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.4rem;
  > header {
    display: flex;
    align-items: center;
  }
  @media (min-width: 700px) {
    /* padding-right: 7rem; */
  }
`;
export const ItemIcon = styled(MdLocalCafe)`
  fill: #fff;
  width: 1.9rem;
  height: 1.9rem;
  flex-shrink: 0;
`;
export const ItemTitle = styled.h4`
  font-size: 1.8rem;
  line-height: 1.9rem;
  padding-left: 0.7rem;

  text-align: center;

  color: #ffffff;
`;
export const ItemPrice = styled.h4`
  font-size: 1.9rem;
  line-height: 1.9rem;

  color: #ffffff;
`;
export const Description = styled.p`
  font-size: 1.4rem;
  line-height: 1.4rem;
  max-width: 60%;
  color: #ffffff;
`;
export const ItemInformation = styled.article`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 1.4rem 2rem;
  margin-bottom: 1rem;

  @media (min-width: 700px) {
    padding: 1.8rem 2.5rem;
  }
`;
