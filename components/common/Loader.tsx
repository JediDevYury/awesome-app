import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

type LoaderProps = {
  loading: boolean;
};

export const Loader = ({ loading }: LoaderProps) => {
  const { styles, theme } = useStyles(stylesheet);
  if (!loading) return null;

  return (
    <View style={styles.loadingOverlay}>
      <ActivityIndicator size="large" color={theme.colors.accent} />
    </View>
  );
};

const stylesheet = createStyleSheet((theme) => ({
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: theme.colors.background,
    opacity: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
}));
