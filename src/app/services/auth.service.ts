import { Injectable } from '@angular/core';
import { ethers, formatEther } from 'ethers';
import { MetaMaskInpageProvider } from '@metamask/providers';
import { Router } from '@angular/router';

declare global {
  interface Window {
    ethereum: MetaMaskInpageProvider;
  }
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router) {}

  public provider: ethers.BrowserProvider | undefined;
  private actualAccount: string = '';

  getAccount() {
    return this.actualAccount;
  }

  setAccount(accounts: string[]) {
    if (accounts.length === 0) {
      this.router.navigate(['/']);
    } else {
      this.actualAccount = accounts[0];
    }
  }

  async connectWallet(): Promise<void> {
    if (typeof window !== 'undefined' && window.ethereum) {
      try {
        // Request account access from MetaMask

        this.provider = new ethers.BrowserProvider(window.ethereum);
        let allAccounts = (await window.ethereum.request({
          method: 'eth_requestAccounts',
        })) as string[];

        this.setAccount(allAccounts);
        console.log('Service - Account:', this.getAccount());

        this.setupEventListeners();
      } catch (e) {
        if (e instanceof Error) {
          console.error('Error connecting wallet:', e.message);
        } else {
          console.error('Unknown error:', e);
        }
        throw e; // Rethrow the error to handle it in the component if needed
      }
    } else {
      console.error('MetaMask is not installed or not available.');
      throw new Error('MetaMask is not installed or not available.');
    }
  }

  private setupEventListeners(): void {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts: string[] | any) => {
        if (accounts.length === 0) {
          // User has disconnected their MetaMask
          console.log('MetaMask disconnected');
          this.router.navigate(['/']);
        } else {
          this.actualAccount = accounts;
        }
        88883;
      });

      window.ethereum.on('chainChanged', () => {
        // Reload the page on chain change if necessary
        window.location.reload();
      });
    }
  }
  async getBalanceFromWallet(): Promise<number> {
    if (!this.provider || this.actualAccount.length === 0) {
      throw new Error('Provider is not initialized or no accounts connected');
    }

    try {
      const balance = await this.provider.getBalance(this.actualAccount);
      // const balance = await this.provider.getBalance('ethers.eth');
      return parseFloat(ethers.formatEther(balance));
    } catch (e) {
      if (e instanceof Error) {
        console.error('Error getting balance from wallet:', e.message);
      } else {
        console.error('Unknown error:', e);
      }
      throw e;
    }
  }

  ngOnDestroy(): void {
    // Cleanup event listeners to avoid memory leaks
    if (window.ethereum) {
      window.ethereum.removeListener(
        'accountsChanged',
        this.setupEventListeners
      );
      window.ethereum.removeListener('chainChanged', this.setupEventListeners);
    }
  }
}
