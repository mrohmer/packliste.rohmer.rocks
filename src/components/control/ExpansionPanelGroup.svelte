<script lang="ts">
  import {setContext} from 'svelte'

  type Panel = {close: () => void};

  const panels = new Set<Panel>();

  export let multipleOpen = false;

  setContext('expansion-panel-group', {
    addPanel: (panel: Panel) => panels.add(panel),
    removePanel: (panel: Panel) => panels.delete(panel),
    openPanel: (panel: Panel) => !multipleOpen && panels
      .forEach((p: Panel) => p !== panel && p.close()),
  });
</script>

<slot />
