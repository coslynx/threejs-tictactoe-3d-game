module.exports = {
  semi: false,
  singleQuote: true,
  trailingComma: 'es5',
  tabWidth: 2,
  bracketSpacing: true,
  plugins: [require('prettier-plugin-tailwindcss')],
  overrides: [
    {
      files: ['*.json', '*.yml', '*.html'],
      options: {
        tabWidth: 2,
      },
    },
  ],
}