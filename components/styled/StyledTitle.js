import styled from 'styled-components';

const StyledTitle = styled.h2`
  color: ${props => props.theme.colors.primary.main};
  font-family: ${props => props.theme.fontFamily.secondary};
  font-weight: bold;
  ${'' /* line-height: 35px; */}
  font-size: 35px;
  text-align: center;
  ::after {
    border: 2px solid ${props => props.theme.colors.secondary.main};
    bottom: 0;
    content: "";
    left: 0;
    margin: auto;
    position: absolute;
    right: 0;
    width: 55px;
  }
`
export default StyledTitle;
