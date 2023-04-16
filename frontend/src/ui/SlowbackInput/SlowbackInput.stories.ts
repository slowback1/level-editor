import type { Meta, StoryObj } from "@storybook/svelte";
import SlowbackInput from './SlowbackInput.svelte';

const meta = {
    title: "UI/SlowbackInput",
    component: SlowbackInput,
    argTypes: {
        label: {
            type: {name: "string", required: false}
        },
    }
}
export default meta;

export const Default = {};
Default.args = {label: "Input"}

export const Number = {};
Number.args = {label: "Input", type: "number"}