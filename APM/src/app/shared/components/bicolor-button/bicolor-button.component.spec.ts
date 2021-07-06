import { ComponentFixture, TestBed } from "@angular/core/testing";

import { BicolorButtonComponent } from "./bicolor-button.component";

describe("ImageButtonComponent", () => {
	let component: BicolorButtonComponent;
	let fixture: ComponentFixture<BicolorButtonComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [BicolorButtonComponent]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(BicolorButtonComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
