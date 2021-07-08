import Link from "next/link";
import styled from 'styled-components';
import StyledLink from '../styled/StyledLink'


const StyledHeaderLink = styled(StyledLink)`
  color: #fff;
  font-style: normal;
  font-weight: bold;
  line-height: normal;
  font-size: 12px;
  padding: 0px 6px;
`


export default ({text="", href=""}) => (
  <Link href={href} passHref>
    <StyledHeaderLink>{text}</StyledHeaderLink>
  </Link>
)
