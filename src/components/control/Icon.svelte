<script lang="ts">
  import "@fortawesome/fontawesome-free/js/all"

  let slotObj: HTMLSpanElement;

  $: icon = slotObj?.textContent;
</script>

<i class="fa fa-{icon}"></i>

<span style="display: none" bind:this={slotObj}><slot/></span>

