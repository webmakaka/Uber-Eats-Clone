import { useForm } from 'react-hook-form';

interface IForm {
  email: string;
  password: string;
}

export const LoggedOutRouter = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>();

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
            {...register('email', {
              required: 'This is required',
              pattern: /^[A-Za-z0-9._%+-]+@gmail.com$/,
            })}
            name="email"
            type="email"
            placeholder="email"
          />
        </div>

        <div>
          <input
            {...register('password', {
              required: true,
            })}
            name="password"
            type="password"
            placeholder="password"
          />
          {errors.email?.message && (
            <span className="font-bold" text-red-600>
              {errors.email?.message}
            </span>
          )}
          {errors.email?.type === 'pattern' && (
            <span className="font-bold text-red-600">Only gmail allowed</span>
          )}
        </div>
        <div>
          <button className="bg-yellow-300 text-white">Submit</button>
        </div>
      </form>
    </div>
  );
};
