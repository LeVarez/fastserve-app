<script lang="ts">
import QrScanner from "$lib/components/QRScanner.svelte";
import { updateWallet } from "$lib/api";
import { onMount } from "svelte";

const onSuccesFn = async (decodedText: string) => {
  alert(`Code matched = ${decodedText}`);
  //send api request to update wallet
  const wallet = await updateWallet(decodedText, {amount: 10});
  alert(`Wallet updated = ${wallet}`);
};

</script>

<QrScanner {onSuccesFn}/>
