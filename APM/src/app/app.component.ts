import { Component } from "@angular/core";

@Component({
	selector: "pm-root",
	template: `<nav class="navbar navbar-expand navbar-light bg-light">
	<a class="navbar-brand mx-md-5">{{ pageTitle }}</a>
	<ul class="nav nav-pills">
		<li>
			<a class="nav-link color" [routerLink]="['/welcome']">Home</a>
		</li>
		<li>
			<a class="nav-link color" [routerLink]="['/products']"
				>Product List</a
			>
		</li>
	</ul>
</nav>
<div class="container">
	<router-outlet></router-outlet>
</div>
`
})
export class AppComponent {
	pageTitle = "Angular training project";
}
