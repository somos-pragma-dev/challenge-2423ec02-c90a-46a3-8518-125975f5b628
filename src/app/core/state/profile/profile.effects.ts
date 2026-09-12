import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError, tap, switchMap } from 'rxjs/operators';
import { ProfileService } from '../../services/profile.service';
import * as ProfileActions from './profile.actions';
import { Profile } from '../../models/profile.model';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class ProfileEffects {
  private readonly actions$ = inject(Actions);
  private readonly profileService = inject(ProfileService);
  private readonly router = inject(Router);
  private readonly snackBar = inject(MatSnackBar);

  loadProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProfileActions.loadProfile),
      mergeMap(({ userId }) =>
        this.profileService.getProfile(userId).pipe(
          map((profile: Profile) => ProfileActions.loadProfileSuccess({ profile })),
          catchError((error) =>
            of(ProfileActions.loadProfileFailure({ error: error.message || 'Error al cargar el perfil' }))
          )
        )
      )
    )
  );

  updateProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProfileActions.updateProfile),
      mergeMap(({ profile }) =>
        this.profileService.updateProfile(profile).pipe(
          map((updatedProfile: Profile) => ProfileActions.updateProfileSuccess({ profile: updatedProfile })),
          catchError((error) =>
            of(ProfileActions.updateProfileFailure({ error: error.message || 'Error al actualizar el perfil' }))
          )
        )
      )
    )
  );

  updateProfileSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProfileActions.updateProfileSuccess),
        tap(({ profile }) => {
          this.snackBar.open('Perfil actualizado correctamente', 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
          });
        })
      ),
    { dispatch: false }
  );

  loadProfileFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProfileActions.loadProfileFailure),
        tap(({ error }) => {
          this.snackBar.open(error, 'Cerrar', {
            duration: 5000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: ['error-snackbar'],
          });
        })
      ),
    { dispatch: false }
  );

  navigateToProfile$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProfileActions.loadProfileSuccess),
        tap(({ profile }) => {
          if (profile?.id) {
            console.log(`Perfil cargado exitosamente para usuario: ${profile.id}`);
          }
        })
      ),
    { dispatch: false }
  );

  loadProfileByToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProfileActions.loadProfileByToken),
      switchMap(() =>
        this.profileService.getCurrentProfile().pipe(
          map((profile: Profile) => ProfileActions.loadProfileSuccess({ profile })),
          catchError((error) =>
            of(ProfileActions.loadProfileFailure({ error: error.message || 'Error al cargar el perfil actual' }))
          )
        )
      )
    )
  );

  clearProfile$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProfileActions.clearProfile),
        tap(() => {
          this.router.navigate(['/login']);
        })
      ),
    { dispatch: false }
  );

  retryProfileLoad$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProfileActions.retryProfileLoad),
      map(({ userId }) => ProfileActions.loadProfile({ userId }))
    )
  );

  validateProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProfileActions.validateProfile),
      mergeMap(({ profile }) =>
        this.profileService.validateProfile(profile).pipe(
          map((validationResult) =>
            ProfileActions.validateProfileSuccess({ validationResult })
          ),
          catchError((error) =>
            of(ProfileActions.validateProfileFailure({ error: error.message || 'Error al validar el perfil' }))
          )
        )
      )
    )
  );

  saveProfileDraft$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProfileActions.saveProfileDraft),
        tap(({ profile }) => {
          localStorage.setItem('profile_draft', JSON.stringify(profile));
        })
      ),
    { dispatch: false }
  );

  loadProfileDraft$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProfileActions.loadProfileDraft),
      map(() => {
        const draft = localStorage.getItem('profile_draft');
        if (draft) {
          return ProfileActions.loadProfileDraftSuccess({ draft: JSON.parse(draft) });
        }
        return ProfileActions.loadProfileDraftFailure({ error: 'No se encontró borrador guardado' });
      })
    )
  );
}