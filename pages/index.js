import React from 'react';
import styled, { css, keyframes } from 'styled-components';

import GlobalStyle from '../util/GlobalStyle';
import Who from '../components/Who';

const Wrapper = styled.div`

`;

const Home = () => (
  <Wrapper>
    <GlobalStyle />
    <h1>ETHBerlin 2019</h1>
    <Who />
  </Wrapper>
);

export default Home;
