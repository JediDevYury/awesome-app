import React from 'react';
import { Image, StyleSheet } from 'react-native';

type QRCodeScreenProps = {
  uri?: string;
  width?: number;
  height?: number;
};

export default function QRCodeScreen({ uri, width, height }: QRCodeScreenProps) {
  return (
    <Image
      source={{
        uri,
      }}
      style={[
        styles.qrCode,
        {
          width,
          height,
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  qrCode: {
    width: 250,
    height: 250,
  },
});
