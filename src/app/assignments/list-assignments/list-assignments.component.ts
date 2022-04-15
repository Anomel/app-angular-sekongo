import { Component, OnInit } from '@angular/core';
import {Assignment} from "../assignment.model";
import {AssignmentsService} from "../../shared/assignments.service";
import {AuthService} from "../../shared/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-list-assignments',
  templateUrl: './list-assignments.component.html',
  styleUrls: ['./list-assignments.component.css']
})
export class ListAssignmentsComponent implements OnInit {

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


  constructor(private authService:AuthService,
              private router:Router,
              private assignmentsService:AssignmentsService
  ) {}

  // appelé avant l'affichage
  ngOnInit(): void {

    if (!this.authService.loggedIn) {
      this.router.navigate(['/']);
    }

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

}
