import { isLoggedInVar } from 'apollo';

export const LoggedInRouter = () => {
  const onClick = () => {
    isLoggedInVar(false);
  };

  return (
    <div>
      <h1>Logged In</h1>
      <button onClick={onClick}>Click to logout</button>
    </div>
  );
};
