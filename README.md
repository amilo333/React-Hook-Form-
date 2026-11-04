# Bài tập React Hook Form

Dự án sử dụng React Hook Form để quản lý form và Material UI (MUI) cho các thành phần giao diện.

Trang form nằm tại route `/user-form`. Khi truy cập `/`, React Router sẽ tự chuyển hướng tới trang này.

Form gồm ba trường:

- Tên: bắt buộc.
- Email: bắt buộc và đúng định dạng email.
- Tuổi: bắt buộc, là số từ 18 đến 65.

## Chạy dự án

```bash
npm install
npm run dev
```

## Chạy test

```bash
npm test
```

Các test kiểm tra việc render form, validation dữ liệu trống/sai và submit dữ liệu hợp lệ.

## Short Answer Questions

### 1. Mục đích của hàm `register` trong React Hook Form là gì?

Hàm `register` dùng để đăng ký một input với React Hook Form. Nó giúp thư viện theo dõi giá trị của input, nhận biết khi giá trị thay đổi và áp dụng các quy tắc validation.

Ví dụ:

```jsx
<input {...register('name')} />
```

Ở đây, input được đăng ký với tên `name`. Khi form được submit, dữ liệu trả về sẽ có dạng:

```js
{
  name: 'Nguyễn Văn An',
}
```

### 2. Làm thế nào để đặt quy tắc validation tùy chỉnh cho một trường?

Truyền các quy tắc validation vào tham số thứ hai của `register`. Mỗi quy tắc có thể đi kèm một thông báo lỗi riêng.

Ví dụ kiểm tra tuổi phải nằm trong khoảng từ 18 đến 65:

```jsx
<input
  type="number"
  {...register('age', {
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
  })}
/>

{errors.age && <p>{errors.age.message}</p>}
```

Ngoài các quy tắc có sẵn như `required`, `min`, `max` và `pattern`, có thể dùng `validate` để tự viết hàm kiểm tra:

```jsx
<input
  {...register('name', {
    validate: (value) =>
      value.trim().length >= 2 || 'Tên phải có ít nhất 2 ký tự.',
  })}
/>
```

### 3. Xử lý reset form trong React Hook Form như thế nào?

Lấy hàm `reset` từ `useForm`, sau đó gọi hàm này khi cần đưa form về trạng thái ban đầu. Thường có thể gọi `reset()` sau khi submit thành công.

```jsx
const { register, handleSubmit, reset } = useForm();

const onSubmit = (data) => {
  console.log(data);
  reset();
};

return (
  <form onSubmit={handleSubmit(onSubmit)}>
    <input {...register('name')} />
    <button type="submit">Gửi</button>
    <button type="button" onClick={() => reset()}>
      Nhập lại
    </button>
  </form>
);
```

`reset()` sẽ xóa giá trị hiện tại và đưa trạng thái form như lỗi, `dirty` và `touched` về ban đầu. Cũng có thể truyền dữ liệu mới vào `reset`:

```js
reset({ name: 'Nguyễn Văn An', email: 'an@example.com', age: 25 });
```
