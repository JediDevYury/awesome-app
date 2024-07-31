import { Colors } from '@/shared/tokens';
import { ActivityIndicator, View, StyleSheet } from 'react-native';

type LoaderProps = {
  loading: boolean;
};

export const Loader = ({ loading }: LoaderProps) => {
  if (!loading) return null;

  return (
    <View style={styles.loadingOverlay}>
      <ActivityIndicator size="large" color={Colors.white} />
    </View>
  );
};

const styles = StyleSheet.create({
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.black,
    opacity: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
