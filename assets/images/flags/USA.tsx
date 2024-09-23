import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

export const USA = (props: SvgProps) => (
  <Svg viewBox="0 0 3 2" {...props}>
    <Path fill="#b22234" d="M0 0h3v2H0z" />
    <Path
      fill="#fff"
      d="M0 .154h3v.154H0zM0 .462h3v.154H0zM0 .77h3v.154H0zM0 1.078h3v.154H0zM0 1.386h3v.154H0zM0 1.694h3v.154H0z"
    />
    <Path fill="#3c3b6e" d="M0 0h1.2v.77H0z" />
  </Svg>
);
