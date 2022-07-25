<script lang="ts">
  import QRScanner from "$lib/components/QRScanner.svelte";
  import start from "$lib/components/QRScanner.svelte";
  let qrReader = true;

  let amount = 10;

  let onSuccesFn = (decodedText: string) => {
    alert(`Code matched = ${decodedText}`);
  };
</script>

<div>
  <QRScanner {onSuccesFn}/>
</div>