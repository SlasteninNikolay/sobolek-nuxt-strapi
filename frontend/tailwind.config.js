/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend: {
        colors: {
            // Primary - темно-синий (#254c60)
            primary: {
                50: '#f2f5f1',
                100: '#dee4dc',
                200: '#bdc9b9',
                300: '#9bae96',
                400: '#7a9372',
                500: '#2A3928', // основной primary
                600: '#222e20',
                700: '#192218',
                800: '#111710',
                900: '#080b08',
                DEFAULT: '#2A3928',
            },

            // Secondary - светло-синий (#2980E4)
            secondary: {
                50: '#f8f7f2',
                100: '#f2efdf',
                200: '#e5dfbf',
                300: '#d8cf9f',
                400: '#cabf7f',
                500: '#BDAD83', // основной secondary
                600: '#978a69',
                700: '#71684f',
                800: '#4c4534',
                900: '#26231a',
                DEFAULT: '#BDAD83',
            },

            // Первый коричневый - темный (#564242)
            brown: {
                50: '#faf7f7',
                100: '#f5efef',
                200: '#ebdfdf',
                300: '#e1cfcf',
                400: '#d7bfbf',
                500: '#564242', // первый коричневый
                600: '#453535',
                700: '#342828',
                800: '#231b1b',
                900: '#120e0e',
                DEFAULT: '#564242',
            },

            // Второй коричневый - светлый (бежевый, #D28CAE)
            beige: {
                50: '#faf8f6',
                100: '#f5f1ed',
                200: '#ebe3db',
                300: '#e1d5c9',
                400: '#d8c8b7',
                500: '#FFF6EB', // основной бежевый
                600: '#b8a399',
                700: '#9e8a84',
                800: '#84716f',
                900: '#6a585a',
                DEFAULT: '#FFF6EB',
            },
        },
        fontFamily: {
            // Основные категории
            sans: ['Montserrat', 'ui-sans-serif', 'system-ui', 'sans-serif'],
            display: ['Montserrat', 'ui-sans-serif', 'system-ui', 'sans-serif'],

            // Семантические названия
            heading: ['Montserrat', 'ui-sans-serif'],
            body: ['Montserrat', 'ui-sans-serif'],
            accent: ['Montserrat', 'ui-sans-serif'],

            // Прямые названия
            montserrat: ['Montserrat', 'ui-sans-serif'],
        },
        container: {
            center: true,
            padding: {
                DEFAULT: '1rem',
            },
            screens: {
                xs: "95%",
                ss: "480px",
                sm: "769px",
                md: "992px",
                lg: "1025px",
                xl: '1200px',
                xxl: "1400px",
            },
        },
    },
  },
  plugins: [],
}

