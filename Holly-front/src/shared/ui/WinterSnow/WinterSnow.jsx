import Snowfall from 'react-snowfall';

export const WinterSnow = () => {
  if (new Date().getMonth() === 11 || new Date().getMonth() === 0 || new Date().getMonth() === 1) {
    return <Snowfall />;
  } else {
    return null;
  }
};
