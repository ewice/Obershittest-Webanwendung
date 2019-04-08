import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ToDo, EventPing } from '../../_shared/_interface';
import { HttpService } from '../../_shared/_services';

@Component({
  selector: 'app-template-todo',
  templateUrl: './template-todo.component.html',
  styleUrls: ['./template-todo.component.sass']
})
export class TemplateTodoComponent implements OnInit {

    @Input() toDo$: ToDo;
    @Output() ping: EventEmitter<any> = new EventEmitter<any>();
    public lastKeypress: number;
    public timeStamp: number;

    constructor(public _httpService: HttpService) {}

    ngOnInit() {}

    public changeCheck(event?: any): void {
      this.toDo$.status = !this.toDo$.status;
      this._httpService.putToDo(this.toDo$).subscribe((data: ToDo) => {
        const eventObject: EventPing = {
          label: 'check',
          object: this.toDo$
        };
        this.ping.emit(eventObject);
      }, error => {
          console.log(`%cERROR: ${error.message}`, `color: red; font-size: 12px;`);
      });
    }

    public changeLabel(event?: any): void {
      this._httpService.putToDo(this.toDo$).subscribe((data: ToDo) => {
        const eventObject: EventPing = {
          label: 'label',
          object: this.toDo$
        };
        this.ping.emit(eventObject);
      }, error => {
          console.log(`%cERROR: ${error.message}`, `color: red; font-size: 12px;`);
      });
    }

    public deleteToDo(event?: any): void {
      this._httpService.deleteToDo(this.toDo$).subscribe((data: ToDo) => {
        const eventObject: EventPing = {
          label: 'delete',
          object: this.toDo$
        };
        this.ping.emit(eventObject);
    }, error => {
        console.log(`%cERROR: ${error.message}`, `color: red; font-size: 12px;`);
    });
    }

}
