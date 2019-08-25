import React from 'react';
import styled, { css, keyframes } from 'styled-components';

import GlobalStyle from '../util/GlobalStyle';
import Who from '../components/Who';
import What from '../components/What';

const Wrapper = styled.div`

`;

const Home = () => (
  <Wrapper>
    <GlobalStyle />
    <What />
    <Who />
  </Wrapper>
);

export default Home;
