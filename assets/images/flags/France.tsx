import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

export const France = (props: SvgProps) => (
  <Svg viewBox="0 0 3 2" {...props}>
    <Path fill="#EC1920" d="M0 0h3v2H0z" />
    <Path fill="#fff" d="M0 0h2v2H0z" />
    <Path fill="#051440" d="M0 0h1v2H0z" />
  </Svg>
);
