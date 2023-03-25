<script lang="ts">
  export let variant: "primary" | "outline" | "text" = "text";
  export let onClick: (e: Event) => void = () => {
  };
  export let href: string = "";

  let onKeyPress = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      onClick(e);
    }
  };
</script>


{#if href !== ""}
  <a href={href} class={`slowback-button slowback-button__${variant}`}>
    <span class="slowback-button__inner">
      <slot />
    </span>
  </a>
{:else}
  <button on:click={onClick} on:keypress={onKeyPress} class={`slowback-button slowback-button__${variant}`}>
    <span class="slowback-button__inner">
      <slot />
    </span>
  </button>
{/if}

<style lang="scss">
  @import "../../style/index.scss";

  .slowback-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 20px;
    font-size: 1rem;
    font-weight: 500;
    line-height: 1.5;
    text-align: center;
    text-decoration: none;
    white-space: nowrap;
    vertical-align: middle;
    user-select: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    border: 1px solid transparent;
    text-transform: uppercase;


    &__primary {
      background-color: $gunmetal;
      color: $baby-powder;

      .slowback-button__inner {
        background-color: $vista-blue;
      }

      &:hover {
        background-color: darken($gunmetal, 5%);

        .slowback-button__inner {
          background-color: darken($vista-blue, 5%);
        }
      }

      &:focus-visible {
        outline: none;

        .slowback-button__inner {
          outline: 2px solid $burnt-sienna;
        }
      }

      &:active {
        .slowback-button__inner {
          transform: translateY(0);
        }
      }
    }

    &__outline {
      color: $gunmetal;
      background-color: $gunmetal;
      border-color: $gunmetal;

      .slowback-button__inner {
        background-color: $baby-powder;
        border-top: 1px solid $gunmetal;
      }

      &:hover {
        color: $baby-powder;

        .slowback-button__inner {
          background-color: $vista-blue;
          color: $baby-powder;
        }
      }

      &:focus-visible {
        outline: none;

        .slowback-button__inner {
          outline: 2px solid $burnt-sienna;
        }
      }

      &:active {
        .slowback-button__inner {
          transform: translateY(0);
        }
      }
    }

    &__text {
      color: $gunmetal;
      background-color: transparent;
      border-color: transparent;

      .slowback-button__inner {
        transform: translateY(0);
      }

      &:hover {
        background-color: $vista-blue;
        color: $baby-powder;
      }

      &:focus-visible {
        outline: none;

        .slowback-button__inner {
          outline: 2px solid $burnt-sienna;
        }
      }

      &:active {
        background-color: darken($vista-blue, 5%);
      }
    }

    &__inner {
      display: flex;
      align-items: center;
      justify-content: center;
      transform: translateY(-4px);
      width: 100%;
      height: 100%;
      padding: 0.5rem 2.5rem;
      margin: 0 -4px;
      border-radius: 20px;
    }
  }
</style>