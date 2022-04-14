import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CovidStatsComponent } from './covidstats/covid-stats.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'countries/:countery', component: CovidStatsComponent},
  { path: 'covidstats', component: CovidStatsComponent },
  { path: '**', pathMatch: 'full', redirectTo: '/home' } // catch any unfound routes and redirect to home page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
