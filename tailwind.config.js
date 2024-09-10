/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: 'tw-',
  content: ["./src/**/*.{html, ts}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        'chips-sheet': 'repeat(auto-fit, minmax(90px, min-content))',
      }
    },
  },
}

