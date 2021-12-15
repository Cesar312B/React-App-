import React, { Fragment, useContext, useState } from 'react';
import Table from '@material-ui/core/Table';
import { TodoContext } from '../contexts/TodoContext';
import { Typography, IconButton , TableBody, TableCell, TableHead, TableRow, TextField, makeStyles  } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Cancel';
import DelateDialog from './DelateDialog';

const useStyles = makeStyles( theme=>(
    {
        thead: {
            backgroundColor: theme.palette.primary.main,
        }
    }
));


function TodoTable () {
     const context= useContext(TodoContext);
     const [addTodoName, setAddTodoName] = useState('');
     const [addTodoDescription, setAddTodoDescription] = useState('');
     const [editIsShown, setEditIsShown]= useState(false);
     const [editTodoName, setEditTodoName] = useState('');
     const [editTodoDescription, setEditTodoDescription] = useState('');
     const [DeleteConfirmationIsShown, setDeleteConfirmationIsShown]= useState(false);
     const [todoToBeDeleted, setTodoToBeDeleted] = useState(null);


     
   
     const onCreateSubmit = (event) => {
        event.preventDefault();
        context.createTodo(event, {name: addTodoName, description: addTodoDescription});
        setAddTodoName('');
        setAddTodoDescription('');
    };

    const onEditSubmit = (todoId, event) => {
        event.preventDefault();
        context.updateTodo({id: todoId, name: editTodoName, description: editTodoDescription});
        setEditIsShown(false);
    };


   
    const classes = useStyles();

return (
<Fragment>

<Table>
          <TableHead className={classes.thead} >
              <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell align="right">Actions</TableCell>
              </TableRow>
          </TableHead>
          <TableBody>
          <TableRow>
                       <TableCell>
                            <form onSubmit={onCreateSubmit}>
                                <TextField variant="outlined"
                                           type="text"
                                           size="small"
                                           value={addTodoName}
                                           onChange={(event) => {
                                               setAddTodoName(event.target.value);
                                           }}
                                           label="Name"
                                           fullWidth={true}/>
                            </form>
                        </TableCell>

                        <TableCell>
                            <form>
                                <TextField variant="outlined"
                                           size="small"
                                           type="text"
                                           value={addTodoDescription}
                                           onChange={(event) => {
                                               setAddTodoDescription(event.target.value);
                                           }}
                                           label="Description"
                                           fullWidth={true}
                                           multiline={true}/>
                            </form>
                        </TableCell>
                        <TableCell width={130} align="right">
                            <IconButton color="primary" onClick={onCreateSubmit}>
                                <AddIcon/>
                            </IconButton>
                        </TableCell>
            </TableRow>
              {context.todos.slice().reverse().map((todo, index)=>(
                  
                  <TableRow key={'todo'+ index}>
                       <TableCell>
                                {editIsShown === todo.id ?
                                 <form onSubmit={onEditSubmit.bind(this, todo.id)}>
                                     <TextField
                                         type="text"
                                         fullWidth={true}
                                         autoFocus={true}
                                         value={editTodoName}
                                         onChange={(event) => {
                                             setEditTodoName(event.target.value);
                                         }}
                                     />
                                 </form>
                                                         :
                                 <Typography>{todo.name}</Typography>
                                }
                            </TableCell>

                            {/*DESCRIPTION*/}
                            <TableCell>
                                {editIsShown === todo.id ?
                                 <TextField
                                     type="text"
                                     fullWidth={true}
                                     value={editTodoDescription}
                                     onChange={(event) => setEditTodoDescription(event.target.value)}
                                     multiline={true}
                                 />
                                                         :
                                 <Typography style={{whiteSpace: 'pre-wrap'}}>{todo.description}</Typography>
                                }
                            </TableCell>

                            <TableCell align="right">

                                {editIsShown === todo.id ?
                                 <Fragment>
                                     <IconButton onClick={onEditSubmit.bind(this, todo.id)}>
                                         <DoneIcon/>
                                     </IconButton>
                                     <IconButton onClick={() => setEditIsShown(false)}>
                                         <CloseIcon/>
                                     </IconButton>
                                 </Fragment>
                                                         :
                                 <Fragment>
                                     <IconButton color="primary" onClick={() => {
                                         setEditIsShown(todo.id);
                                         setEditTodoName(todo.name);
                                         setEditTodoDescription(todo.description);
                                     }}>
                                         <EditIcon/>
                                     </IconButton>

                                     <IconButton color="secondary" onClick={() => {
                                         setDeleteConfirmationIsShown(true);
                                         setTodoToBeDeleted(todo);
                                     }}>
                                         <DeleteIcon/>
                                     </IconButton>
                                 </Fragment>
                                }


                            </TableCell>
                  </TableRow>  
              ))}
          </TableBody>

      </Table>         

    {DeleteConfirmationIsShown && (
  <DelateDialog open={DeleteConfirmationIsShown} setDeleteConfirmationIsShown={setDeleteConfirmationIsShown} todo={todoToBeDeleted}/>

    )}

</Fragment>
        );
    
}

export default TodoTable;