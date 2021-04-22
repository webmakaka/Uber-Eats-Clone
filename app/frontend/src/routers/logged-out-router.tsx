import { useForm } from 'react-hook-form';

export const LoggedOutRouter = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = () => {
    console.log(watch('email'));
  };

  const onInvalid = () => {
    console.log(errors);
    console.log('Cant create account');
  };

  return (
    <div>
      <h1>Logged Out</h1>
      <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
        <div>
          <input
            {...register('test', {
              required: 'This is required',
              pattern: /^[A-Za-z0-9._%+-]+@gmail.com$/,
            })}
            name="email"
            type="email"
            required
            placeholder="email"
          />
        </div>

        <div>
          <input
            {...register('test', {
              required: true,
            })}
            name="password"
            type="password"
            required
            placeholder="password"
          />
        </div>
        <div>
          <button className="bg-yellow-300 text-white">Submit</button>
        </div>
      </form>
    </div>
  );
};
