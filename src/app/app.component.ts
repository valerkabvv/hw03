import { Component } from '@angular/core';
import {Iform} from "./interfaces/iform";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  forms:Iform[] = [];
  title = 'emailForm';
  onAddForm(form:Iform){
  this.forms.unshift(form);
  }
}
