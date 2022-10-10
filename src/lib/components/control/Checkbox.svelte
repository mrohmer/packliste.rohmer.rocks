<script lang="ts">
  export let checked = false;
  export let inputId = `checkbox-${(Math.random() * 1000).toFixed(0)}`;
</script>

<style lang="postcss">
    .checkbox {
        grid-template-columns: 30px auto;
    }
    .checkbox *::before,
    .checkbox *::after{
        @apply absolute;
        content: "";
    }

    label span::before {
        @apply h-0.5 w-2 -left-[27px] bg-primary rounded-sm transition-colors duration-300 top-0 bottom-0 my-auto;
    }
    label span::after {
       @apply h-1 w-1 top-2 -left-[25px] rounded-full;
    }

    input[type="checkbox"]::before,
    input[type="checkbox"]::after {
        @apply h-0.5 w-0 top-auto bg-primary rounded-sm;
    }

    .checkbox input[type="checkbox"]::before {
        @apply right-[60%] origin-bottom-right;
    }

    .checkbox input[type="checkbox"]::after {
        @apply left-[40%] origin-bottom-left;
    }

    .checkbox input[type="checkbox"]:checked::before {
        animation: check-01 .4s ease forwards;
    }

    .checkbox input[type="checkbox"]:checked::after {
        animation: check-02 .4s ease forwards;
    }

    .checkbox input[type="checkbox"]:checked + label {
        @apply text-[#C3C8DE];
        animation: move .3s ease .1s forwards;
    }

    .checkbox input[type="checkbox"]:checked + label span::before {
        @apply bg-[#C3C8DE];
        animation: slice .4s ease forwards;
    }

    .checkbox input[type="checkbox"]:checked + label span::after {
        animation: firework .5s ease forwards .1s;
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

<div class="checkbox w-full h-10 rounded-lg p-2.5 flex items-center mb-px">
    <div class="absolute top-0 left-0 right-0 bottom-0 w-full h-full cursor-pointer" on:click={() => checked = !checked}></div>
    <input id="{inputId}" type="checkbox" value="1" {checked} on:change class="h-4 w-4 border-0 mr-4 cursor-pointer grid items-center outline-[none] appearance-none">
    <label for="{inputId}" class="text-[#414856] cursor-pointer items-center transition-colors duration-300 flex-1">
        <span class="inline-block w-fit pr-1"><slot /></span>
    </label>
</div>
