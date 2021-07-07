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

export const ratingColor = Template.bind({});
ratingColor.args = {
	rating: 5,
	cropWidth: 75,
	maxDivWidth: 75,
    label: "Star"
};

export const Large = Template.bind({});
Large.args = {
    rating: 0,
	starSize: 30,
	maxDivWidth: 300,
	cropWidth: 300,
    label: "Star"
};