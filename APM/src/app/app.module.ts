import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";
import { AppComponent } from "./app.component";
import { WelcomeComponent } from "./home/welcome.component";
import { ProductModule } from "./products/product-modules/product.module";

@NgModule({
	declarations: [AppComponent, WelcomeComponent],
	imports: [
		BrowserModule,
		HttpClientModule,
		RouterModule.forRoot([
			{ path: "welcome", component: WelcomeComponent },
			{ path: "", redirectTo: "welcome", pathMatch: "full" },
			{ path: "**", redirectTo: "welcome", pathMatch: "full" }
		]),
		ProductModule,
		BrowserAnimationsModule
	],
	bootstrap: [AppComponent]
})
export class AppModule {}
