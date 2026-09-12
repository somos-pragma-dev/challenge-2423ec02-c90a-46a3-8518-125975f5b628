import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Profile } from '../../models/profile.model';
import * as ProfileActions from './profile.actions';

export interface ProfileState extends EntityState<Profile> {
  selectedProfileId: string | null;
  loading: boolean;
  error: string | null;
  lastUpdated: number | null;
}

export const adapter: EntityAdapter<Profile> = createEntityAdapter<Profile>({
  selectId: (profile: Profile) => profile.id,
  sortComparer: false
});

export const initialState: ProfileState = adapter.getInitialState({
  selectedProfileId: null,
  loading: false,
  error: null,
  lastUpdated: null
});

export const profileReducer = createReducer(
  initialState,
  
  on(ProfileActions.loadProfile, (state, { userId }) => ({
    ...state,
    loading: true,
    error: null,
    selectedProfileId: userId
  })),
  
  on(ProfileActions.loadProfileSuccess, (state, { profile }) => 
    adapter.upsertOne(profile, {
      ...state,
      loading: false,
      error: null,
      lastUpdated: Date.now()
    })
  ),
  
  on(ProfileActions.loadProfileFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  
  on(ProfileActions.updateProfile, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  
  on(ProfileActions.updateProfileSuccess, (state, { profile }) => 
    adapter.updateOne(
      { id: profile.id, changes: profile },
      {
        ...state,
        loading: false,
        error: null,
        lastUpdated: Date.now()
      }
    )
  ),
  
  on(ProfileActions.updateProfileFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  
  on(ProfileActions.clearProfile, (state) => 
    adapter.removeAll({
      ...state,
      selectedProfileId: null,
      loading: false,
      error: null,
      lastUpdated: null
    })
  ),
  
  on(ProfileActions.setProfileLoading, (state, { loading }) => ({
    ...state,
    loading
  })),
  
  on(ProfileActions.setProfileError, (state, { error }) => ({
    ...state,
    error
  }))
);

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = adapter.getSelectors();