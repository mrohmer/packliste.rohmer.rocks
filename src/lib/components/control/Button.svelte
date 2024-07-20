<script lang="ts">
  import Icon from "./Icon.svelte";

  let klass: string;
  export let disabled = false
  export let variant: 'button' | 'icon' = 'button';
  export let xs = false;
  export let sm = false;
  export let lg = false;
  export let xl = false;

  export {klass as class};
</script>

<button on:click {disabled}
        class="btn dark:bg-zinc-700 dark:text-white {klass}"
        class:btn-xs={xs}
        class:btn-sm={sm}
        class:btn-lg={lg}
        class:btn-xl={xl}
>
    {#if variant === 'icon'}
        <Icon>
            <slot/>
        </Icon>
    {:else}
        <slot/>
    {/if}
</button>
