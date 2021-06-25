import { BrowserModule } from '@angular/platform-browser'
import { NgModule, LOCALE_ID } from '@angular/core'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import localePt from '@angular/common/locales/pt'
import { registerLocaleData } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms'

import { MatToolbarModule } from '@angular/material/toolbar'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatCardModule } from '@angular/material/card'
import { MatListModule } from '@angular/material/list'
import { MatButtonModule } from '@angular/material/button'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatTableModule } from '@angular/material/table'
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatSortModule } from '@angular/material/sort'

import { HeaderComponent } from './components/template/header/header.component'
import { FooterComponent } from './components/template/footer/footer.component'
import { NavComponent } from './components/template/nav/nav.component'

import { ActorCreateComponent } from './components/actor/actor-create/actor-create.component'
import { ActorReadComponent } from './components/actor/actor-read/actor-read.component'
import { ActorUpdateComponent } from './components/actor/actor-update/actor-update.component'
import { ActorDeleteComponent } from './components/actor/actor-delete/actor-delete.component'

import { HomeComponent } from './views/home/home.component'
import { ActorCrudComponent } from './views/actor-crud/actor-crud.component'

import { RedDirective } from './directives/red.directive'
import { ForDirective } from './directives/for.directive'

import { MovieCrudComponent } from './views/movie-crud/movie-crud.component'
import { MovieCreateComponent } from './components/movie/movie-create/movie-create.component'
import { MovieDeleteComponent } from './components/movie/movie-delete/movie-delete.component'
import { MovieReadComponent } from './components/movie/movie-read/movie-read.component'
import { MovieUpdateComponent } from './components/movie/movie-update/movie-update.component'

import { AuthModule } from '@auth0/auth0-angular'

registerLocaleData(localePt)

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavComponent,
    HomeComponent,
    ActorCrudComponent,
    ActorCreateComponent,
    ActorReadComponent,
    RedDirective,
    ForDirective,
    ActorUpdateComponent,
    ActorDeleteComponent,
    HomeComponent,
    RedDirective,
    ForDirective,
    MovieCrudComponent,
    MovieCreateComponent,
    MovieDeleteComponent,
    MovieReadComponent,
    MovieUpdateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatSnackBarModule,
    HttpClientModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    AuthModule.forRoot({
      domain: 'silve1ra.us.auth0.com',
      clientId: 'm7xjTM4Y2SqGfLRk9Y7hTcr8BbxcifbU',
    }),
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'pt-BR',
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
