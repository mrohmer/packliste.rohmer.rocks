<script lang="ts">
  import "../app.pcss";
  import {doubleTap} from '$lib/actions/hammer';
  import {slide} from 'svelte/transition';
  import {dev} from '$app/environment';
  import ThemeSwitch from "$lib/components/control/ThemeSwitch.svelte";

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
    <div use:doubleTap on:doubletap={() => showAdminLink = true} class="text-center text-sm">
        <div>
            Made with ❤, {technologies.join(' & ')} by <a target="_blank" href="https://matthias.rohmer.rocks">Matthias Rohmer</a>
        </div>
        <div>
            View the source code on <a target="_blank" href={sourceCodeUrl}>Github</a>
        </div>
    </div>
    {#if showAdminLink}
        <div class="flex justify-center my-6 text-neutral-400 text-sm lowercase" transition:slide|local>
            <a href="/admin{dev ? '/index.html' : ''}" target="_blank">Admin Bereich</a>
        </div>
    {/if}
    <div class="mt-6">
        <ThemeSwitch />
    </div>
    <div class="flex justify-center space-x-3.5 mt-8 mb-20 text-neutral-400 text-sm lowercase">
        <div>
            <a href="/impressum" class=" transition-colors hover:underline hover:text-neutral-600 dark:hover:text-neutral-200">Impressum</a>
        </div>
        <div>|</div>
        <div>
            <a href="/datenschutz" class="transition-colors hover:underline hover:text-neutral-600 dark:hover:text-neutral-200">Datenschutz</a>
        </div>
    </div>
</footer>
