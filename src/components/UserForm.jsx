import { useForm } from 'react-hook-form';

function UserForm({ onSubmit }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <h1>Thông tin người dùng</h1>

      <div className="field">
        <label htmlFor="name">Tên</label>
        <input
          id="name"
          type="text"
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? 'name-error' : undefined}
          {...register('name', {
            required: 'Vui lòng nhập tên.',
          })}
        />
        {errors.name && (
          <p id="name-error" className="error" role="alert">
            {errors.name.message}
          </p>
        )}
      </div>

      <div className="field">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? 'email-error' : undefined}
          {...register('email', {
            required: 'Vui lòng nhập email.',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Email không đúng định dạng.',
            },
          })}
        />
        {errors.email && (
          <p id="email-error" className="error" role="alert">
            {errors.email.message}
          </p>
        )}
      </div>

      <div className="field">
        <label htmlFor="age">Tuổi</label>
        <input
          id="age"
          type="number"
          aria-invalid={Boolean(errors.age)}
          aria-describedby={errors.age ? 'age-error' : undefined}
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
        {errors.age && (
          <p id="age-error" className="error" role="alert">
            {errors.age.message}
          </p>
        )}
      </div>

      <button type="submit">Gửi thông tin</button>
    </form>
  );
}

export default UserForm;
