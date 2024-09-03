import { TransactionsList } from './components/TransactionsList';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View, Alert, TouchableOpacity } from 'react-native';
import { createStyleSheet, useStyles, UnistylesRuntime } from 'react-native-unistyles';

export default function Home() {
  const { styles } = useStyles(stylesheet);

  return (
    <View style={styles.container}>
      <TransactionsList />
      <TouchableOpacity
        style={styles.fab}
        activeOpacity={0.7}
        onPress={() => {
          Alert.alert('FAB button pressed');
        }}
      >
        <Ionicons name="add" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  container: {
    flex: 1,
    paddingLeft: UnistylesRuntime.insets.left,
    paddingRight: UnistylesRuntime.insets.right,
    backgroundColor: theme.colors.background,
  },
  text: {
    color: theme.colors.typography,
  },
  fab: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: theme.radius.l,
    backgroundColor: theme.colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
    right: 20,
    bottom: 20,
    elevation: 8,
    shadowColor: theme.colors.accent,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
}));
