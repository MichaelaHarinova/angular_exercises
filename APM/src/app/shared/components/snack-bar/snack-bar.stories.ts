import { CommonModule } from "@angular/common";
import { Meta, moduleMetadata, Story } from "@storybook/angular";
import { SnackBarComponent } from "./snack-bar.component";

export default {
	component: SnackBarComponent,
	decorators: [
		moduleMetadata({
			declarations: [SnackBarComponent],
			imports: [CommonModule]
		})
	],
	argTypes: {
		durationInSeconds: { control: "sec" }
	},
	title: "Library/Shared/SnackBar"
} as Meta;

const Template: Story<SnackBarComponent> = (args) => ({
	component: SnackBarComponent,
	props: {
		...args
	}
});


