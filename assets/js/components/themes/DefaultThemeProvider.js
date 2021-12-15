import React from 'react';
import { CssBaseline } from '@material-ui/core';
import { MuiThemeProvider} from '@material-ui/core';
import { createTheme } from '@material-ui/core';
import { amber, green, indigo } from '@material-ui/core/colors';
const theme= createTheme({
    palette:{
        type: 'dark',
        secondary: green,
        primary:{
            main: amber['900'],
            light: amber['100'],
    
        } 

    }
})

const DefaultThemeProvider = (props) => {
    return (
        <MuiThemeProvider theme={theme}>
            <CssBaseline>
            {props.children}
            </CssBaseline>
         </MuiThemeProvider>
    );
};

export default DefaultThemeProvider;