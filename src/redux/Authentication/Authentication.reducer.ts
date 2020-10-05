import { User } from '../../services/Authentication.service';
import { Action } from '..';


declare interface AuthenticationState {
  profil?: User
}

export default function (state: AuthenticationState = {}, action: Action): AuthenticationState {
  switch (action.type) {
    case 'AUTHENTICATION_LOGIN':
      return {profil: action.payload};

    case 'AUTHENTICATION_LOGOUT':
      return {};

    default:
      return state;
  }
}