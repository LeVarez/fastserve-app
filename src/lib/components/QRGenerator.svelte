<script lang="ts">
  import { onMount } from 'svelte';
  import QRCode from 'qrcode';
	
	export let codeValue: string;

	let canvas: HTMLCanvasElement;
  
  onMount(() => {
    QRCode.toDataURL(
      canvas, 
      codeValue,
      { scale: 10 },
      function (error) {
        if (error) console.error(error)
        console.log('success!');
      }
    );
  });
</script>
<div class="container">
  <canvas bind:this={canvas}/>
</div>

<style lang="stylus">
  .container {
    width: inherit;
    height: inherit;
    overflow: hidden;
    & canvas {
      width: 100% !important; 
      height: 100% !important;
    }
  }
</style>
