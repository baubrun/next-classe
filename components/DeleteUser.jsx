import React, {useState} from 'react'

import {useRouter} from 'next/router';

import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'



const DeleteUser = (props) => {
    const [open, setOpen] = useState(false)
    const [redirect, setRedirect] = useState(false)
    const router = useRouter()


    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const deleteAccount = () => { 
     
      }
    
      if (redirect) {
        router.push("/")
      }
    
    return (<span>
        <IconButton aria-label="Delete" onClick={() => handleOpen()} color="secondary">
          <DeleteIcon/>
        </IconButton>
  
        <Dialog open={open} onClose={() => handleClose()}>
          <DialogTitle>{"Delete Account"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Confirm to delete your account.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => handleClose()} color="primary">
              Cancel
            </Button>
            <Button onClick={() => deleteAccount()} color="secondary" autoFocus="autoFocus">
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </span>)
  }

export default DeleteUser
