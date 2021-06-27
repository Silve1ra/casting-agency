import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '@auth0/auth0-angular';

import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ActorComponent } from './pages/actor/actor.component';
import { MovieComponent } from './pages/movie/movie.component';
import { ActorCreateComponent } from './components/actor/actor-create/actor-create.component';
import { ActorUpdateComponent } from './components/actor/actor-update/actor-update.component';
import { ActorDeleteComponent } from './components/actor/actor-delete/actor-delete.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path: 'profile',
    component: ProfileComponent,
    // canActivate: [AuthGuard],
  },
  {
    path: 'actors',
    component: ActorComponent,
    // canActivate: [AuthGuard],
  },
  {
    path: 'actors/create',
    component: ActorCreateComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'actors/update/:id',
    component: ActorUpdateComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'actors/delete/:id',
    component: ActorDeleteComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'movies',
    component: MovieComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
