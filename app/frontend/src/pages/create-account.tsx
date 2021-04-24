import { gql, useMutation } from '@apollo/client';
import { FormError } from 'components/form-error';
import { useForm } from 'react-hook-form';
import nuberLogo from 'images/logo.svg';
import { Button } from 'components/button';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { UserRole } from '__generated__/globalTypes';

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccountMutation($createAccountInput: CreateAccountInput!) {
    createAccount(input: $createAccountInput) {
      ok
      error
    }
  }
`;

interface ICreateAccountForm {
  email: string;
  password: string;
  role: UserRole;
}

export const CreateAccount = () => {
  const {
    register,
    getValues,
    watch,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ICreateAccountForm>({
    mode: 'onChange',
    defaultValues: {
      role: UserRole.Client,
    },
  });

  const [createAccountMutation] = useMutation(CREATE_ACCOUNT_MUTATION);

  const onSubmit = () => {};
  console.log(watch());

  return (
    <div className="h-screen flex items-center flex-col mt:10 lg:mt-28">
      <Helmet>
        <title>Create Account | Nuber Eats</title>
      </Helmet>
      <div className="w-full max-w-screen-sm flex flex-col px-5 items-center">
        <img src={nuberLogo} className="w-52 mb-10" alt="nuberLogo" />
        <h4 className="w-full font-medium text-left text-3xl mb-5">
          Let's get started
        </h4>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-3 mt-5 w-full mb-5"
        >
          <input
            {...register('email', {
              required: 'Email is required',
            })}
            required
            type="email"
            placeholder="Email"
            className="input "
          />

          {errors.email?.message && (
            <FormError errorMessage={errors.email?.message} />
          )}

          <input
            {...register('password', {
              required: 'Password is required',
              minLength: 4,
            })}
            required
            type="password"
            placeholder="Password"
            className="input"
          />

          {errors.password?.message && (
            <FormError errorMessage={errors.password?.message} />
          )}

          {errors.password?.type === 'minLength' && (
            <FormError errorMessage="Password must be more than 4 chars." />
          )}

          <select
            className="input"
            {...register('role', {
              required: true,
            })}
          >
            {Object.keys(UserRole).map((role, index) => (
              <option key={index}>{role}</option>
            ))}
          </select>

          <Button
            canClick={isValid}
            loading={false}
            actionText={'Create Account'}
          />
        </form>
        <div>
          Already have an account?{' '}
          <Link to="/login" className="text-lime-600 hover:underline">
            Log in now
          </Link>
        </div>
      </div>
    </div>
  );
};
