<script lang="ts">
  import { icons } from "$lib/icons";

  export let icon: string;
</script>

<svelte:component this={icons[icon]} />