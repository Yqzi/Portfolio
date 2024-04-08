import { NgModule } from "@angular/core";
import { ExtraOptions, RouterModule, Routes } from "@angular/router";

const appRoutes: Routes = []
const extraOption: ExtraOptions = {
  scrollPositionRestoration: 'enabled',
  anchorScrolling: 'enabled',
  onSameUrlNavigation: 'reload',
}

@NgModule({
    imports: [RouterModule.forRoot(appRoutes, extraOption)],
      exports: [RouterModule]
})
export class AppRoutingModule {

}