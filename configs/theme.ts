export const theme = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  superLarge: 2000,
  tvLike: 4000,
} as const;

export const typography = {
  variant: {
    regular: 'FiraSans-Regular',
    semiBold: 'FiraSans-SemiBold',
    bold: 'FiraSans-Bold',
  },
  size: {
    s: 12,
    m: 14,
    l: 16,
    xl: 20,
    xxl: 24,
  },
} as const;

export const colors = {
  typography: 'rgb(0, 0, 0)',
  background: 'rgb(251, 251, 251)',
  accent: 'rgb(214, 31, 38)',
  hover: 'rgb(171, 24, 30)',
  active: 'rgb(128, 17, 23)',
  disabled: 'rgb(219, 219, 219)',
  white: 'rgb(255, 255, 255)',
  black: 'rgb(0, 0, 0)',
  gray: 'rgb(128, 128, 128)',
  green: 'rgb(0, 128, 0)',
  blur: 'rgba(0, 0, 0, 0.5)',
  borderTopColor: '#00000010',
} as const;

export const radius = {
  s: 5,
  m: 10,
  l: 20,
} as const;

export const spacing = {
  xs: 4,
  s: 8,
  m: 16,
  l: 24,
  xl: 40,
} as const;

export const defaultStyles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.s,
    backgroundColor: colors.background,
  },
  link: {
    fontSize: typography.size.m,
    fontFamily: typography.variant.regular,
    color: colors.gray,
    textDecorationLine: 'underline',
  },
  text: {
    fontSize: typography.size.m,
    fontFamily: typography.variant.regular,
    color: colors.typography,
  },
  skeleton: {
    colorMode: 'light',
    transition: {
      type: 'timing',
      duration: 2000,
    },
  },
} as const;

export const hiqoTheme = {
  colors,
  spacing,
  typography,
  radius,
  defaultStyles,
} as const;

export const lightTheme = {
  colors: {
    ...colors,
    typography: colors.black,
    background: colors.white,
  },
  spacing,
  typography,
  radius,
  defaultStyles,
} as const;

export const darkTheme = {
  colors: {
    ...colors,
    typography: colors.white,
    background: colors.black,
  },
  spacing,
  typography,
  radius,
  defaultStyles,
} as const;
