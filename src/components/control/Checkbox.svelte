<script lang="ts">
    export let checked = false;
    export let inputId = `checkbox-${(Math.random() * 1000).toFixed(0)}`
</script>

<style type="text/scss">
    @use 'src/styles/variables' as var;
  .checkbox {
    $background: #ffffff;
    $text: #414856;
    $check: var.$primary;
    $disabled: #C3C8DE;
    $width: 100%;
    $height: 40px;
    $border-radius: 10px;
    width: $width;
    height: $height;
    border-radius: $border-radius;
    position: relative;
    padding: 10px;
    display: grid;
    grid-template-columns: 30px auto;
    align-items: center;
    box-sizing: border-box;


    label {
      color: $text;
      position: relative;
      cursor: pointer;
      display: grid;
      align-items: center;
      width: fit-content;
      transition: color .3s ease;
      &::before,
      &::after {
        content:"";
        position: absolute;
      }
      &::before {
        height: 2px;
        width: 8px;
        left: -27px;
        background: $check;
        border-radius: 2px;
        transition: background .3s ease;
      }
      &:after {
        height: 4px;
        width: 4px;
        top: 8px;
        left: -25px;
        border-radius: 50%;
      }
    }
    input[type="checkbox"] {
      -webkit-appearance: none;
      -moz-appearance: none;
      position: relative;
      height: 15px;
      width: 15px;
      outline: none;
      border: 0;
      margin: 0 15px 0 0;
      cursor: pointer;
      display: grid;
      align-items: center;
      &::before,
      &::after {
        content:"";
        position: absolute;
        height: 2px;
        top: auto;
        background: $check;
        border-radius: 2px;
      }
      &::before {
        width: 0px;
        right: 60%;
        transform-origin: right bottom;
      }
      &::after {
        width: 0px;
        left: 40%;
        transform-origin: left bottom;
      }
      &:checked {
        &::before {
          animation: check-01 .4s ease forwards;
        }
        &::after {
          animation: check-02 .4s ease forwards;
        }
        + label {
          color: $disabled;
          animation: move .3s ease .1s forwards;
          &::before {
            background: $disabled;
            animation: slice .4s ease forwards;
          }
          &::after {
            animation: firework .5s ease forwards .1s;
          }
        }
      }
    }
  }

  @keyframes move {
    50% {
      padding-left: 8px;
      padding-right: 0px;
    }
    100% {
      padding-right: 4px;
    }
  }
  @keyframes slice {
    60% {
      width: 100%;
      left: 4px;
    }
    100% {
      width: 100%;
      left: -2px;
      padding-left: 0;
    }
  }
  @keyframes check-01 {
    0% {
      width: 4px;
      top: auto;
      transform: rotate(0);
    }
    50% {
      width: 0px;
      top: auto;
      transform: rotate(0);
    }
    51% {
      width: 0px;
      top: 8px;
      transform: rotate(45deg);
    }
    100% {
      width: 5px;
      top: 8px;
      transform: rotate(45deg);
    }
  }
  @keyframes check-02 {
    0% {
      width: 4px;
      top: auto;
      transform: rotate(0);
    }
    50% {
      width: 0px;
      top: auto;
      transform: rotate(0);
    }
    51% {
      width: 0px;
      top: 8px;
      transform: rotate(-45deg);
    }
    100% {
      width: 10px;
      top: 8px;
      transform: rotate(-45deg);
    }
  }
  @keyframes firework {
    0% {
      opacity: 1;
      box-shadow: 0 0 0 -2px #4F29F0, 0 0 0 -2px #4F29F0, 0 0 0 -2px #4F29F0, 0 0 0 -2px #4F29F0, 0 0 0 -2px #4F29F0, 0 0 0 -2px #4F29F0;
    }
    30% {
      opacity: 1;
    }
    100% {
      opacity: 0;
      box-shadow: 0 -15px 0 0px #4F29F0, 14px -8px 0 0px #4F29F0, 14px 8px 0 0px #4F29F0, 0 15px 0 0px #4F29F0, -14px 8px 0 0px #4F29F0, -14px -8px 0 0px #4F29F0;
    }
  }
</style>

<div class="checkbox">
    <input id="{inputId}" type="checkbox" value="1" {checked} on:change>
    <label for="{inputId}">
        <slot/>
    </label>
</div>
