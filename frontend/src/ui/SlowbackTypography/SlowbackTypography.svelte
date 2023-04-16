<script lang="ts">
    export let text: string = "";
    export let variant: "h1" | "h2" | "paragraph" | "link" | "caption" | "label" = "paragraph";
    export let href: string = "";

</script>

{#if variant === "link"}
 <a class="slowback-typography" part="slowback-typography"
 class:slowback-typography__link={variant === "link"}
 href={href}>{text}
<slot></slot>
</a>
 {/if}
 {#if variant !== "link"}
<p
class="slowback-typography" part="slowback-typography"
 class:slowback-typography__h1={variant === "h1"}
 class:slowback-typography__h2={variant === "h2"}
 class:slowback-typography__paragraph={variant === "paragraph"}
 class:slowback-typography__caption={variant === "caption"}
 class:slowback-typography__label={variant === "label"}
>{text}
<slot></slot>
</p>
{/if}

<style lang="scss">
    @import "../../style/index.scss";

    .slowback-typography {
        margin: 0;
        padding: 0;

        &__h1 {
            font-family: "Acme";
            font-weight: 400;
            font-size: 36px;
            line-height: 46px;
            color: $gunmetal;
        }
        &__h2 {
            font-family: "Almarai";
            font-weight: 700;
            font-size: 24px;
            line-height: 27px;
            color: $gunmetal;
        }
        &__p {
            font-family: "Almarai";
            font-weight: 400;
            font-size: 20px;
            line-height: 22px;
            color: $gunmetal;
        }
        &__label {
            font-family: "Almarai";
            font-weight: 700;
            font-size: 16px;
            line-height: 18px;
            color: $gunmetal;
        }
        &__caption {
            font-family: "Almarai";
            font-weight: 300;
            font-size: 16px;
            line-height: 18px;
            color: $gunmetal;
        }
        &__link {
            font-family: "Almarai";
            font-weight: 400;
            font-size: 16px;
            line-height: 18px;
            text-decoration: underline;
            color: $reseda-green;
        }

    }
</style>