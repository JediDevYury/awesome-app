import {
  Colors as UIColors,
  Typography as UITypography,
  BorderRadiuses as UIRadius,
  Spacings as UISpacings,
} from 'react-native-ui-lib';

type BorderRadiusesTypes = UIRadius & {
  small: number;
  medium: number;
  large: number;
};

type ColorsTypes = UIColors & {
  primary: string;
  primaryHover: string;
  primaryActive: string;
  white: string;
  black: string;
  disabled: string;
  neutral: string;
};

type TypographyTypes = UITypography & {
  regular: {
    fontSize: number;
    fontFamily: string;
  };
  small: {
    fontSize: number;
    fontFamily: string;
  };
  bold: {
    fontSize: number;
    fontFamily: string;
  };
  link: {
    fontSize: number;
    fontFamily: string;
    color: string;
    textDecorationLine: string;
  };
  button: {
    fontSize: number;
    fontFamily: string;
    textAlignVertical: string;
    textAlign: string;
    marginBottom: number;
    color: string;
  };
  h3: {
    fontSize: number;
    fontFamily: string;
  };
};

type SpacingsTypes = UISpacings & {
  small: number;
  medium: number;
  large: number;
};

declare module 'react-native-ui-lib' {
  export const Colors: ColorsTypes;
  export const BorderRadiuses: BorderRadiusesTypes;
  export const Typography: TypographyTypes;
  export const Spacings: SpacingsTypes;
}
