/**
 * @type {import('tailwindcss').Config}
 * Configuration object for Tailwind CSS, defining theme customizations,
 * PurgeCSS settings, and plugin integrations.
 */
module.exports = {
  /**
   * @type {PurgeCSS}
   * Configuration for PurgeCSS to remove unused styles in production builds.
   * Specifies the content sources to include all *.tsx files in the src directory
   * and uses a safelist to prevent the removal of dynamically created class names.
   */
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: ['./src/**/*.tsx'],
    safelist: [/^(bg|text|border)-(primary|secondary|accent|neutral)/, /grid-cols-\d+/, /col-span-\d+/],
  },
  /**
   * @type {ThemeConfig}
   * Configuration for the default theme, extending Tailwind's default configuration
   * with brand colors, custom font families, spacing units, and breakpoints.
   */
  theme: {
    /**
     * @type {Colors}
     * Extends the default color palette with brand colors, aligning with styles/index.css.
     */
    colors: {
      transparent: 'transparent',
      primary: '#282c34',
      secondary: '#61dafb',
      accent: '#98c379',
      neutral: '#abb2bf',
    },
    /**
     * @type {FontFamily}
     * Sets the default font family to include 'Roboto Condensed' (sans-serif) for headings
     * and 'Open Sans' (sans-serif) for body text.
     */
    fontFamily: {
      heading: ['Roboto Condensed', 'sans-serif'],
      body: ['Open Sans', 'sans-serif'],
    },
    /**
     * Extends the default theme to include custom spacing units consistent with a base-4 system
     * and defines custom breakpoints to align with common device screen sizes, ensuring responsiveness.
     */
    extend: {
      spacing: {
        '4': '1rem',
        '8': '2rem',
        '12': '3rem',
        '16': '4rem',
        '24': '6rem',
        '32': '8rem',
        '48': '12rem',
        '64': '16rem',
        '96': '24rem',
      },
      /**
       * Includes common breakpoints ('sm': '480px', 'md': '768px', 'lg': '1024px', 'xl': '1200px')
       */
      screens: {
        'sm': '480px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1200px',
      },
    },
  },
  /**
   * @type {Plugins}
   * Includes the @tailwindcss/forms plugin to provide improved form styling.
   */
  plugins: [
    require('@tailwindcss/forms'),
  ],
};