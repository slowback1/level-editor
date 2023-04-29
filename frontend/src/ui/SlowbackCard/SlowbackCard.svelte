<div class="slowback-card" part="slowback-card">
    <slot />
</div>

<style lang="scss">
    @import "../../style/index.scss";

    .slowback-card {
        padding: 12px;
        border: 1px solid $gunmetal;
        border-radius: 5px;
        box-shadow: 1px 4px 4px rgba(0,0,0,0.25);
        background-color: $baby-powder;
    }
</style>