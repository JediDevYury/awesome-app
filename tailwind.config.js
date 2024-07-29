/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ['./app/**/*.{js,jsx,ts,tsx}', './shared/**/*.{js,jsx,ts,tsx}'],
  // eslint-disable-next-line no-undef
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      fontFamily: {
        firaReg: ['FiraSans-Regular'],
        firaSemibold: ['FiraSans-SemiBold'],
        firaBold: ['FiraSans-Bold'],
      },
    },
  },
  plugins: [],
};
