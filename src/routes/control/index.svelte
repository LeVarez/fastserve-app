<script lang="ts">
  import QRScanner from "$lib/components/QRScanner.svelte";

  let onSuccesFn = (decodedText: string) => {
    alert(`Code matched = ${decodedText}`);
  };
</script>

<div>
  <QRScanner {onSuccesFn}/>
</div>