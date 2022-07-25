/// <reference types="@sveltejs/kit" />

declare namespace App {
	export interface Session {
    user: {
      id: number;
      email: string;
      name: string;
      img: string;
      role: 'ADMIN' | 'USER' | 'SELLER' | 'BALANCE_RECHARGER';
    }
  }
}