import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import api from '../Axios';
import { UserDetailsContext } from '../context/UserContext';

const emails = ['username@gmail.com', 'user02@gmail.com'];

function SimpleDialog(props) {
    const { onClose, selectedValue, open, code } = props;
    const [users, setUsers] = React.useState([])
    const { user } = React.useContext(UserDetailsContext)

    const handleClose = () => {
        onClose(selectedValue);
    };

    const handleListItemClick = (receiverId, code) => {
        onClose(receiverId);
        console.log(receiverId, user.userId, code);
        let obj = {
            firstPersonId: receiverId,
            secondPersonId: user.userId,
            message: code
        }
        api.post('/chat/set-chat', obj).then((response) => {
            console.log(response);
        }).catch((error) => {
            console.log(error);
        })
    };

    React.useEffect(() => {
        api.get('/user/get-users').then((response) => {
            console.log(response)
            setUsers(response.data.usersList.filter((a) => a._id != user.userId))
        }).catch((error) => {
            console.log(error);
        })
    }, [])

    return (
        <Dialog onClose={handleClose} open={open} >
            <DialogTitle sx={{}}>Send to friend</DialogTitle>
            <List sx={{ pt: 0, height: '300px' }}>
                {users.map((a) => (
                    <ListItem disableGutters key={a.email}>
                        <ListItemButton onClick={() => handleListItemClick(a._id, code)}>
                            <ListItemAvatar>
                                <Avatar sx={{ bgcolor: blue[100], color: blue[600] }} src={a.image}>
                                    <PersonIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={a.username} secondary={a.email} />
                        </ListItemButton>
                    </ListItem>
                ))}
                {/* <ListItem disableGutters>
                    <ListItemButton
                        autoFocus
                        onClick={() => handleListItemClick('addAccount')}
                    >
                        <ListItemAvatar>
                            <Avatar>
                                <AddIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Add account" />
                    </ListItemButton>
                </ListItem> */}
            </List>
        </Dialog>
    );
}

SimpleDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
};

export default function ShareList({ code }) {
    const [open, setOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState(emails[1]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
        setSelectedValue(value);
    };

    return (
        <div>
            {/* <Typography variant="subtitle1" component="div">
                Selected: {selectedValue}
            </Typography> */}
            <br />
            <Button onClick={handleClickOpen}>
                share with
            </Button>
            <SimpleDialog
                selectedValue={selectedValue}
                open={open}
                onClose={handleClose}
                code={code}
            />
        </div>
    );
}
