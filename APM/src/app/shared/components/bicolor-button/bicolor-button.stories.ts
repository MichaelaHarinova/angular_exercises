import { CommonModule } from '@angular/common';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { BicolorButtonComponent } from './bicolor-button.component';

export default {
  component: BicolorButtonComponent,
  decorators: [
    moduleMetadata({
      declarations: [BicolorButtonComponent],
      imports: [CommonModule],
    }),
  ],
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  title: 'Library/Shared/BiColorButton',
} as Meta;

const Template: Story<BicolorButtonComponent> = (args) => ({
  component: BicolorButtonComponent,
  props: {
    ...args,
  },
});

export const buttonPrimary = Template.bind({});
buttonPrimary.args = {
  buttonActive: true,
};

export const buttonSecondary = Template.bind({});
buttonSecondary.args = {
  buttonActive: false,
};

export const buttonWithCustomText = Template.bind({});
buttonWithCustomText.args = {
  buttonText: 'Custom text',
};

export const buttonWithCustomVeryLongText = Template.bind({});
buttonWithCustomVeryLongText.args = {
  buttonText:
    'Custom text Custom text Custom text Custom text Custom text Custom text',
};

export const buttonWithCustomTextColor = Template.bind({});
buttonWithCustomTextColor.args = {
  textColor: '#ffffff',
};
