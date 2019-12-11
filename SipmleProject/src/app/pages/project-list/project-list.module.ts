import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { ProjectListPageRoutingModule } from './project-list-routing.module';

import { ProjectListPage } from './project-list.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProjectListPageRoutingModule,
    RouterModule.forChild([{ path: '', component: ProjectListPage }])
  ],
  declarations: [ProjectListPage]
})
export class ProjectListPageModule {}
