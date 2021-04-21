import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DayjsUtils from '@date-io/dayjs';
import { SnackbarProvider } from 'notistack';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';

import theme from '../theme';

import PrivateRoute from './PrivateRoute';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import Me from './pages/Me';
import UserPage from './pages/UserPage';

import '../scss/app.scss';

const queryClient = new QueryClient({
  defaultOptions: {
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
    <PrivateRoute exact path="/me" component={Me} />
    <PrivateRoute exact path="/users/:userId" component={UserPage} />
  </Switch>
);

const Root = () => (
  <QueryClientProvider client={queryClient}>
    <MuiPickersUtilsProvider utils={DayjsUtils}>
      <SnackbarProvider maxSnack={3}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <div>
              {Router}
            </div>
          </BrowserRouter>

          <CssBaseline />
          <ReactQueryDevtools initialIsOpen={false} />
        </ThemeProvider>
      </SnackbarProvider>
    </MuiPickersUtilsProvider>
  </QueryClientProvider>
);

export default Root;
