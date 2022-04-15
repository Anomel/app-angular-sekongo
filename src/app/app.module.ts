import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule }  from '@angular/material/button';
import { MatDividerModule }  from '@angular/material/divider';
import { MatIconModule }  from '@angular/material/icon';
import { MatInputModule }  from '@angular/material/input';
import { MatListModule }  from '@angular/material/list';
import { MatCardModule }  from '@angular/material/card';
import { MatCheckboxModule }  from '@angular/material/checkbox';
import { MatFormFieldModule }  from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatTableModule} from '@angular/material/table';

import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';

import { AssignmentsComponent } from './assignments/assignments.component';
import { RenduDirective } from './shared/rendu.directive';
import { AssignmentDetailComponent } from './assignments/assignment-detail/assignment-detail.component';

// Pour le router
import { Routes, RouterModule } from '@angular/router';
import { EditAssignmentComponent } from './edit-assignment/edit-assignment.component';
import { AuthGuard } from './shared/auth.guard';
import {MatToolbarModule} from "@angular/material/toolbar";
import { ListAssignmentsComponent } from './assignments/list-assignments/list-assignments.component';
import {AddAssignmentComponent} from "./assignments/add-assignment/add-assignment.component";
import {MatMenuModule} from "@angular/material/menu";
import {MatSelectModule} from "@angular/material/select";
import {MatButtonToggleModule} from "@angular/material/button-toggle";

const routes:Routes = [
  {
    path: "",
    component:AssignmentsComponent,
  },
  {
    path: "home",
    component:AssignmentsComponent
  },
  {
    path: "add",
    component:AddAssignmentComponent
  },
  {
    path: "assignment/:id",
    component:AssignmentDetailComponent
  },
  {
    path: "assignment/:id/edit",
    component:EditAssignmentComponent,
    canActivate:[AuthGuard]
  },
  {
    path: "list-assignments",
    component: ListAssignmentsComponent
  }
]
@NgModule({
  declarations: [
    AppComponent,
    AssignmentsComponent,
    RenduDirective,
    AssignmentDetailComponent,
    AddAssignmentComponent,
    EditAssignmentComponent,
    ListAssignmentsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule, MatDividerModule, MatIconModule,
    FormsModule, MatInputModule, MatFormFieldModule, MatDatepickerModule,
    MatListModule, MatCardModule, MatCheckboxModule, MatTableModule,
    MatNativeDateModule, MatSlideToggleModule, HttpClientModule,
    RouterModule.forRoot(routes), MatToolbarModule, MatMenuModule, MatSelectModule, MatButtonToggleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
