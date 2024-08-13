import { UploadIcon } from '@/assets/icons';
import { httpClient } from '@/services';
import { UploadResponse } from '@/types';
import {
  MediaTypeOptions,
  launchImageLibraryAsync,
  useMediaLibraryPermissions,
  PermissionStatus,
} from 'expo-image-picker';
import { Alert, Pressable, View, Text, StyleSheet } from 'react-native';
import { Colors, Typography, Spacings, BorderRadiuses } from 'react-native-ui-lib';

interface ImageUploaderProps {
  onUpload: (uri: string) => void;
  onError: (error: string) => void;
}

export function ImageUploader({ onUpload, onError }: ImageUploaderProps) {
  const [libraryPermissions, requestLibraryPermission] = useMediaLibraryPermissions();

  const verifyMediaPermissions = async () => {
    if (libraryPermissions?.status === PermissionStatus.UNDETERMINED) {
      const res = await requestLibraryPermission();
      return res.granted;
    }
    if (libraryPermissions?.status === PermissionStatus.DENIED) {
      Alert.alert('Insufficient permissions to access the photo.');
      return false;
    }
    return true;
  };

  const upload = async () => {
    const isPermissionGranted = await verifyMediaPermissions();
    if (!isPermissionGranted) {
      onError('Insufficient permissions');
      return;
    }
    const asset = await pickImage();
    if (!asset) {
      onError('No image selected');
      return;
    }
    const uploadedUrl = await uploadToServer(asset.uri, asset.fileName ?? '');
    if (!uploadedUrl) {
      onError('Failed to upload image');
      return;
    }
    onUpload(uploadedUrl);
  };

  const pickImage = async () => {
    const result = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });
    if (!result.assets) {
      return null;
    }
    return result.assets[0];
  };

  const uploadToServer = async (uri: string, name: string) => {
    const formData = new FormData();

    formData.append('files', new Blob([uri], { type: 'image/jpeg' }), name);

    try {
      const { data } = await httpClient.uploadFile<UploadResponse>('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return data.urls.original;
    } catch (error) {
      if (error instanceof Error) {
        console.error(error);
      }
      return null;
    }
  };

  return (
    <Pressable onPress={upload}>
      <View style={styles.container}>
        <UploadIcon />
        <Text style={styles.text}>Upload Image</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: Spacings.s8,
    backgroundColor: Colors.primary,
    borderRadius: BorderRadiuses.br10,
    paddingHorizontal: 20,
    paddingVertical: 17,
    alignItems: 'center',
  },
  text: {
    ...Typography.text70,
    color: Colors.white,
  },
});
