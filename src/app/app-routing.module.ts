import { MovieDeleteComponent } from './components/movie/movie-delete/movie-delete.component'
import { MovieUpdateComponent } from './components/movie/movie-update/movie-update.component'
import { MovieCreateComponent } from './components/movie/movie-create/movie-create.component'
import { MovieCrudComponent } from './views/movie-crud/movie-crud.component'
import { ActorDeleteComponent } from './components/actor/actor-delete/actor-delete.component'
import { ActorUpdateComponent } from './components/actor/actor-update/actor-update.component'
import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { HomeComponent } from './views/home/home.component'
import { ActorCrudComponent } from './views/actor-crud/actor-crud.component'
import { ActorCreateComponent } from './components/actor/actor-create/actor-create.component'

import { AuthGuard } from '@auth0/auth0-angular'

const routes: Routes = [
  {
    path: 'login',
    component: HomeComponent,
  },
  {
    path: 'actors',
    component: ActorCrudComponent,
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
    component: MovieCrudComponent,
  },
  {
    path: 'movies/create',
    component: MovieCreateComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'movies/update/:id',
    component: MovieUpdateComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'movies/delete/:id',
    component: MovieDeleteComponent,
    canActivate: [AuthGuard],
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
