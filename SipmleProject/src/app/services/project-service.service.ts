import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import {map, take} from 'rxjs/operators';

export interface Project {
  id?: string; 
  name: string; 
  description: string;
  time: string;
  date: string;
  location: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProjectServiceService {
  private projects: Observable<Project[]>;
  private projectCollection:AngularFirestoreCollection<Project>;

  constructor(private afs:AngularFirestore) {
    this.projectCollection = this.afs.collection<Project>("projects");
    this.projects = this.projectCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a=> {
          //gets what inside a doc
          const data = a.payload.doc.data();
          //auth usr and get id 
          const id= a.payload.doc.id;
          return {id, ...data};
        });
      })
    );
   }

   getProjects():Observable<Project[]> {
     return this.projects;
   }

   getProject(id: string):Observable<Project> {
     return this.projectCollection.doc<Project>(id).valueChanges().pipe(
       take(1),
       map(project => {
         project.id = id;
         return project;
       })
      )
   }

   addProject(project: Project): Promise<DocumentReference> {
     return this.projectCollection.add(project);
   }

   updateProject(project: Project): Promise<void> {
     return this.projectCollection
     .doc(project.id)
     .update({name: project.name, description: project.description, time: project.time, date: project.date, location: project.location });
   }

   deleteProject(id:string):Promise<void> {
     return this.projectCollection.doc(id).delete();
   }
}
