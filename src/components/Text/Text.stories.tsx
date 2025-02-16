import { Text, type TextProps } from "./index";
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Text> = {
  title: "Components/Text",
  component: Text,
  tags: ['autodocs', '!dev'],

  parameters: {
    layout: "padded",
    controls: {
      disable: true,
      disableSaveFromUI: true,
    }
  },
  argTypes: {
    fontSize: {
      control: 'select', options: ['body-lg', 'body-md', 'body-sm', 'body-xs', 'header-lg', 'header-md', 'header-sm', 'header-xs', 'display-lg', 'display-md', 'display-sm', 'display-xs'],
      description: 'Text size',
      table: {
          defaultValue: { summary: 'body-md' },
      },
    },
    fontFamily: {
      control: 'select', options: ['mono', 'serif', 'sans'],
      description: 'Font family',
      table: {
        defaultValue: { summary: 'sans' },
      },
    },
    lineHeight: {
      control: 'select', options: ['lg', 'md', 'sm', 'xs'],
      description: 'Line Height',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    color: {
      control: 'select', options: ['slate-90', 'blue-50', 'gold-50', ''],
      description: 'Font Color',
      table: {
        defaultValue: { summary: 'slate-90' },
      },
    },
    as: {
      control: 'text',
      description: 'Render as element',
    },
    children: {
      control: 'text',
      description: 'ReactNode',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Text>;
export const Default: Story = {args: { children: "Text Component"}};

//export const AllSizes = {
//  parameters: {
//      controls:{ exclude: /.*/ },
//  },
//  render: (args: textProps) => (
//    <>
//      <Text {...args} lineHeight="body-lg" fontSize="body-lg" >Large Text</Text>
//      <Text {...args} lineHeight="body-md" fontSize="body-md" >Medium Text</Text>
//      <Text {...args} lineHeight="body-sm" fontSize="body-sm" >Small Text</Text>
//      <Text {...args} lineHeight="body-xs" fontSize="body-xs" >Extra Small Text</Text>
//    </>
//  )
//};


export const AllColors: Story = {
  render: (args: TextProps) => (
    <>
      <Text {...args} font="mono" color="slate.90">Slate-90</Text>
      <Text {...args} color="gold.50" >Gold-50</Text>
      <Text {...args} color="blue.50" >Blue-50</Text>
    </>
  )
};
