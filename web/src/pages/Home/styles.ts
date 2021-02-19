import styled from 'styled-components';

import { shade } from 'polished';
import background from '../../assets/background.svg';

export const Container = styled.div`
  flex-direction: column;
  display: flex;
  align-items: center;

  width: 100vw;
  min-height: 100vh;
  padding-bottom: 8vh;

  background-image: url(${background});
  background-position: 30% 45%;
  background-size: cover;

  > main {
    max-width: 1200px;

    @media (min-width: 700px) {
      display: grid;
      column-gap: 4rem;

      grid-template-columns: 1fr 1fr;

      padding: 3rem 4rem;
    }
  }
  > nav {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 7rem;

    padding-top: 0.8rem;
    @media (max-width: 700px) {
      position: relative;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
    }
  }

  > h1 {
    font-family: Parisienne, sans-serif;
    font-size: 4rem;
    line-height: 5.4rem;
    text-align: center;
    color: #fff;
    padding: 0.6rem 0;
    @media (min-width: 1000px) {
      font-size: 6rem;
      line-height: 7.4rem;
    }
  }
  > h3 {
    font-size: 1.8rem;
    line-height: 2.1rem;
    text-align: center;
    color: #fff;
  }

  > footer {
    display: flex;
    z-index: 2;
    align-items: center;
    justify-content: center;
    height: 8vh;
    position: fixed;
    bottom: 0;
    right: 0;
    left: 0;
    background: rgba(9, 8, 8, 0.5);
    border-radius: 0.2rem;
    > p {
      font-size: 1.6rem;
      line-height: 2.8rem;
      text-align: center;
      align-self: center;

      color: #797979;
    }
  }
`;
export const CategoryList = styled.section`
  display: flex;
  align-items: center;
  margin: 1rem 8rem;
  min-height: 8rem;
  overflow-x: auto;

  ::-webkit-scrollbar {
    display: none;
  }
  @media (max-width: 700px) {
    margin: 0 5.4rem 0.5rem 5.4rem;
    max-width: 30rem;
    position: fixed;
    /* top: 0;
  bottom: 0; */
    /* left: 0;
    right: 0; */

    transition: 0.2s transform cubic-bezier(0.2, 0, 0, 1);
    &.fixed {
      transform: translateY(-9rem);
    }
  }
`;

export const CategoryItemButton = styled.a`
  width: 9.1rem;
  display: flex;
  height: 4.3rem;
  min-width: 9rem;
  background: ${props => (props.color ? props.color : 'darkred')};
  border-radius: 0.8rem;
  justify-content: center;
  align-items: center;
  border: none;
  cursor: pointer;
  text-decoration: none;
  transition: background-color 0.2s;
  &:hover {
    background: ${props =>
      props.color ? shade(0.25, props.color) : shade(0.25, 'darkred')};
  }
  @media (max-width: 700px) {
    opacity: 0.9;
  }

  margin: 0 0.5rem;

  > h4 {
    font-size: 1.3rem;
    line-height: 1.1rem;

    text-align: center;

    color: #ffffff;
  }
`;
