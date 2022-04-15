import { Component, OnInit } from '@angular/core';
import { AssignmentsService } from '../shared/assignments.service';
import { Assignment } from './assignment.model';
import {AuthService} from "../shared/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css'],
})
export class AssignmentsComponent implements OnInit {
  titre = 'Application de gestion des assignments !';
  assignments: Assignment[] = [];
  displayedColumns: string[] = ['id', 'nom', 'dateDeRendu', 'rendu'];

  // pour la pagination
  page: number=1;
  limit: number=5;
  totalDocs: number=0;
  totalPages: number=0;
  hasPrevPage?: boolean;
  prevPage?: number;
  hasNextPage?: boolean;
  nextPage?: number;

  name = "";
  pwd = "";


  constructor(public authService:AuthService,
              private router:Router,
              private assignmentsService:AssignmentsService) {}

  // appelé avant l'affichage
  ngOnInit(): void {
    //console.log("dans le ngInit")

    this.getAssignments();
    //console.log("assignmentsService.getAssignments() appelé...");
  }

  getAssignments() {
    this.assignmentsService.getAssignments(this.page, this.limit)
    .subscribe((data) => {
      this.assignments = data.docs;
      this.page = data.page;
      this.limit = data.limit;
      this.totalDocs = data.totalDocs;
      this.totalPages = data.totalPages;
      this.hasPrevPage = data.hasPrevPage;
      this.prevPage = data.prevPage;
      this.hasNextPage = data.hasNextPage;
      this.nextPage = data.nextPage;
      //console.log("Données arrivées");
    });
  }

  getColor(index: number) {
    return index % 2 ? 'red' : 'green';
  }

  pageSuivante() {
    this.page++;
    this.getAssignments();
  }

  pagePrecedente() {
      this.page--;
      this.getAssignments();
  }

  premierePage() {
    this.page = 1;
    this.getAssignments();
  }

  dernierePage() {
    this.page = this.totalPages;
    this.getAssignments();
  }

  login() {
    if(!this.authService.loggedIn) {
      this.authService.logIn(this.name, this.pwd);
    } else {
      this.authService.logOut();
      this.router.navigate(["/"]);
    }
  }

  peuplerBD() {
    this.assignmentsService.peuplerBDAvecForkJoin()
      .subscribe(() => {
        console.log("TOUS LES AJOUTS ONT ETE REALISES");
        // on peut alors afficher la liste
        this.router.navigate(["/home"]);
      })
  }
}
