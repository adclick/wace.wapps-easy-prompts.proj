import { createTheme } from '@mantine/core';

export const theme = createTheme({
    /** Put your mantine theme override here */
    defaultRadius: "lg",
    primaryColor: "blue",
    white: "#F8F9FA",
    cursorType: 'pointer',
    fontFamily: 'Helvetica, sans-serif',
    colors: {
        dark: [
            '#C1C2C5',
            '#A6A7AB',
            '#909296',
            '#5C5F66',
            '#373A40',
            '#2C2E33',
            '#25262B',
            '#1A1B1E',
            '#141517',
            '#101113'
        ],
        gray: [
            '#F8F9FA',
            '#F1F3F5',
            '#E9ECEF',
            '#DEE2E6',
            '#CED4DA',
            '#ADB5BD',
            '#868E96',
            '#495057',
            '#343A40',
            '#212529'
        ]
    }
});
