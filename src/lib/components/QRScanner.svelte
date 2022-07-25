<script lang="ts">
  import { Html5Qrcode } from 'html5-qrcode';
  import { onMount } from 'svelte';

  export let onSuccesFn: (decodedText: string) => void;
  let scanning = false;
  let html5Qrcode: Html5Qrcode;

  const init = () => {
      html5Qrcode = new Html5Qrcode('reader');
      
      start();
  }
  
  const start = () => {
      html5Qrcode.start(
          { facingMode: 'environment' },
          {
              fps: 10,
              qrbox: { width: 250, height: 250 },
          },
          onSuccesFn,
          onScanFailure
      );
      scanning = true;
  }

  const stop = async (): Promise<void> => {
      await html5Qrcode.stop();
      scanning = false;
  }

  const onScanFailure = (error: string): void => {
      console.warn(`Code scan failure = ${error}`);
  }

  onMount(init);
</script>

<style>
  main {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 20px;
  }
  reader {
      width: 100%;
      min-height: 500px;
      background-color: black;
  }
</style>

<main>
  <reader id="reader"/>
  {#if scanning}
      <button on:click={stop}>stop</button>
  {:else}
      <button on:click={start}>start</button>
  {/if}
</main>