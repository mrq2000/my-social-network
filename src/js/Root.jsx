import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DayjsUtils from '@date-io/dayjs';
import { SnackbarProvider } from 'notistack';

import PrivateRoute from './PrivateRoute';
import Home from './pages/Home';
import SignIn from './pages/SignIn';

const queryClient = new QueryClient({
  defaultConfig: {
    queries: {
      retry: 0,
      refetchOnWindowFocus: false,
    },
  },
});

const Router = (
  <Switch>
    <Route path="/sign-in" component={SignIn} />
    <PrivateRoute exact path="/" component={Home} />
  </Switch>
);

const Root = () => (
  <QueryClientProvider client={queryClient}>
    <MuiPickersUtilsProvider utils={DayjsUtils}>
      <SnackbarProvider maxSnack={3}>
        <BrowserRouter>
          <div>
            {Router}
          </div>
        </BrowserRouter>

        <ReactQueryDevtools initialIsOpen={false} />
      </SnackbarProvider>
    </MuiPickersUtilsProvider>
  </QueryClientProvider>
);

export default Root;
