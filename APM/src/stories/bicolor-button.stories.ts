import {moduleMetadata, Story, Meta} from '@storybook/angular';
import {action} from '@storybook/addon-actions';
import {CommonModule} from '@angular/common';
import {BicolorButtonComponent} from '../../src/app/shared/bicolor-button.component';

export default {
  component: BicolorButtonComponent,
  decorators: [
    moduleMetadata({
      declarations: [BicolorButtonComponent],
      imports: [CommonModule],
    }),
  ],
  argTypes: {
    backgroundColor: {control: 'color'},
  },
  excludeStories: /.*Data$/,
  title: 'Button-Color',
} as Meta;

const Template: Story<BicolorButtonComponent> = args => ({
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
