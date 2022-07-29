<script lang="ts">
import QrScanner from "$lib/components/QRScanner.svelte";
import { updateWallet } from "$lib/api";
import { onMount } from "svelte";

let scanning = false;
let input: HTMLInputElement;
let amount: number = 0; 
let charging = false;

const onSuccesFn = async (decodedText: string) => {
  //send api request to update wallet
  if(!charging && !scanning){ //prevent double charging
    charging = true;
    const wallet = await updateWallet(decodedText, {amount});
    charging = false;
    scanning = false;
  }
};

$: if(input?.value) input.value = input?.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1')
</script>

{#if scanning}
<QrScanner {onSuccesFn}/>
{/if}

<div>
  <input type=number bind:value={amount} placeholder="Enter amount" bind:this={input}/>
  <button on:click={() => scanning = true}>Charge</button>
</div>

