//Handle Device Scale
import {Dimensions, PixelRatio} from 'react-native';
const {width, height} = Dimensions.get('window');
const widthBaseScale = width / 411;
const heightBaseScale = height / 731;
function normalize(size, based = 'width') {
  const newSize =
    based === 'height' ? size * heightBaseScale : size * widthBaseScale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
}
//for width  pixel
const widthPixel = size => {
  return normalize(size, 'width');
};
//for height  pixel
const heightPixel = size => {
  return normalize(size, 'height');
};
//for font  pixel
const fontPixel = size => {
  return heightPixel(size);
};
//for Margin and Padding vertical pixel
const pixelSizeVertical = size => {
  return heightPixel(size);
};
//for Margin and Padding horizontal pixel
const pixelSizeHorizontal = size => {
  return widthPixel(size);
};
export const PIXEL = {
  widthPixel,
  heightPixel,
  fontPixel,
  pixelSizeVertical,
  pixelSizeHorizontal,
};

//Colors
export const COLORS = {
  // base colors
  primary: '#68BD45', // green
  primaryLighter1: '#BDF6A6',
  primaryLighter2: '#EEFCE8',
  primaryDarker1: '#417D28',
  // colors
  black: '#1E1F20',
  white: '#FFFFFF',

  lightGray0: '#C1C1C1',
  lightGray1: '#8A8181',

  transparent: 'transparent',
  darkgray: '#898C95',

  backGroundColor: '#F5F5F5',
};

//Sizes
export const SIZES = {
  // global sizes
  radius: 40,
  paddingHorizontal5: PIXEL.pixelSizeHorizontal(5),
  paddingHorizontal10: PIXEL.pixelSizeHorizontal(10),
  paddingHorizontal20: PIXEL.pixelSizeHorizontal(20),
  marginHorizontal5: PIXEL.pixelSizeHorizontal(5),
  marginHorizontal10: PIXEL.pixelSizeHorizontal(10),
  marginHorizontal20: PIXEL.pixelSizeHorizontal(20),

  paddingVertical5: PIXEL.pixelSizeVertical(5),
  paddingVertical10: PIXEL.pixelSizeVertical(10),
  paddingVertical20: PIXEL.pixelSizeVertical(20),
  marginVertical5: PIXEL.pixelSizeVertical(5),
  marginVertical10: PIXEL.pixelSizeVertical(10),
  marginVertical20: PIXEL.pixelSizeVertical(20),

  // font sizes
  title: PIXEL.fontPixel(24),
  h1: PIXEL.fontPixel(18),
  h2: PIXEL.fontPixel(14),
  h3: PIXEL.fontPixel(12),

  // app dimensions
  width,
  height,
};

//Fonts
export const FONTS = {
  title: {
    fontFamily: 'Roboto-Bold',
    fontSize: SIZES.title,
    lineHeight: PIXEL.pixelSizeVertical(30),
  },
  h1: {
    fontFamily: 'Roboto-Regular',
    fontSize: SIZES.h1,
    lineHeight: PIXEL.pixelSizeVertical(20),
  },
  h2: {
    fontFamily: 'Roboto-Regular',
    fontSize: SIZES.h2,
    lineHeight: PIXEL.pixelSizeVertical(16),
  },
  h3: {
    fontFamily: 'Roboto-Regular',
    fontSize: SIZES.h3,
    lineHeight: PIXEL.pixelSizeVertical(14),
  },
  h1Bold: {
    fontFamily: 'Roboto-Black',
    fontSize: SIZES.h1,
    lineHeight: PIXEL.pixelSizeVertical(20),
  },
  h2Bold: {
    fontFamily: 'Roboto-Black',
    fontSize: SIZES.h2,
    lineHeight: PIXEL.pixelSizeVertical(16),
  },
  h3Bold: {
    fontFamily: 'Roboto-Black',
    fontSize: SIZES.h3,
    lineHeight: PIXEL.pixelSizeVertical(14),
  },
};

const appTheme = {COLORS, SIZES, FONTS, PIXEL};

export default appTheme;
