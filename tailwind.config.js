/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        darkgreen: '#124244',
        lightgreen: '#5c8689',
        accentgreen: '#61ae9a',
        accentorange: '#ff914d',
        offwhite: '#f5fbfdff',
        greenwhite: 'rgb(194, 215, 216)',
      },
    },
    plugins: [],
  }
}

