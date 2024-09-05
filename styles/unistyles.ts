import { theme, darkTheme, hiqoTheme, lightTheme } from '@/configs/theme';
import { UnistylesRegistry } from 'react-native-unistyles';

UnistylesRegistry.addBreakpoints(theme)
  .addThemes({
    light: lightTheme,
    dark: darkTheme,
    hiqo: hiqoTheme,
    // register other themes with unique names
  })
  .addConfig({
    // you can pass here optional config described below
    adaptiveThemes: true,
    initialTheme: 'hiqo',
  });

type AppBreakpoints = typeof theme;

// if you defined themes
type AppThemes = {
  light: typeof lightTheme;
  dark: typeof darkTheme;
  hiqo: typeof hiqoTheme;
};

// override library types
declare module 'react-native-unistyles' {
  export interface UnistylesBreakpoints extends AppBreakpoints {}
  export interface UnistylesThemes extends AppThemes {}
}
