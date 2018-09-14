import styled from 'styled-components';

const S_Link = styled.a`
  color: #fff;
  font-style: normal;
  line-height: normal;
  font-size: 12px;
  text-decoration: none;
  :hover {
    text-decoration: none;
    color: ${props => props.theme.colors.primary.light};
  }
`
export default S_Link
