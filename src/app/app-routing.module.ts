import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DonateComponent } from './donate/donate.component';
import { OwnerComponent } from './owner/owner.component';
import { AdminComponent } from './admin/admin.component'

const routes: Routes = [
  { path: 'donate', component: DonateComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'owner', component: OwnerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [DonateComponent, OwnerComponent, AdminComponent]
