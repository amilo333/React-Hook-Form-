import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useForm } from 'react-hook-form';

function UserForm({ onSubmit }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const nameField = register('name', {
    required: 'Vui lòng nhập tên.',
  });

  const emailField = register('email', {
    required: 'Vui lòng nhập email.',
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: 'Email không đúng định dạng.',
    },
  });

  const ageField = register('age', {
    required: 'Vui lòng nhập tuổi.',
    valueAsNumber: true,
    min: {
      value: 18,
      message: 'Tuổi phải từ 18 đến 65.',
    },
    max: {
      value: 65,
      message: 'Tuổi phải từ 18 đến 65.',
    },
  });

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <Stack spacing={2.5}>
        <Typography component="h1" variant="h5">
          Thông tin người dùng
        </Typography>

        <TextField
          id="name"
          label="Tên"
          fullWidth
          error={Boolean(errors.name)}
          helperText={errors.name?.message}
          name={nameField.name}
          onChange={nameField.onChange}
          onBlur={nameField.onBlur}
          inputRef={nameField.ref}
        />

        <TextField
          id="email"
          label="Email"
          type="email"
          fullWidth
          error={Boolean(errors.email)}
          helperText={errors.email?.message}
          name={emailField.name}
          onChange={emailField.onChange}
          onBlur={emailField.onBlur}
          inputRef={emailField.ref}
        />

        <TextField
          id="age"
          label="Tuổi"
          type="number"
          fullWidth
          error={Boolean(errors.age)}
          helperText={errors.age?.message}
          name={ageField.name}
          onChange={ageField.onChange}
          onBlur={ageField.onBlur}
          inputRef={ageField.ref}
        />

        <Button type="submit" variant="contained">
          Gửi thông tin
        </Button>
      </Stack>
    </Box>
  );
}

export default UserForm;
