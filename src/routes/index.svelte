<script lang="ts">
  import { session } from "$app/stores";
import Icon from "$lib/components/generic/Icon.svelte";
  import QrGenerator from "$lib/components/QRGenerator.svelte";
  import type { Wallet } from "@prisma/client";

  export let wallet: Wallet;
</script>

{#if $session.user}
  <div class="main-page-container">
    <div class="qr-container">
      <QrGenerator codeValue={wallet?.id}/>
    </div>
    <div class="background-logged">
      <Icon icon='fmlogo'/>
    </div>
  </div>
 
{:else}
  <div class="main-page-container">
    <div class="background">
      <Icon icon='fmlogo'/>
    </div>
  </div>
{/if}


<style lang="stylus">
  .main-page-container{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 90vh;
    width: 100%;
    gap: 20px;
    .background-logged{
      overflow: hidden;
      width: 200px;
      height: 200px;
    }
  }
  .background{
    width: 50vh;
  }
</style>