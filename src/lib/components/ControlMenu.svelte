<script lang="ts" context="module">
	export interface MenuOption{
		icon?: string;
		label: string;
		route: string;
	}
</script>
<script lang="ts">
	import { session } from '$app/stores';
  import BurgerMenu from 'svelte-burger-menu';

	let rol = $session.user.role;
	let menuOptions: MenuOption[] = generateMenuOptions();
  let navOpen = false;

	function generateMenuOptions() {
		let menuOptions: MenuOption[] = [{label: 'balance', route: '/balance' }, { label: 'regenerate QR', route: '/wallet/remake' }];

		if (rol === 'SELLER' || rol === 'ADMIN') menuOptions.push({label: 'sell', route: '/sell' });
		if (rol === 'BALANCE_RECHARGER' || rol === 'ADMIN') menuOptions.push({label: 'recharge', route: '/recharge' });
		if (rol === 'ADMIN') menuOptions.push({label: 'control', route: '/control' });

		return menuOptions;
	}
</script>

<BurgerMenu>
  {#each menuOptions as option}
    <h2><a href={option.route}>{option.label}</a></h2>
  {/each}
</BurgerMenu>



<style lang="stylus">
	:global(#container){
		z-index: 1;
		background-color: #BE1E2D !important;
		color: #fcfcfc !important;
	}
</style>
