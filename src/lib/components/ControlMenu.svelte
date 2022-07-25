<script lang="ts">
	import { session } from '$app/stores';
  import BurgerMenu from 'svelte-burger-menu';

	let rol = $session.user.role;
	let menuOptions = generateMenuOptions();
  let navOpen = false;

  const onClickFn = () => {
    navOpen = !navOpen;
  };

	function generateMenuOptions() {
		let menuOptions = ['BALANCE', 'REGENERATE QR CODE'];

		if (rol === 'SELLER' || rol === 'ADMIN') menuOptions.push('SELL');
		if (rol === 'BALANCE_RECHARGER' || rol === 'ADMIN') menuOptions.push('RECHARGE');
		if (rol === 'ADMIN') menuOptions.push('CONTROL');

		return menuOptions;
	}
</script>

<BurgerMenu>
  {#each menuOptions as option}
    <h2>{option}</h2>
  {/each}
</BurgerMenu>



<style lang="stylus">
	:global(#container){
		background-color: #BE1E2D !important;
		color: #fcfcfc !important;
	}
</style>
