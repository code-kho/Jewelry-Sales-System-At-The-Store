import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Avatar } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';

const Popup = ({ user, onClose }) => {
    if (!user) {
        return null; // Return early if user data is not available yet
    }

    const { fullName, username, email, roleName, revenue, address, phoneNumber, roleId, counterId } = user;

    return (
        <Dialog open={true} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>User Detail</DialogTitle>
            <DialogContent dividers>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    <Avatar style={{ marginRight: '10px' }}>
                        <PersonIcon />
                    </Avatar>
                    <Typography variant="h6">{fullName}</Typography>
                </div>
                <Typography variant="body1">
                    <strong>Username:</strong> {username}
                </Typography>
                <Typography variant="body1">
                    <strong>Email:</strong> {email}
                </Typography>
                <Typography variant="body1">
                    <strong>Role:</strong> {roleName}
                </Typography>
                <Typography variant="body1">
                    <strong>Revenue:</strong> ${revenue.toFixed(2)}
                </Typography>
                <Typography variant="body1">
                    <strong>Address:</strong> {address}
                </Typography>
                <Typography variant="body1">
                    <strong>Phone Number:</strong> {phoneNumber}
                </Typography>
                <Typography variant="body1">
                    <strong>Role ID:</strong> {roleId}
                </Typography>
                <Typography variant="body1">
                    <strong>Counter ID:</strong> {counterId}
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary" variant="contained">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default Popup;
