<script lang="ts">
  import {createEventDispatcher} from 'svelte';
  import SwipeActionIndicator from "$lib/components/control/swipe/SwipeActionIndicator.svelte";
  import type {Color} from './SwipeActionIndicator.svelte';

  export let leftDisabled = false;
  export let rightDisabled = false;
  export let threshold = 75;
  export let rightColor: Color = 'gray';
  export let leftColor: Color = 'gray';

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

<div class="overflow-hidden"
     use:swipe
     on:panleft={onPanRight}
     on:panright={onPanLeft}
     on:panstart={onPanStart}
     on:panend={onPanEnd}
     on:click={preventClick}
>
    <div class:transition-all={!panning} style="margin-left: {transform}px">
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
