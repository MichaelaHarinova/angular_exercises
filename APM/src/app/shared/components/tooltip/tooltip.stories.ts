import { CommonModule } from "@angular/common";
import { Meta, moduleMetadata, Story } from "@storybook/angular";
import { TooltipComponent } from "./tooltip.component";
import { buttonPrimary } from "../bicolor-button/bicolor-button.stories";

export default {
	component: TooltipComponent,
	decorators: [
		moduleMetadata({
			declarations: [TooltipComponent],
			imports: [CommonModule]
		})
	],
	argTypes: {
		color: { control: "color" }
	},
	title: "Library/Shared/Tooltip"
} as Meta;

const Template: Story<TooltipComponent> = (args) => ({
	component: TooltipComponent,
	props: {
		...buttonPrimary
	}
});

export const message = Template.bind({});
message.args = { 
message: "Text"
};