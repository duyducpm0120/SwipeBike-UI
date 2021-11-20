//Handle Device Scale
import {Dimensions, PixelRatio, StyleSheet} from 'react-native';
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
export const RESPONSIVE = {
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
  darkgray: '#898C95',

  transparent: 'transparent',

  // backGroundColor: '#F5F5F5',
  backGroundColor: '#F5F5F5',
};

//Sizes
export const SIZES = {
  // global sizes
  radius: 40,
  paddingHorizontal5: RESPONSIVE.pixelSizeHorizontal(5),
  paddingHorizontal10: RESPONSIVE.pixelSizeHorizontal(10),
  paddingHorizontal20: RESPONSIVE.pixelSizeHorizontal(20),
  marginHorizontal5: RESPONSIVE.pixelSizeHorizontal(5),
  marginHorizontal10: RESPONSIVE.pixelSizeHorizontal(10),
  marginHorizontal20: RESPONSIVE.pixelSizeHorizontal(20),

  paddingVertical5: RESPONSIVE.pixelSizeVertical(5),
  paddingVertical10: RESPONSIVE.pixelSizeVertical(10),
  paddingVertical20: RESPONSIVE.pixelSizeVertical(20),
  marginVertical5: RESPONSIVE.pixelSizeVertical(5),
  marginVertical10: RESPONSIVE.pixelSizeVertical(10),
  marginVertical20: RESPONSIVE.pixelSizeVertical(20),

  // font sizes
  title: RESPONSIVE.fontPixel(28),
  h1: RESPONSIVE.fontPixel(24),
  h2: RESPONSIVE.fontPixel(20),
  h3: RESPONSIVE.fontPixel(16),
  h4: RESPONSIVE.fontPixel(12),

  // app dimensions
  width,
  height,
};

//Fonts
export const FONTS = {
  title: {
    fontFamily: 'Roboto-Bold',
    fontSize: SIZES.title,
    color: COLORS.black,
    //lineHeight: RESPONSIVE.pixelSizeVertical(30),
  },
  h1: {
    fontFamily: 'Roboto-Regular',
    fontSize: SIZES.h1,
    color: COLORS.black,
    //lineHeight: RESPONSIVE.pixelSizeVertical(20),
  },
  h2: {
    fontFamily: 'Roboto-Regular',
    fontSize: SIZES.h2,
    color: COLORS.black,
    // lineHeight: RESPONSIVE.pixelSizeVertical(16),
  },
  h3: {
    fontFamily: 'Roboto-Regular',
    fontSize: SIZES.h3,
    color: COLORS.black,
    // lineHeight: RESPONSIVE.pixelSizeVertical(14),
  },
  h4: {
    fontFamily: 'Roboto-Regular',
    fontSize: SIZES.h4,
    color: COLORS.black,
    // lineHeight: RESPONSIVE.pixelSizeVertical(14),
  },
  h1Bold: {
    fontFamily: 'Roboto-Black',
    fontSize: SIZES.h1,
    color: COLORS.black,
    //lineHeight: RESPONSIVE.pixelSizeVertical(20),
  },
  h2Bold: {
    fontFamily: 'Roboto-Black',
    fontSize: SIZES.h2,
    color: COLORS.black,
    // lineHeight: RESPONSIVE.pixelSizeVertical(16),
  },
  h3Bold: {
    fontFamily: 'Roboto-Black',
    fontSize: SIZES.h3,
    color: COLORS.black,
    //lineHeight: RESPONSIVE.pixelSizeVertical(14),
  },
  h4Bold: {
    fontFamily: 'Roboto-Black',
    fontSize: SIZES.h4,
    color: COLORS.black,
    //lineHeight: RESPONSIVE.pixelSizeVertical(14),
  },
};

export const STYLES = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    //backgroundColor: COLORS.backGroundColor,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  scrollContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    //backgroundColor: COLORS.backGroundColor,
    paddingTop: RESPONSIVE.pixelSizeVertical(20),
    paddingHorizontal: RESPONSIVE.pixelSizeHorizontal(20),
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
});

const appTheme = {COLORS, SIZES, FONTS, RESPONSIVE, STYLES};

export default appTheme;
