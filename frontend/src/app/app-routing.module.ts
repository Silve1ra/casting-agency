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
  },
  {
    path: 'actors/update/:id',
    component: ActorUpdateComponent,
  },
  {
    path: 'actors/delete/:id',
    component: ActorDeleteComponent,
  },
  {
    path: 'movies',
    component: MovieCrudComponent,
  },
  {
    path: 'movies/create',
    component: MovieCreateComponent,
  },
  {
    path: 'movies/update/:id',
    component: MovieUpdateComponent,
  },
  {
    path: 'movies/delete/:id',
    component: MovieDeleteComponent,
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
