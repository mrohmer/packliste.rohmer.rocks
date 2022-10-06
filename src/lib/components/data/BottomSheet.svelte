<script lang="ts">
  import {slide} from 'svelte/transition';
  import {writable} from 'svelte/store';
  import type {Writable} from 'svelte/store';
  import type {IList, IListItem} from '../../model/list';
  import CircleProgress from "../control/CircleProgress.svelte";
  import Icon from "../control/Icon.svelte";
  import Button from "../control/Button.svelte";

  export let list: Writable<IList> = writable({});

  let menuOpen = false;


  const reset = (map: (item: IListItem) => IListItem) => {
    const tmp = $list.groups.map(group => ({
      ...group,
      items: group.items.map(item => map(item)),
    }));

    list.set({
      ...($list as IList),
      groups: [...tmp],
    });
  }
  const onResetStateClick = () => reset(
    item => ({
      ...item,
      state: false,
    })
  )
  const onResetAllClick = () => reset(
    item => ({
      ...item,
      state: false,
      irrelevant: false,
    })
  )

  $: items = $list.groups.reduce((prev, curr) => [...prev, ...curr.items], []);
  $: relevantItems = items.filter(item => !item.irrelevant);
  $: doneItems = relevantItems.filter(item => item.state);

  $: hasStateChange = $list.groups.some(group => group.items.some(item => item.state));
  $: hasIrrelevantChange = $list.groups.some(group => group.items.some(item => item.irrelevant));
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

{#if hasStateChange}
    <div class="bottom-sheet" transition:slide|local>
        <div class="container bottom-sheet__container">
            <div class="bottom-sheet__percentage">
                <CircleProgress percentage="{(doneItems.length / relevantItems.length) * 100}"/>
            </div>
            <div class="bottom-sheet__progress">
                {doneItems.length} / {relevantItems.length}
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
                    <Button disabled="{!hasStateChange}" on:click={onResetStateClick}>
                        Auswahl zurücksetzen
                    </Button>
                </div>
                <div class="button">
                    <Button disabled="{!hasStateChange && !hasIrrelevantChange}" on:click={onResetAllClick}>
                        Alles zurücksetzen
                    </Button>
                </div>
            </div>
        {/if}
    </div>
{/if}
