import SlowbackTypography from './SlowbackTypography.svelte';

const meta = {
    title: "UI/SlowbackTypography", 
    component: SlowbackTypography
}
export default meta;

export const Heading1 = {}
Heading1.args = {text: "Lorem Ipsum Dolor", variant: "h1"};

export const Heading2 = {};
Heading2.args = {text: "Lorem Ipsum Dolor", variant: "h2"};

export const Paragraph = {};
Paragraph.args = {text: "Lorem Ipsum Dolor", variant: "p"};

export const Label = {};
Label.args ={text: "Lorem Ipsum Dolor", variant: "label"};

export const Caption = {};
Caption.args = {text: "Lorem Ipsum Dolor", variant: "caption"};

export const Link = {};
Link.args = {text: "Lorem Ipsum Dolor", variant:"link"}