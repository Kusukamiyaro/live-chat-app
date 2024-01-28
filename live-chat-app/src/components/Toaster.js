import { Alert, IconButton, Snackbar } from '@mui/material';
import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
function Toaster({message}) {
    const [open,setOpen] = React.useState(true);
    function handleClose (event,reason){
        if(reason==='clickaway'){return; }
        setOpen(false);
    }
  return (
    <div>
    
<Snackbar
  anchorOrigin={{ "vertical":"top", "horizontal":"right" }}
  open={open}
  onClose={handleClose}
  autoHideDuration={3000}
  message={message}
  variant="warning"
  ContentProps={
    {"aria-describedby" : "message-id"}
  }
  action={[
    <IconButton key="close" onClick={handleClose}>
        <CloseIcon/>
    </IconButton>
  ]}
>
 <Alert onClose={handleClose} severity='warning' sx={{width:"25vw"}}></Alert>

</Snackbar>
    </div>
  )
}

export default Toaster
