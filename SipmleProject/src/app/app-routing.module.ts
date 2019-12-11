import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/project-list/project-list.module').then( m => m.ProjectListPageModule)
  },
  {
    path: 'project',
    loadChildren: () => import('./pages/project-details/project-details.module').then( m => m.ProjectDetailsPageModule)
  },
  {
    path: 'project-details/:id',
    loadChildren: () => import('./pages/project-details/project-details.module').then( m => m.ProjectDetailsPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
