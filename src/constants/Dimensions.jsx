import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const baseWidth = 375;  
const baseHeight = 812; 

const scale = (size) => (width / baseWidth) * size;
const verticalScale = (size) => (height / baseHeight) * size;

export const iconSize = {
  sm: scale(10),
  md: scale(20),
  lg: scale(24),
  xl: scale(32),
};

export const spacing = {
  xs: scale(4),
  sm: scale(8),
  md: scale(13),
  lg: scale(20),
  xl: scale(32),
};

export const fontSize = {
  sm: scale(12),
  md: scale(14),
  lg: scale(16),
  xl: scale(20),
};

// Drawer width adjustment
export const drawerWidth = width * 0.70; 