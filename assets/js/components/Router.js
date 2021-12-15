
import React from 'react';
import TodoContextProvider from '../contexts/TodoContext';
import AppSnackbar from './AppSnackbar';
import TodoTable from './TodoTable';



const Router = () => {
    return (
        <div>
            <TodoContextProvider>
                <TodoTable/>
                <AppSnackbar/>
            </TodoContextProvider>
        </div>
    );
};

export default Router;