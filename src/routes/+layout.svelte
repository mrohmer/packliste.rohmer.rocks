<script lang="ts">
  import "../app.pcss";
  import PoweredBy from "@rohmer/svelte-base/PoweredBy.svelte";
  import {doubleTap} from '$lib/actions/hammer';  import {slide} from 'svelte/transition';
  import {dev} from '$app/environment';


  const name = 'Matthias Rohmer';
  const url = 'https://matthias.rohmer.rocks';
  const technologies = ['svelte', 'netlify'];
  const sourceCodeUrl = 'https://github.com/mrohmer/packing.rohmer.rocks';

  let showAdminLink = false;
</script>

<style lang="postcss">
    .content {
        @apply pb-20 px-2.5;
        min-height: calc(100vh - 120px);
    }
</style>

<main class="max-w-4xl mx-auto">
    <div class="content">
        <slot/>
    </div>
</main>
<footer class="max-w-4xl mx-auto">
    <div use:doubleTap on:doubletap={() => showAdminLink = true}>
        <PoweredBy {name} {url} {technologies} {sourceCodeUrl}/>
    </div>
    {#if showAdminLink}
        <div class="flex justify-center my-6 text-neutral-400 text-sm lowercase" transition:slide|local>
            <a href="/admin{dev ? '/index.html' : ''}" target="_blank">Admin Bereich</a>
        </div>
    {/if}
    <div class="flex justify-center space-x-3.5 mt-6 mb-20 text-neutral-400 text-sm lowercase">
        <div>
            <a href="/impressum" class=" transition-colors hover:underline hover:text-neutral-600">Impressum</a>
        </div>
        <div>|</div>
        <div>
            <a href="/datenschutz" class="transition-colors hover:underline hover:text-neutral-600">Datenschutz</a>
        </div>
    </div>
</footer>
