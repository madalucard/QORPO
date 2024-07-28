import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ButtonModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router) {}
  public account: string | null = null; // To hold the connected account
  public errorMessage: string | null = null; // To display error messages

  async connectWallet() {
    try {
      await this.authService.connectWallet();
      // Update the account property if the connection is successful
      this.account = this.authService.getAccount() || null;
      this.errorMessage = null; // Clear any previous errors

      if (this.account) {
        this.router.navigate(['/wallet']);
      }

      console.log('Client - Account', this.account);
    } catch (error) {
      if (error instanceof Error) {
        this.errorMessage = `Error connecting wallet: ${error.message}`;
      } else {
        this.errorMessage = 'Unknown error occurred.';
      }
      console.error('Error connecting wallet:', error);
    }
  }
}
