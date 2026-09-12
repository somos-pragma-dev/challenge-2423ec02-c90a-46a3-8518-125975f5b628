import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadComponent: () => 
      import('./features/dashboard/dashboard.component').then(
        m => m.DashboardComponent
      ),
    data: {
      title: 'Panel Principal',
      requiresAuth: true,
      breadcrumb: 'Panel Principal'
    }
  },
  {
    path: 'perfil',
    loadComponent: () => 
      import('./features/profile/profile.component').then(
        m => m.ProfileComponent
      ),
    data: {
      title: 'Mi Perfil',
      requiresAuth: true,
      breadcrumb: 'Mi Perfil'
    }
  },
  {
    path: 'transacciones',
    loadComponent: () => 
      import('./features/transactions/transactions.component').then(
        m => m.TransactionsComponent
      ),
    data: {
      title: 'Mis Transacciones',
      requiresAuth: true,
      breadcrumb: 'Transacciones'
    }
  },
  {
    path: 'transacciones/:id',
    loadComponent: () => 
      import('./features/transaction-detail/transaction-detail.component').then(
        m => m.TransactionDetailComponent
      ),
    data: {
      title: 'Detalle de Transacción',
      requiresAuth: true,
      breadcrumb: 'Detalle'
    }
  },
  {
    path: 'configuracion',
    loadComponent: () => 
      import('./features/settings/settings.component').then(
        m => m.SettingsComponent
      ),
    data: {
      title: 'Configuración',
      requiresAuth: true,
      breadcrumb: 'Configuración'
    }
  },
  {
    path: 'ayuda',
    loadComponent: () => 
      import('./features/help/help.component').then(
        m => m.HelpComponent
      ),
    data: {
      title: 'Ayuda',
      requiresAuth: false,
      breadcrumb: 'Ayuda'
    }
  },
  {
    path: 'login',
    loadComponent: () => 
      import('./features/auth/login/login.component').then(
        m => m.LoginComponent
      ),
    data: {
      title: 'Iniciar Sesión',
      requiresAuth: false,
      breadcrumb: 'Iniciar Sesión'
    }
  },
  {
    path: 'registro',
    loadComponent: () => 
      import('./features/auth/register/register.component').then(
        m => m.RegisterComponent
      ),
    data: {
      title: 'Registrarse',
      requiresAuth: false,
      breadcrumb: 'Registrarse'
    }
  },
  {
    path: 'recuperar-password',
    loadComponent: () => 
      import('./features/auth/recover-password/recover-password.component').then(
        m => m.RecoverPasswordComponent
      ),
    data: {
      title: 'Recuperar Contraseña',
      requiresAuth: false,
      breadcrumb: 'Recuperar Contraseña'
    }
  },
  {
    path: 'error-404',
    loadComponent: () => 
      import('./features/errors/not-found/not-found.component').then(
        m => m.NotFoundComponent
      ),
    data: {
      title: 'Página No Encontrada',
      requiresAuth: false
    }
  },
  {
    path: 'error-500',
    loadComponent: () => 
      import('./features/errors/server-error/server-error.component').then(
        m => m.ServerErrorComponent
      ),
    data: {
      title: 'Error del Servidor',
      requiresAuth: false
    }
  },
  {
    path: '**',
    redirectTo: 'error-404'
  }
];