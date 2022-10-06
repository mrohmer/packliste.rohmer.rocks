<script lang="ts">
  import {createEventDispatcher} from 'svelte';

  export let leftDisabled = false;
  export let rightDisabled = false;
  export let threshold = 75;

  let transform = 0;
  let panning = false;

  const swipe = async (node: HTMLElement) => {
    if (typeof window === 'undefined') {
      return;
    }
    const events: Array<string> = [
      'panleft',
      'panright',
      'panstart',
      'panend',
    ];

    const {default: Hammer} = await import('hammerjs');

    const hammer = new Hammer(node);
    for (const event of events) {
      hammer.on(event, (ev: any) => node.dispatchEvent(new CustomEvent(event, { detail: ev })));
    }
  }

  const dispatch = createEventDispatcher();

  const dispatchLeft = () => !leftDisabled && dispatch('left');
  const dispatchRight = () => !rightDisabled && dispatch('right');

  const updatePosition = (delta: number) => {
    transform = Math.sign(delta) * Math.min(Math.abs(delta), threshold);
  };

  const preventClick = event => {
    if (panning) {
      event.preventDefault();
      return false;
    }
  }
  const onPanStart = () => panning = true;
  const onPanEnd = (event) => {
    panning = false;
    const {deltaX} = event.detail;

    if (Math.abs(deltaX) >= threshold) {
      const direction = deltaX > 0 ? 'left' : 'right';
      if (direction === 'left' && hasLeft) {
        dispatchLeft();
      }
      if (direction === 'right' && hasRight) {
        dispatchRight();
      }
    }

    setTimeout(() => transform = 0, 100);
  }
  const onPanRight = (event) => {
    const {deltaX} = event.detail;
    if (!hasRight) {
      return;
    }
    updatePosition(deltaX);
  };
  const onPanLeft = (event) => {
    const {deltaX} = event.detail;
    if (!hasLeft) {
      return;
    }
    updatePosition(deltaX);
  };

  $: hasLeft = !leftDisabled && $$slots.left;
  $: hasRight = !leftDisabled && $$slots.right;

</script>

<style type="text/scss">
  .swipe {
    $this: &;
    $animationLength: 0.2s;
    $animationFunction: ease;
    position: relative;
    overflow: hidden;

    &--animated &__default {
      transition: $animationLength margin-left $animationFunction;
    }
    &__action {
      $width: 100px;
      $borderRadius: 3px;
      position: absolute;
      top: 0;
      bottom: 0;
      width: $width;
      background: #dddddd;
      text-align: center;

      #{$this}--animated & {
        transition: $animationLength left $animationFunction;
      }
      &--left {
        border-top-right-radius: $borderRadius;
        border-bottom-right-radius: $borderRadius;
      }
      &--right {
        border-top-left-radius: $borderRadius;
        border-bottom-left-radius: $borderRadius;
      }
    }

  }
</style>

<div class="swipe" class:swipe--animated={!panning}
     use:swipe
     on:panleft={onPanRight}
     on:panright={onPanLeft}
     on:panstart={onPanStart}
     on:panend={onPanEnd}
     on:click={preventClick}
>
    <div class="swipe__default" style="margin-left: {transform}px">
        <slot/>
    </div>
    {#if hasLeft}
        <div class="swipe__action swipe__action--left" style="width: {threshold}px; left: -{threshold - transform}px;">
            <slot name="left"/>
        </div>
    {/if}
    {#if hasRight}
        <div class="swipe__action swipe__action--right" style="width: {threshold}px; left: calc(100% + {transform}px);">
            <slot name="right"/>
        </div>
    {/if}
</div>
