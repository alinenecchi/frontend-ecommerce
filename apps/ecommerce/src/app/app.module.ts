import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AccordionModule } from 'primeng/accordion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NxWelcomeComponent } from './nx-welcome.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { RouterModule, Routes } from '@angular/router';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { UiModule } from '@frontend-ecommerce/ui';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
  { path: 'products', component: ProductListComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    NxWelcomeComponent,
    HomePageComponent,
    ProductListComponent,
    FooterComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    UiModule,
    AccordionModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
