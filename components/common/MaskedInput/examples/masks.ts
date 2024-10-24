import { Mask, MaskArray } from 'react-native-mask-input';

export const DATE_DDMMYYYY: Mask = (text = '') => {
  const cleanText = text.replace(/\D+/g, '').trim();

  let secondDigitDayMask = /\d/;

  if (cleanText.charAt(0) === '0') {
    secondDigitDayMask = /[1-9]/;
  }
  if (cleanText.charAt(0) === '3') {
    secondDigitDayMask = /[01]/;
  }

  let secondDigitMonthMask = /\d/;

  if (cleanText.charAt(2) === '0') {
    secondDigitMonthMask = /[1-9]/;
  }
  if (cleanText.charAt(2) === '1') {
    secondDigitMonthMask = /[012]/;
  }

  return [
    /[0-3]/,
    secondDigitDayMask,
    '.',
    /[0-1]/,
    secondDigitMonthMask,
    '.',
    /\d/,
    /\d/,
    /\d/,
    /\d/,
  ];
};

const CREDIT_CARD = [
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  ' ',
  /\d/,
  [/\d/],
  [/\d/],
  [/\d/],
  ' ',
  [/\d/],
  [/\d/],
  [/\d/],
  [/\d/],
  ' ',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
] as MaskArray;

const CURRENCY_MASK = (defaultSign: string = '$') => [
  defaultSign,
  /\d/,
  /\d/,
  /\d/,
  ',',
  /\d/,
  /\d/,
  /\d/,
  ',',
  /\d/,
  /\d/,
  /\d/,
  '.',
  /\d/,
  /\d/,
];

const PHONE_MASK: Mask = [
  '+',
  '(',
  /\d/,
  /\d/,
  /\d/,
  ')',
  '-',
  /\d/,
  /\d/,
  /\d/,
  '-',
  /\d/,
  /\d/,
  /\d/,
  '-',
  /\d/,
  /\d/,
  /\d/,
];

export const MASKS = {
  creditCard: CREDIT_CARD,
  dateDDMMYYYY: DATE_DDMMYYYY,
  currency: CURRENCY_MASK,
  phone: PHONE_MASK,
};
