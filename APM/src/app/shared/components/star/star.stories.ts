import { CommonModule } from "@angular/common";
import { Meta, moduleMetadata, Story } from "@storybook/angular";
import { StarComponent } from "./star.component";

export default {
	component: StarComponent,
	decorators: [
		moduleMetadata({
			declarations: [StarComponent],
			imports: [CommonModule]
		})
	],
	argTypes: {
		color: { control: "color" }
	},
	title: "Library/Shared/Star"
} as Meta;

const Template: Story<StarComponent> = (args) => ({
	component: StarComponent,
	props: {
		...args
	}
});

export const Small = Template.bind({});
Small.args = {
	rating: 5,
	starSize: 16,
	maxDivWidth: 75,
    label: "Small stars"
};

export const Medium = Template.bind({});
Medium.args = {
    rating: 5,
	starSize: 32,
	maxDivWidth: 150,
    label: "Medium stars"
};

export const Large = Template.bind({});
Large.args = {
    rating: 5,
	starSize: 48,
	maxDivWidth: 225,
    label: "Large stars"
};