<script lang="ts">
  import {createEventDispatcher} from 'svelte';
  import SwipeActionIndicator from "$lib/components/control/swipe/SwipeActionIndicator.svelte";
  import type {Color} from './SwipeActionIndicator.svelte';
  import {pan} from '$lib/actions/hammer';

  export let leftDisabled = false;
  export let rightDisabled = false;
  export let threshold = 75;
  export let rightColor: Color = 'gray';
  export let leftColor: Color = 'gray';

  let transform = 0;
  let panning = false;
  let preventClicks = false;

  const dispatch = createEventDispatcher();

  const dispatchLeft = () => !leftDisabled && dispatch('left');
  const dispatchRight = () => !rightDisabled && dispatch('right');

  const updatePosition = (delta: number) => {
    let tmp = Math.sign(delta) * Math.min(Math.abs(delta), threshold);

    if (!hasLeft) {
      tmp = Math.min(tmp, 0);
    }
    if (!hasRight) {
      tmp = Math.max(tmp, 0);
    }

    transform = tmp;
  };

  const preventClick = event => {
    if (panning) {
      event.preventDefault();
      return false;
    }
  }
  const onPanStart = () => {
    panning = true;
    setTimeout(() => preventClicks = true, 50);
  }
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
    setTimeout(() => preventClicks = false, 50);
  }
  const onPan = (event) => {
    const {deltaX} = event.detail;
    updatePosition(deltaX);
  };

  $: hasLeft = !leftDisabled && $$slots.left;
  $: hasRight = !leftDisabled && $$slots.right;

</script>

<div class="overflow-hidden"
     use:pan
     on:panleft={onPan}
     on:panright={onPan}
     on:panstart={onPanStart}
     on:panend={onPanEnd}
     on:click={preventClick}
>
    <div class:transition-all={!panning} class:pointer-events-none={preventClicks} style="margin-left: {transform}px">
        <slot/>
    </div>
    {#if hasLeft}
        <SwipeActionIndicator side="left" {threshold} {transform} {panning} color={leftColor}
        >
            <slot name="left"/>
        </SwipeActionIndicator>
    {/if}
    {#if hasRight}
        <SwipeActionIndicator side="right" {threshold} {transform} {panning} color={rightColor}
        >
            <slot name="right"/>
        </SwipeActionIndicator>
    {/if}
</div>
