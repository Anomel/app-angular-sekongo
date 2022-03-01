import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Assignment } from '../assignments/assignment.model';
import { LoggingService } from './logging.service';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {
  assignments:Assignment[] = [
    {
      id:1,
      nom:"Devoir angular pour Mr Buffa",
      dateDeRendu: new Date("2022-03-01"),
      rendu:false
    },
    {
      id:2,
      nom:"Devoir Oracle pour Mr Mopolo",
      dateDeRendu: new Date("2022-01-10"),
      rendu:true
    },
    {
      id:3,
      nom:"Devoir Grails pour Mr Galli",
      dateDeRendu: new Date("2022-01-20"),
      rendu:true
    }
  ]

  constructor(private loggingService:LoggingService) {
    this.loggingService.setLoggingLevel(1);
  }

  getAssignments():Observable<Assignment[]> {
    return of(this.assignments);
  }

  getAssignment(id:number):Observable<Assignment|undefined> {
    // on doit mettre | undefined si jamais l'élément n'existe pas
    let a:Assignment|undefined = this.assignments.find(a => a.id === id);

    return of(a);
  }

  addAssignment(assignment:Assignment):Observable<string> {
    this.assignments.push(assignment);

    this.loggingService.log(assignment, "ajouté");
    return of("Assignment ajouté");
  }

  updateAssignment(assignment:Assignment):Observable<string> {
    // pour le moment rien besoin de faire... ca marche tel quel
    // plus tard envoyer requête HTTP PUT sur web service pour update d'une base de données...

    this.loggingService.log(assignment, "modifié");

    return of("Assignment Modifié");
  }

  deleteAssignment(assignment:Assignment):Observable<string> {
    const pos = this.assignments.indexOf(assignment);
    this.assignments.splice(pos, 1);

    this.loggingService.log(assignment, "supprimé");

    return of("Assignment Supprimé");
  }
}
