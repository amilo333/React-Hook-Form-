import { useState } from 'react';
import Alert from '@mui/material/Alert';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import UserForm from '../components/UserForm';

function UserFormPage() {
  const [submittedUser, setSubmittedUser] = useState(null);

  return (
    <Container component="main" maxWidth="sm" sx={{ py: 6 }}>
      <Paper variant="outlined" sx={{ p: 3 }}>
        <UserForm onSubmit={setSubmittedUser} />
      </Paper>

      {submittedUser && (
        <Alert severity="success" sx={{ mt: 2 }} role="status">
          Gửi thông tin thành công cho {submittedUser.name}!
        </Alert>
      )}
    </Container>
  );
}

export default UserFormPage;
