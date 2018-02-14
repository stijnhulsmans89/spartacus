import {
  ActionReducerMap,
  MemoizedSelector,
  createFeatureSelector,
  ActionReducer,
  MetaReducer
} from '@ngrx/store';
import * as fromUserToken from './user-token.reducer';
import * as fromUserDetailsReducer from './user-details.reducer';
import { localStorageSync } from 'ngrx-store-localstorage';

export interface UserState {
  userDetails: fromUserDetailsReducer.UserDetailsState;
  token: fromUserToken.UserTokenState;
}

export const reducers: ActionReducerMap<UserState> = {
  userDetails: fromUserDetailsReducer.reducer,
  token: fromUserToken.reducer
};

export const getUserState: MemoizedSelector<
  any,
  UserState
  > = createFeatureSelector<UserState>('user');

function sessionStorageSyncReducer(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return localStorageSync({
    keys: ['token'], // TODO [SPA-276] - 'user' doesn't work?
    rehydrate: true,
    storage: sessionStorage
  })(reducer);
}
export const metaReducers: Array<MetaReducer<any, any>> = [
  sessionStorageSyncReducer
];
