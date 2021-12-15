import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import PropTypes  from 'prop-types';
import React, { useContext } from 'react';
import { TodoContext } from '../contexts/TodoContext';

function DelateDialog(props){
    const hide =()=>{
        props.setDeleteConfirmationIsShown(false);
    };
    const context = useContext(TodoContext);

    console.log(props);

        return (
           <Dialog onClose={hide} maxWidth="sm" open={props.open}>
               <DialogTitle>Aryu sure delate itme </DialogTitle>
               <DialogContent>{props.todo.name}</DialogContent>
               <DialogActions>
                   <Button onClick={hide}>Cancel</Button>
                   <Button onClick={() =>{context.delateTodo({id: props.todo.id, name: props.todo.name}); hide()}}> Delete</Button>
               </DialogActions>
           </Dialog>
        );
    
}

DelateDialog.prototype = {
    open:PropTypes.bool.isRequired,
    setDeleteConfirmationIsShown: PropTypes.func.isRequired,
    todo: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
    }),
};


export default DelateDialog;