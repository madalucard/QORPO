import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TruncatePipe } from '../../pipes/truncate.pipe';

@Component({
  selector: 'app-wallet',
  standalone: true,
  imports: [CommonModule, TruncatePipe],
  templateUrl: './wallet.component.html',
  styleUrl: './wallet.component.scss',
})
export class WalletComponent {
  constructor(private authService: AuthService, private router: Router) {}

  private balance: number = 0;
  public address: string = '';
  async ngOnInit() {
    this.setBalance(await this.authService.getBalanceFromWallet());
    this.address = this.authService.getAccount();
  }

  getBalance() {
    return this.balance;
  }

  setBalance(balance: number) {
    this.balance = balance;
  }
  disconnectWallet() {
    this.router.navigate(['']);
  }
}
