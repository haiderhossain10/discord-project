/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                "ui-primary": "#5865F2",
                "ui-primary-hover": "#6270FC",
                "ui-secondary": "#202225",
                "ui-tertiary": "#2F3136",
                "ui-four": "#42464D",
                "ui-five": "#3BA55D",
            },
        },
    },
    plugins: [],
};
