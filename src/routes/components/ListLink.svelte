<script lang="ts">
    import type {IList} from '$lib/model/list';
    import {onMount} from 'svelte';
    import type {Observable} from 'dexie';
    import {liveQuery} from 'dexie';
    import {getListStatus} from '$lib/db';
    import Icon from "$lib/components/control/Icon.svelte";

    export let list: IList;
    export let edited = false;

    let state: Observable<Record<'completed' | 'total', number>>;

    let mounted = false;

    onMount(() => mounted = true);

    $: {
      if (mounted && edited && list) {
        state = liveQuery(() => getListStatus(list))
      } else {
        state = undefined;
      }
    }
</script>

<a href="/{list.key}">
    <div class="flex items-center py-4 px-5 rounded-xl hover:bg-neutral-50">
        <div class="flex-1">
            <div class="font-semibold">{list.label}</div>
            <div class="text-neutral-500">
                {#if $state?.total > 0}
                    <span class="text-primary">{$state.completed}</span> von {$state.total} Aufgaben erledigt
                {:else if edited && $state?.total !== 0}
                    loading...
                {/if}
            </div>
        </div>
        <div class="pr-2">
            <Icon>chevron-right</Icon>
        </div>
    </div>

</a>
