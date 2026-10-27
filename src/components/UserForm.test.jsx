import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test, vi } from 'vitest';
import UserForm from './UserForm';

describe('UserForm', () => {
  test('hiển thị đầy đủ các trường và nút gửi', () => {
    render(<UserForm onSubmit={vi.fn()} />);

    expect(screen.getByRole('heading', { name: /thông tin người dùng/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/tên/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/tuổi/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /gửi thông tin/i })).toBeInTheDocument();
  });

  test('hiển thị lỗi khi gửi form trống', async () => {
    const user = userEvent.setup();
    render(<UserForm onSubmit={vi.fn()} />);

    await user.click(screen.getByRole('button', { name: /gửi thông tin/i }));

    expect(await screen.findByText('Vui lòng nhập tên.')).toBeInTheDocument();
    expect(screen.getByText('Vui lòng nhập email.')).toBeInTheDocument();
    expect(screen.getByText('Vui lòng nhập tuổi.')).toBeInTheDocument();
  });

  test('hiển thị lỗi khi email và tuổi không hợp lệ', async () => {
    const user = userEvent.setup();
    render(<UserForm onSubmit={vi.fn()} />);

    await user.type(screen.getByLabelText(/tên/i), 'Nguyễn Văn An');
    await user.type(screen.getByLabelText(/email/i), 'email-sai');
    await user.type(screen.getByLabelText(/tuổi/i), '17');
    await user.click(screen.getByRole('button', { name: /gửi thông tin/i }));

    expect(await screen.findByText('Email không đúng định dạng.')).toBeInTheDocument();
    expect(screen.getByText('Tuổi phải từ 18 đến 65.')).toBeInTheDocument();
  });

  test('gọi onSubmit với dữ liệu hợp lệ', async () => {
    const user = userEvent.setup();
    const handleSubmit = vi.fn();
    render(<UserForm onSubmit={handleSubmit} />);

    await user.type(screen.getByLabelText(/tên/i), 'Nguyễn Văn An');
    await user.type(screen.getByLabelText(/email/i), 'an@example.com');
    await user.type(screen.getByLabelText(/tuổi/i), '25');
    await user.click(screen.getByRole('button', { name: /gửi thông tin/i }));

    expect(handleSubmit).toHaveBeenCalledTimes(1);
    expect(handleSubmit).toHaveBeenCalledWith(
      {
        name: 'Nguyễn Văn An',
        email: 'an@example.com',
        age: 25,
      },
      expect.anything(),
    );
  });
});
