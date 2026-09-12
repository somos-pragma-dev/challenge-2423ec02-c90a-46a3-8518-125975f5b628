import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProfileState, selectAll, selectEntities } from './profile.reducer';

export const selectProfileState = createFeatureSelector<ProfileState>('profile');

export const selectAllProfiles = createSelector(
  selectProfileState,
  selectAll
);

export const selectProfileEntities = createSelector(
  selectProfileState,
  selectEntities
);

export const selectSelectedProfileId = createSelector(
  selectProfileState,
  (state) => state.selectedProfileId
);

export const selectSelectedProfile = createSelector(
  selectProfileEntities,
  selectSelectedProfileId,
  (entities, selectedId) => selectedId ? entities[selectedId] : null
);

export const selectProfileById = (profileId: string) => createSelector(
  selectProfileEntities,
  (entities) => entities[profileId] || null
);

export const selectProfileLoading = createSelector(
  selectProfileState,
  (state) => state.loading
);

export const selectProfileError = createSelector(
  selectProfileState,
  (state) => state.error
);

export const selectProfileLastUpdated = createSelector(
  selectProfileState,
  (state) => state.lastUpdated
);

export const selectProfileTotal = createSelector(
  selectProfileState,
  (state) => state.ids.length
);

export const selectIsProfileStale = (maxAgeMs: number = 300000) => createSelector(
  selectProfileLastUpdated,
  (lastUpdated) => {
    if (!lastUpdated) return true;
    return Date.now() - lastUpdated > maxAgeMs;
  }
);

export const selectHasProfileError = createSelector(
  selectProfileError,
  (error) => error !== null
);

export const selectProfileErrorMessage = createSelector(
  selectProfileError,
  (error) => error
);

export const selectIsProfileLoading = createSelector(
  selectProfileLoading,
  (loading) => loading
);

export const selectProfileByUserId = (userId: string) => createSelector(
  selectAllProfiles,
  (profiles) => profiles.find(p => p.userId === userId) || null
);