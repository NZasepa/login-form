import * as loginActions from './login.actions';

export interface State {
  loading: boolean;
  step: string;
}

const initialState: State = {
  loading: false,
  step: 'login'
};

export function reducer(state = initialState, action: loginActions.Actions) {
  switch (action.type) {
    case loginActions.LOGIN_REQUESTED: {
      return {
        ...state,
        loading: true,
        step: 'login'
      };
    }

    case loginActions.LOGIN_SUCCESS: {
      return {
        ...state,
        loading: false,
        step: 'success'
      };
    }

    case loginActions.LOGIN_FAILURE: {
      return {
        ...state,
        loading: false,
        step: 'failure'
      };
    }

    default: {
      return state;
    }
  }
}
