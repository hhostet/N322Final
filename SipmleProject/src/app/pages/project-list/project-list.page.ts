import { Project, ProjectServiceService } from './../../services/project-service.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.page.html',
  styleUrls: ['./project-list.page.scss'],
})
export class ProjectListPage implements OnInit {

  private projects: Observable<Project[]>;
  constructor(private ps: ProjectServiceService) { }

  ngOnInit() {

    this.projects = this.ps.getProjects();
  }
}
