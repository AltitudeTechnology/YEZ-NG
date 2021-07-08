import styled from 'styled-components';
// import {Grid, Container, Row, Col } from 'reactstrap';

import Seperator from './Seperator'
import HeaderLink from './HeaderLink'

const S_Area = styled.div`
  background-color: ${props => props.theme.colors.primary.main};
  color: #fff;
  padding: 10px 0;
`
const S_HeaderRight = styled.div`
text-transform: uppercase;
font-size: 12px;
font-weight: 700;
`

const S_container = styled.div.attrs({
  className: "container"
})`
  text-align: right;
`

export default () => (
  <S_Area>
    <S_container>
      <S_HeaderRight>
        <HeaderLink
          href="#!"
          text="Contact us"
        />
        <Seperator />
        <HeaderLink
          href="/user/create-account"
          text="Create Account"
        />
        <Seperator />
        <HeaderLink
          href="/user/login"
          text="Login"
        />
      </S_HeaderRight>
    </S_container>
  </S_Area>
);
