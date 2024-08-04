import { Platform } from 'react-native';
import { Typography, Colors } from 'react-native-ui-lib';

Colors.loadColors({
  primary: 'rgb(214, 31, 38)',
  primaryHover: 'rgb(171, 24, 30)',
  primaryActive: 'rgb(128, 17, 23)',
  white: 'rgb(255, 255, 255)',
  black: 'rgb(0, 0, 0)',
  disabled: 'rgb(219, 219, 219)',
  neutral: 'rgb(178, 178, 178)',
});

Typography.loadTypographies({
  regular: { fontSize: 14, fontFamily: 'FiraSans-Regular' },
  bold: { fontSize: 14, fontFamily: 'FiraSans-Bold' },
  small: { fontSize: 12, fontFamily: 'FiraSans-Regular' },
  button: {
    color: Colors.white,
    fontSize: 16,
    fontFamily: 'FiraSans-Bold',
    textAlignVertical: 'center',
    textAlign: 'center',
    marginBottom: Platform.select({
      ios: 0,
      android: 2,
    }),
  },
  h3: { fontSize: 24, fontFamily: 'FiraSans-Bold' },
  link: {
    fontSize: 12,
    fontFamily: 'FiraSans-SemiBold',
    color: Colors.grey50,
    textDecorationLine: 'underline',
  },
});
