import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ToDo } from '../../_interface';
import { ColorPaletteService } from '../../_services/color-palette.service';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';


@Component({
  selector: 'app-template-todo-form',
  templateUrl: './template-todo-form.component.html',
  styleUrls: ['./template-todo-form.component.sass']
})
export class TemplateTodoFormComponent implements OnInit {
  colorForm: FormGroup;


  public toDo$: ToDo;
  @Output() ping: EventEmitter<ToDo> = new EventEmitter<ToDo>();
  backgroundColors;

  constructor(private _colorPalette: ColorPaletteService, private selectedColor: string) {
    this.toDo$ = {
      _id: undefined,
      label: undefined,
      status: false,
      position: undefined
    };
    /*this.backgroundColors = this._colorPalette.backgroundColors;

    const form: NgForm;
    const backgroundColors: ColorPaletteService = form.controls['colorPicker'].value;
    console.log('Background color: ' + backgroundColors.selectedColor);

    this.colorForm = new FormGroup({
    });*/
  }

  ngOnInit() {
  }

  public createToDo(event?: any): void {
    this.ping.emit(this.toDo$);
    this.toDo$ = {
      _id: undefined,
      label: undefined,
      status: false,
      position: undefined
    };
  }

}
