import { TransactionsList } from './components/TransactionsList';
import { Ionicons } from '@expo/vector-icons';
//TODO: should be added when the create transaction modal is implemented '/(main)/(modals)/create-transaction'
// import { Link } from 'expo-router';
import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { createStyleSheet, useStyles, UnistylesRuntime } from 'react-native-unistyles';

export default function Transactions() {
  const { styles } = useStyles(stylesheet);

  return (
    <View style={styles.container}>
      <TransactionsList />
      <TouchableOpacity style={styles.FAB} activeOpacity={0.7}>
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
  FAB: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 40,
    height: 40,
    borderRadius: theme.radius.l,
    backgroundColor: theme.colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: theme.colors.accent,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
}));
