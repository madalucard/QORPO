import { Injectable } from '@angular/core';
import { ethers } from 'ethers';
import { MetaMaskInpageProvider } from '@metamask/providers';

declare global {
  interface Window {
    ethereum: MetaMaskInpageProvider;
  }
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}
  public accounts: string[] = [];
  async connectWallet(): Promise<void> {
    if (typeof window !== 'undefined' && window.ethereum) {
      try {
        // Request account access from MetaMask
        this.accounts = (await window.ethereum.request({
          method: 'eth_requestAccounts',
        })) as string[];
        console.log('Service - Account:', this.accounts[0]);
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
}
