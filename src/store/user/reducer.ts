import { UserType, UserActionTypes, UserActions } from './types';

const initialState = {
  isAuth: false,
  name: '',
  email: '',
  token: '',
} as UserType;

export function userReducer(state = initialState, action: UserActions) {
  switch (action.type) {
    case UserActionTypes.LOGIN_USER:
      return action.payload;
    case UserActionTypes.LOGOUT_USER:
      return action.payload;

    default:
      return state;
  }
}
