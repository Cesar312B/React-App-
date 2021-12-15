
import React from 'react';
import  ReactDOM from 'react-dom';  
import Router from './js/components/Router';
import DefaultThemeProvider from './js/components/themes/DefaultThemeProvider';


class App extends React.Component {
    render() {
        return (
         <Router/>
        );
    }
}

ReactDOM.render(<DefaultThemeProvider><App/></DefaultThemeProvider>
, document.getElementById('root'));