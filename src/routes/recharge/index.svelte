<script lang="ts">
import QrScanner from "$lib/components/QRScanner.svelte";
import { updateWallet } from "$lib/api";

const onSuccesFn = (decodedText: string) => {
  alert(`Code matched = ${decodedText}`);
  //send api request to update wallet
  updateWallet(decodedText, {amount: 10});
};

let amount: HTMLInputElement;
</script>

<QrScanner {onSuccesFn}/>

<input type="text" value="Amount" bind:this={amount}/>