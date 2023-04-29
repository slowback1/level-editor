<script lang="ts">

    export let label: string = "";
    export let onChange: (e: any) => void = () => {};
    export let type: string = "text";
</script>

<label class="slowback-input__label" part="slowback-input__label">
    {label}
    <input type={type} on:change={onChange} part="slowback-input" class="slowback-input" />
</label>

<style lang="scss">
    @import "../../style/index.scss";

.slowback-input {
    border-radius: 5px 5px 0 5px;
    border: 1px solid $gunmetal;
    padding: 8px 12px;
    font-size: 20px;
    &:focus {
        outline: 1px solid $burnt-sienna;
    }

    &__label {
        display: flex;
        flex-direction: column;
        font-family: 'Almarai';
        font-size: 16px;
        color: $gunmetal;
        font-weight: 700;
        gap: 4px;
    }
}
</style>