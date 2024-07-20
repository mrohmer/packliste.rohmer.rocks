<script lang="ts">
  export let percentage = 0;
  export let max = 100;
  export let disabled = false;
  $: progressPath = (): string => {
    if (!percentage || percentage < 0) {
      return "";
    } else if (percentage >= max) {
      return "M50,5A45 45 0 1 1 49.9999 5";
    } else {
      const angle = Math.PI * 2 * (percentage / max);
      const x = 50 + Math.cos(angle - Math.PI / 2) * 45;
      const y = 50 + Math.sin(angle - Math.PI / 2) * 45;
      let path = "M50,5";
      if (angle > Math.PI) {
        path += "A45 45 0 0 1 50 95";
      }
      path += `A45 45 0 0 1 ${x} ${y}`;
      return path;
    }
  };
</script>


<div class="h-full w-full grayscale">
    <svg viewBox="0 0 100 100" class="fill-transparent h-full absolute w-full left-0 right-0">
        <path d="M50,5A45 45 0 1 1 49.9999 5" class="stroke-gray-400 stroke-2"/>
        <path d="{progressPath()}" class="stroke-primary stroke-2"/>
    </svg>
    <div class="h-full w-full">
        <slot>
            <span class="absolute left-1/2 top-1/2 -translate-x-2/4 -translate-y-2/4">{percentage.toFixed(0)}<span class="text-gray-400 font-light">%</span></span>
        </slot>
    </div>
</div>
