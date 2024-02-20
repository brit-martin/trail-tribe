import { createTheme } from "@mui/material";

const theme = createTheme({
    palette: {
        primary: {
            main: '#FF4b1f',
            light: '#ff7c5c',
            contrastText: '#000'
        },
        secondary: {
            main: '#a1f7f5',
            light: '#c7faf9',
            contrastText: '#000'
        },
        tertiary: {
            main: '#7286a0',
            light: '#aab6c5',
            contrastText: '#000'
        },
        quadratiary: {
            main: '#3e3e3e',
            light: '#8f8f8f',
            contrastText: '#fff'

        },
        white: {
            main: '#fff',
            contrastText: '#000'
        },
        black: {
            main: '#000',
            contrastText: '#fff'
        }, 
        error: {
            main: '#ff0000'
        },
        warning: {
            main: '#ffff00'
        },
        success: {
            main: '#00ff00'
        },
        info: {
            main: '#0E3B43'
        }
    },
    shape: {
        outerBorderRadius: '12px',
        innerBorderRadius: '4px'
    },
});

const primHoverSX = {
    '&:hover': {
        backgroundColor: '#ff7c5c',
    }
}

const secHoverSX ={
    '&:hover': {
        backgroundColor: '#c7faf9',
    }
}

const terHoverSX ={
    '&:hover': {
        backgroundColor: '#aab6c5',
    }
}


export { primHoverSX, secHoverSX, terHoverSX };
export default theme;