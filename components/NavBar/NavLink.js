import Link from "next/link";
import styled, { css } from 'styled-components';
import StyledLink from '../styled/StyledLink'

const activeStyles = css`
  color: white;
  background-color: ${props => props.theme.colors.primary.main};
`
export const StyledNavLink = styled(StyledLink)`
  color: ${props => props.theme.colors.dark};
  display: block;
  font-weight: 600;
  font-size: 1rem;
  padding: 8px 12px;
  text-transform: uppercase;
  transition: all 0.5s ease 0s;
  ${props => props.active ? activeStyles : ''}
  :hover {
    ${activeStyles}
  }
  :focus {
    ${activeStyles}
  }
  :active {
    ${activeStyles}
  }
`

export default ({label="", href="", active = false}) => (
  <Link href={href} passHref>
    <StyledNavLink active={active}>{label}</StyledNavLink>
  </Link>
)

// export StyledNavLink
