<script lang="ts">
import type { Wallet } from "@prisma/client";


  export let wallet: Wallet;
</script>

{wallet.balance}