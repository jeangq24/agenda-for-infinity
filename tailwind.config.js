/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {

      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },

      colors: {
        infinity: {
          white: {
            standard: '#FFFFFF',
            snow: '#FFFAFA',
            ivory: '#FFFFF0',
            ghostWhite: '#F8F8FF',
            whiteSmoke: '#F5F5F5',
            alabaster: '#FAFAFA',
          },

          black: {
            standard: '#000000',
            darkGray: '#0D0D0D',
            carbon: '#1C1C1C',
            ebony: '#2B2B2B',
            slateGray: '#3D3D3D',
          },

          gray: {
            lightGray: '#D3D3D3',
            silver: '#C0C0C0',
            darkGray: '#A9A9A9',
            gray: '#808080',
            dimGray: '#696969',
            slateGray: '#708090',
            charcoal: '#36454F',
          },

          pink: {
            lightPink: '#FECACA',
            softPink: '#FCA5A5',
            pastelPink: '#FFC0CB',
            hotPink: '#FF69B4',
            deepPink: '#FF1493',
            salmonPink: '#FF91A4',
            coralPink: '#FF6F61',
          },

        }
      }
    },
  },
  darkMode: "class",
  plugins: [nextui({
    themes: {
      light: {
        colors: {
          primary: '#FCA5A5',  // Asignas el color softPink como primary
          secondary: '#FF6F61',  // Otro color como secondary
          error: '#FF1493',  // Personalizas error
          success: '#00FF00',  // Puedes ajustar el color success también
        },
      },
      dark: {
        colors: {
          primary: '#FCA5A5',  // Puedes definir colores distintos para dark mode
          secondary: '#FF6F61',
          error: '#FF1493',
          success: '#00FF00',
        },
      },
    },
  })],
};
