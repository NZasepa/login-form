import * as fromLogin from './login/login.reducers';
import { ActionReducerMap } from '@ngrx/store';

export interface State {
  login: fromLogin.State;
}

export const reducers: ActionReducerMap<State> = {
  login: fromLogin.reducer
};
