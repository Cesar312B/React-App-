import { Snackbar, useTheme} from '@material-ui/core';
import  SnackbarContent  from '@material-ui/core/SnackbarContent';
import  Button  from '@material-ui/core/Button';
import React, { Fragment, useContext } from 'react';
import { TodoContext } from '../contexts/TodoContext';

function checkLevel(level){
    switch(level){
        case 'success':
            return 'green';
        case 'error':
            return 'red'; 
        default:
            return 'white';   
    }
}

function AppSnackbar() {
    const context = useContext(TodoContext);
    
   

        return (

          
            <Snackbar autoHideDuration={3000} open={context.message.text !== undefined}>
                {context.message.text && (

                     <SnackbarContent  style={{backgroundColor: checkLevel(context.message.level), whitheSpace: 'pre'}} 
                     message={context.message.text} 
                action={[
                    <Button onClick={() => 
                        {context.setMessage({})}} 
                        key='dismiss' 
                        color='inherit'
                    >
                        dismiss
                    </Button>
                ]}/>

                )}
            </Snackbar>
        );
 
}

export default AppSnackbar;