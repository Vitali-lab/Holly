import styled from 'styled-components';
import Snowfall from 'react-snowfall';

const WinterSnowContainer = ({ className }) => {
  if (new Date().getMonth() === 11 || new Date().getMonth() === 0 || new Date().getMonth() === 1) {
    return (
      <div className={className}>
        <Snowfall color="#87c1f7ff" count={100} />
      </div>
    );
  } else {
    return null;
  }
};

export const WinterSnow = styled(WinterSnowContainer)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
`;
