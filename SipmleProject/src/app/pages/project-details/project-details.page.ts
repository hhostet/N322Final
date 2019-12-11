import { Project, ProjectServiceService } from './../../services/project-service.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Plugins } from '@capacitor/core';

const { Geolocation } = Plugins;

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.page.html',
  styleUrls: ['./project-details.page.scss'],
})
export class ProjectDetailsPage implements OnInit {

  project: Project = {
    name: '',
    description: '',
    time: '',
    date: '',
    location: ''
  }

  public lat:Number;
  public long:Number;

  constructor(
    private activatedRoute:ActivatedRoute,
    private ps: ProjectServiceService,
    private toastCtrl: ToastController,
    private router: Router,
    ){
    }

  ngOnInit() {
    let id= this.activatedRoute.snapshot.paramMap.get("id");
    if(id){
      this.ps.getProject(id).subscribe(project => {
        this.project = project;
      });
    }
  }

  async getGeoLocation() {
    const coordinates = await Geolocation.getCurrentPosition();
    console.log('Current', coordinates);
    this.lat = coordinates.coords.latitude;
    this.long = coordinates.coords.longitude
  }

  addProject() {
    this.ps.addProject(this.project).then(
      () => {
        this.router.navigateByUrl('/');
        this.showToast("Project Created!");
      }, err=>{
        this.showToast("There Was an Error Creating Your Project");
      });
  }

  deleteProject() {
    this.ps.deleteProject(this.project.id).then(() => {
      this.router.navigateByUrl("/");
      this.showToast("Deleted");
    });
  }

  updateProject(){
    this.ps.updateProject(this.project).then(() => {
      this.showToast("Your project has updated!");
    }, err=>{
      this.showToast("There was an error updating your project");
    });
  }

  showToast(message) {
    this.toastCtrl.create({
      message:message,
      duration: 2000
    }).then(toast => toast.present());
  }
}
