import React from 'react';
import styled, { css, keyframes } from 'styled-components';

import GlobalStyle from '../util/GlobalStyle';
import Who from '../components/Who';
import What from '../components/What';
import How from '../components/How';

const Wrapper = styled.div`

`;

const Home = () => (
  <Wrapper>
    <GlobalStyle />
    <How />
    <What />
    <Who />
  </Wrapper>
);

export default Home;
