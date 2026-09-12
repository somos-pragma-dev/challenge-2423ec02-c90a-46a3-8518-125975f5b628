import { createAction, props } from '@ngrx/store';
import { Profile } from '../../models/profile.model';

export const loadProfile = createAction(
  '[Profile] Load Profile',
  props<{ userId: string }>()
);

export const loadProfileSuccess = createAction(
  '[Profile] Load Profile Success',
  props<{ profile: Profile }>()
);

export const loadProfileFailure = createAction(
  '[Profile] Load Profile Failure',
  props<{ error: string }>()
);

export const updateProfile = createAction(
  '[Profile] Update Profile',
  props<{ profile: Partial<Profile> }>()
);

export const updateProfileSuccess = createAction(
  '[Profile] Update Profile Success',
  props<{ profile: Profile }>()
);

export const updateProfileFailure = createAction(
  '[Profile] Update Profile Failure',
  props<{ error: string }>()
);

export const clearProfile = createAction(
  '[Profile] Clear Profile'
);

export const setProfileLoading = createAction(
  '[Profile] Set Loading',
  props<{ loading: boolean }>()
);

export const setProfileError = createAction(
  '[Profile] Set Error',
  props<{ error: string | null }>()
);