import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { WalletComponent } from './components/wallet/wallet.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'wallet', component: WalletComponent },
  { path: '**', redirectTo: '' },
];
