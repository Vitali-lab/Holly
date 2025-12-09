import styled from 'styled-components';

const IconContainer = ({ className, id, onClick, num }) => (
  <div className={className} onClick={onClick} num={num}>
    <i className={`fa fa-${id}`}></i>
  </div>
);

export const Icon = styled(IconContainer)`
font-size: ${({ size = '25' }) => size}px;
margin: ${({ margin = '0' }) => margin};
color: ${({ color = 'var(--black-color)', disabled }) => (disabled ? 'var(--grey-color)' : color)}};
background-color: ${({ backgroundColor = 'transparent' }) => backgroundColor};
text-align: center;
transition: color 0.2s ease-in-out;
 & i{
   cursor: ${({ cursor = 'pointer' }) => cursor};
 }
 
`;
