<script lang="ts">
  import SlowbackButton from "./SlowbackButton.svelte";

  export let variant: "primary" | "outline" | "text" = "primary";
</script>

<SlowbackButton variant={variant}>
  button
</SlowbackButton>
