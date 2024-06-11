/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                monserrat: ['Montserrat', 'sans-serif'],
                pacifico: ['Pacifico', 'cursive'],
                inter: ['Inter', 'sans-serif'],
            },
            colors: {
                primary: '#ff7d1a',
                secondary: '#ffede0',
                light: '#EAEAEA',
            },
            screens: {
                sm: '376px',
                md: '768px',
            },
        },
    },
    plugins: [],
}
