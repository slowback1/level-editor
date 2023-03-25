import type { Meta, StoryObj } from "@storybook/svelte";
import SlowbackButton from "./SlowbackButton.Example.svelte";

const meta = {
  title: "UI/SlowbackButton",
  component: SlowbackButton,
  argTypes: {
    variant: {
      name: "variant",
      type: { name: "string", required: false }
    }
  }

} as Meta;
export default meta;

type Story = StoryObj<typeof meta>;
export const Primary: Story = { args: { variant: "primary" } as any };
export const Outline = { args: { variant: "outline" } as any };
export const Text = { args: { variant: "text" } as any };