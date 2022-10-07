<script lang="ts">
  import {slide} from 'svelte/transition';
  import type {IList} from '../../model/list';
  import CircleProgress from "../control/CircleProgress.svelte";
  import Icon from "../control/Icon.svelte";
  import Button from "../control/Button.svelte";
  import {db} from '../../db';
  import {onMount} from 'svelte';
  import type {Observable} from 'dexie';
  import {liveQuery} from 'dexie';

  export let list: IList;

  let menuOpen = false;

  const onResetStateClick = () =>
    db.items.where({listKey: list.key}).modify({state: false});
  const onResetAllClick = () =>
    db.items.where({listKey: list.key}).modify({state: false, irrelevant: false});

  let done: Observable<number>;
  let irrelevant: Observable<number>;
  let total: Observable<number>;
  let anyItemsChanged: Observable<boolean>;

  let mounted = false;
  onMount(() => (mounted = true));

  $: {
    if (mounted && list) {
      done = liveQuery(() =>
        db.items.where({listKey: list.key})
          .filter(({state, irrelevant}) => state && !irrelevant)
          .count()
      );
      total = liveQuery(async () => {
        const irrelevantItems = await db.items
          .where({listKey: list.key})
          .filter(({irrelevant}) => irrelevant)
          .toArray();
        const items = list?.groups?.reduce((prev, curr) => [...prev, ...curr.items], []) ?? [];

        const relevantItems = items.filter(({key}) => !irrelevantItems.some(({itemKey}) => itemKey === key));

        return relevantItems.length;
      });
      irrelevant = liveQuery(() => db.items.where({listKey: list.key}).filter(({irrelevant}) => irrelevant).count());
      anyItemsChanged = liveQuery(async () => {
          const count = await db.items
            .where({listKey: list.key})
            .and(({state, irrelevant}) => state || irrelevant)
            .count();
          return count > 0;
        }
      );
    }
    }
</script>

<style lang="scss">
  @use "sass:math" as math;

  .bottom-sheet {
    $height: 50px;
    $paddingVertical: 5px;
    padding: $paddingVertical 0 0;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: white;
    border-top: 1px solid #bbb;
    box-shadow: 0 0 10px 0 #bbb;

    .container {
      padding: 0 42px $paddingVertical;
    }

    &__container {
      display: flex;
      flex-direction: row;
    }

    &__percentage {
      height: $height - ($paddingVertical * 2);
      width: $height - ($paddingVertical * 2);
      margin-right: 10px;
    }

    &__progress {
      height: 100%;
      line-height: math.div($height - $paddingVertical * 2 - 10px, 2);
      flex: 1;
      font-size: 14px;
      padding: 5px 0;
    }

    &__menu-toggle {
      line-height: $height - $paddingVertical * 2;
      color: #999;
      padding: 0 10px;
      transition: 0.25s color linear;
      cursor: pointer;

      &--close {
        margin-right: -3px;
      }

      &:hover {
        color: #333;
      }
    }

    &__menu {
      margin-top: 15px;

      .button {
        width: calc(49.5% - 5px);
        margin-right: 5px;
        display: inline-block;
        vertical-align: top;

        @media (max-width: 500px) {
          width: 100%;
          margin-right: 0;
        }

        & :global(button) {
          width: 100%;
        }
      }
    }
  }
</style>

{#if $anyItemsChanged}
    <div class="bottom-sheet" transition:slide|local>
        <div class="container bottom-sheet__container">
            <div class="bottom-sheet__percentage">
                <CircleProgress percentage="{(($done ?? 0) / ($total ?? 0)) * 100}"/>
            </div>
            <div class="bottom-sheet__progress">
                {$done ?? 0} / {($total ?? 0)}
                <br>
                erledigt
            </div>
            <div class="bottom-sheet__menu-toggle" on:click={() => menuOpen = !menuOpen}
                 style="display: {menuOpen ? 'none' : ''}">
                <Icon>ellipsis-v</Icon>
            </div>
            <div class="bottom-sheet__menu-toggle bottom-sheet__menu-toggle--close"
                 on:click={() => menuOpen = !menuOpen}
                 style="display: {!menuOpen ? 'none' : ''}">
                <Icon>times</Icon>
            </div>
        </div>
        {#if menuOpen}
            <div class="container bottom-sheet__menu" transition:slide|local>
                <div class="button">
                    <Button disabled="{!$done}" on:click={onResetStateClick}>
                        Auswahl zurücksetzen
                    </Button>
                </div>
                <div class="button">
                    <Button disabled="{!$done && !$irrelevant}" on:click={onResetAllClick}>
                        Alles zurücksetzen
                    </Button>
                </div>
            </div>
        {/if}
    </div>
{/if}
