<script lang="ts">
  import {slide} from 'svelte/transition';
  import {createEventDispatcher, getContext, onMount} from 'svelte';

  export let open = false;
  export let disabled = false;

  const dispatch = createEventDispatcher();

  export const close = () => toggleOpen(false);
  const toggleOpen = (force?: boolean) => {
    if (disabled) {
      return;
    }
    if (typeof force !== 'boolean') {
      return toggleOpen(!open)
    }
    if (open === force) {
      return;
    }
    open = force;
    dispatch('toggle', {open});
    dispatch(open ? 'open' : 'close', {open});
    if (open) {
      openPanel(thisPanel);
    }
  };

  const context = getContext('expansion-panel-group');
  const addPanel = context?.addPanel ?? ((a: any) => undefined);
  const removePanel = context?.removePanel ?? ((a: any) => undefined);
  const openPanel = context?.openPanel ?? ((a: any) => undefined);
  const thisPanel = {close};


  onMount(() => {
    addPanel(thisPanel)
    return () => removePanel(thisPanel);
  })
</script>

<style lang="scss">
  .panel {
    $this: &;

    border-bottom: 1px solid #dfdfdf;

    &__header {
      display: flex;
      width: 100%;
      cursor: pointer;
      background: none;
      line-height: 1;
      border: none;
      outline: none;
      margin: 0;
      padding: 12px 24px;
      text-align: left;
      outline: none;

      &:active {
        background: none;
      }

      span {
        flex: 1;
        line-height: 24px;
      }
    }

    &__icon {
      line-height: 0.5;
      transition: 0.25s linear;

      #{$this}--active & {
        transform: rotate(180deg);
      }
      #{$this}--disabled & {
        opacity: 0.5;
      }
    }

    &__content {
      margin: 0;
      padding: 0 24px 16px;
    }
  }
</style>

<div class="panel" class:panel--active={open && !disabled} class:panel--disabled={disabled}>
    <button
            class="panel__header"
            class:panel__header--empty={$$slots.header}
            on:click={() => toggleOpen()}
    >
        <span>
            <slot name="header"/>
        </span>
        <i class="panel__icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"/>
            </svg>
        </i>
    </button>

    {#if open && !disabled}
        <div class="panel__content" transition:slide|local>
            <slot/>
        </div>
    {/if}
</div>
