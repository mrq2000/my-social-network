import React from 'react';

import SignInComponent from '../components/auth/SignIn';

const SignIn = () => {
  const content = 'Sign in';
  return (
    <div>
      {content}
      <SignInComponent />
    </div>
  );
};

export default SignIn;
