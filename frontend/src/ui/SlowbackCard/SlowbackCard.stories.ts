import type { Meta, StoryObj } from "@storybook/svelte";
import SlowbackCard from './SlowbackCard.Example.svelte';

const meta = {
    title: "UI/SlowbackCard",
    component: SlowbackCard,
} as Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};