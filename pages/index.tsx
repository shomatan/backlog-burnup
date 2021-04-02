import React from 'react';
import styled from '@emotion/styled';
import Header from '../src/components/organisms/header';
import Nav from '../src/components/organisms/nav';
import MainGrid from '../src/components/organisms/mainGrid';
import { Global, css } from '@emotion/react';

export const GlobalStyle = css`
  html,
  body,
  body > div:first-of-type,
  div#__next,
  div#__next > div {
    height: 100%;
  }
  html {
    font-size: 62.5%;
    font-family: '游ゴシック Medium', YuGothic, YuGothicM,
      'Hiragino Kaku Gothic ProN', 'Hiragino Kaku Gothic Pro', メイリオ, Meiryo,
      sans-serif;
  }
  body {
    font-size: 1.4rem;
    color: #444;
  }
`;

const App = styled.div({
  display: 'grid',
  // height: "100%",
  gridTemplateColumns: '230px 1fr',
  gridTemplateAreas: `
    "Nav Main"
    "Nav Main";
  `,
  background: '#eff4f6',
});

const Main = styled.div({
  gridArea: 'Main',
  padding: '20px 40px 20px 26px',
  overflowY: 'scroll',
});

export const Home = (): JSX.Element => {
  return (
    <>
      <Global styles={GlobalStyle} />
      <Header />
      <App>
        <Nav />
        <Main>
          <MainGrid />
          {/* <OldContainer /> */}
        </Main>
      </App>
    </>
  );
};

export default Home;
