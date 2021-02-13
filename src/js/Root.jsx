import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import PrivateRoute from './PrivateRoute';
import Home from './pages/Home';
import SignIn from './pages/SignIn';

const queryClient = new QueryClient({
  defaultConfig: {
    queries: {
      retry: 0,
    },
  },
});

const Root = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/sign-in" component={SignIn} />
          <PrivateRoute exact path="/" component={Home} />
        </Switch>
      </div>

      <ReactQueryDevtools initialIsOpen={false} />
    </BrowserRouter>
  </QueryClientProvider>
);

export default Root;
