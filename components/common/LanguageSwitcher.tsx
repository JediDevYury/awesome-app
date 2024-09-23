import { USA, France } from '@/assets/images/flags';
import { localStorage } from '@/storage/local.storage';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { View, ScrollView, TouchableOpacity, ViewStyle } from 'react-native';
import { createStyleSheet, UnistylesRuntime, useStyles } from 'react-native-unistyles';

const flags = [
  { component: USA, lang: 'en-US', name: 'USA' },
  { component: France, lang: 'fr-FR', name: 'France' },
];

type LanguageSwitcherProps = {
  containerStyles?: ViewStyle;
};

export function LanguageSwitcher(props: LanguageSwitcherProps) {
  const { styles } = useStyles(stylesheet);
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const loadLanguage = async () => {
    const savedLanguage = localStorage.getItem('language');

    if (savedLanguage) {
      await i18n.changeLanguage(savedLanguage);
    }
  };

  const changeLanguage = async (lang: string) => {
    await i18n.changeLanguage(lang);

    localStorage.setItem('language', lang);
  };

  useEffect(() => {
    loadLanguage();
  }, [i18n]);

  return (
    <View style={[styles.container, props.containerStyles]}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flagsContainer}
      >
        {flags.map(({ component: Flag, lang, name }) => (
          <TouchableOpacity
            key={name}
            onPress={() => changeLanguage(lang)}
            style={[
              styles.flag,
              currentLanguage === lang && styles.activeFlag,
              currentLanguage !== lang && styles.inactiveFlag,
            ]}
          >
            <Flag width={45} height={45} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const stylesheet = createStyleSheet(() => ({
  container: {
    position: 'absolute',
    top: UnistylesRuntime.insets.top,
    right: UnistylesRuntime.insets.right,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
  },
  flagsContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
    alignItems: 'center',
  },
  flag: {
    paddingHorizontal: 10,
  },
  activeFlag: {
    transform: [{ scale: 1.2 }],
  },
  inactiveFlag: {
    opacity: 0.5,
  },
}));
