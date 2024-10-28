import { Image as ExpoImage } from 'expo-image';
import { useWindowDimensions } from 'react-native';

type ImageProps = {
  size?: number;
  imageUri?: string;
};

export function Image({ size, imageUri }: ImageProps) {
  const { width } = useWindowDimensions();

  const imageSize = size ?? Math.min(width / 1.5, 400);

  return (
    <ExpoImage
      source={imageUri ? { uri: imageUri } : require('@/assets/images/adaptive-icon.png')}
      style={{ width: imageSize, height: imageSize, borderRadius: 6 }}
    />
  );
}
