import {Dimensions} from 'react-native';

export const height = Dimensions.get('screen').height;
export const width = Dimensions.get('screen').width;

const defHeight = 754;
const defWidth = 392;

export const getWidth = (val: number) => {
  const temp = val / defWidth;
  return temp * width;
};

export const getHeight = (val: number) => {
  const temp = val / defHeight;
  return temp * height;
};
