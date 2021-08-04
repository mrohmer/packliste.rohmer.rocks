<script lang="ts">
  export let percentage = 0;
  export let max = 100;
  $: progressPath = (): string => {
    if (percentage <= 0) {
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

<style type="text/scss">
  @use 'src/styles/variables' as var;
  svg {
    fill: var(--progress-fill, transparent);
    height: 100%;
    position: absolute;
    stroke-linecap: var(--progress-linecap, round);
    width: 100%;
    left: 0;
    right: 0;
  }

  path {
    &:first-child {
      stroke: var(--progress-trackcolor, grey);
      stroke-width: var(--progress-trackwidth, 3px);
    }

    &:last-child {
      stroke: var(--progress-color, var.$primary);
      stroke-width: var(--progress-width, 3px);
    }
  }

  div {
    height: 100%;
    position: relative;
    width: 100%;
  }

  .label {
    left: 50%;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  .percent {
    font-size: 60%;
    vertical-align: top;
  }
</style>
<div>
    <svg viewBox="0 0 100 100">
        <path d="M50,5A45 45 0 1 1 49.9999 5"/>
        <path d="{progressPath()}"/>
    </svg>
    <div>
        <slot>
            <span class="label">{percentage.toFixed(0)}<span class="percent">%</span></span>
        </slot>
    </div>
</div>
