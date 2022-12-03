/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                primary: '#5F6CAF',
                secondary: '#5BBFBA',
                tertiary: '#E7F0C3',
                quartiary: '#F0CF85',
                quintiary: '#A4D4AE',
                danger: '#f67473',
            },
        },
    },
    plugins: [],
};
