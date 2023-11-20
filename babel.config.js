module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'nativewind/babel',

    [
      'module:react-native-dotenv',
      {
        allowUndefined: false,
      },
    ],
    [
      'babel-plugin-rewrite-require',
      {
        aliases: {
          stream: 'readable-stream',
          crypto: 'react-native-get-random-values',
        },
      },
    ],
  ],
};
