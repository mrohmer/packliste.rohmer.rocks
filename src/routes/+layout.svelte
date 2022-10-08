<script lang="ts">
  import "../app.pcss";
  import PoweredBy from "@rohmer/svelte-base/PoweredBy.svelte";

  const name = 'Matthias Rohmer';
  const url = 'https://matthias.rohmer.rocks';
  const technologies = ['svelte', 'netlify'];
  const sourceCodeUrl = 'https://github.com/mrohmer/packing.rohmer.rocks';
</script>

<style lang="postcss">
    .content {
        @apply pb-20 px-2.5;
        min-height: calc(100vh - 120px);
    }
</style>

<main class="max-w-4xl mx-auto">
    <div class="content">
        <slot />
    </div>
    <PoweredBy {name} {url} {technologies} {sourceCodeUrl} />
</main>
