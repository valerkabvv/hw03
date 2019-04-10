import {Component, Input, OnInit} from '@angular/core';
import {Iform} from "../interfaces/iform";

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit {

  @Input()form:Iform;

  constructor() { }

  ngOnInit() {
  }


}
