import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { DragulaService } from 'ng2-dragula';
import { ToDo, EventPing } from '../../_shared/_interface';
import { HttpService } from '../../_shared/_services';

@Component({
  selector: 'app-template-todo-list',
  templateUrl: './template-todo-list.component.html',
  styleUrls: ['./template-todo-list.component.sass']
})
export class TodoListComponent implements OnInit, OnDestroy {

    public toDoDoneShow: boolean;
    public toDoShow: boolean;
    public $todos: ToDo[];
    public $todosdone: ToDo[];
    public subs = new Subscription();

    constructor(
      public _httpService: HttpService,
      private _dragulaService: DragulaService
    ) {
        this.toDoDoneShow = true;
        this.toDoShow = true;
        this.$todos = [];
        this.$todosdone = [];
        this.loadData();

        this._dragulaService.createGroup('todos', {
          removeOnSpill: false,
          moves: function (el, container, handle) {
              return handle.className === 'handle';
          }
        });

        this.subs.add(_dragulaService.drop('todos')
            .subscribe(({ el }) => {
                this.position();
            })
        );
    }

    ngOnInit() {
    }

    ngOnDestroy() {
      this.subs.unsubscribe();
    }

    public position(): void {
      let position = 0;
      this.$todos.forEach((todo: ToDo) => {
          position += 1;
          todo.position = position;
          this._httpService.putToDo(todo).subscribe((data: ToDo) => {
          }, error => {
              console.log(`%cERROR: ${error.message}`, `color: red; font-size: 12px;`);
          });
      });
    }

    public loadData(): void {
      this.$todosdone = [];
      this.$todos = [];
      this._httpService.getToDo().subscribe((data: ToDo[]) => {
        data.forEach((toDo: ToDo) => {
          if (toDo.status === true) {
            this.$todosdone.push(toDo);
          } else {
            this.$todos.push(toDo);
          }
        });
        this.$todos.sort((obj1, obj2) => {
          return obj1.position - obj2.position;
        });
      }, error => {
          console.log(`%cERROR: ${error.message}`, `color: red; font-size: 12px;`);
      });
    }

    public create(event: ToDo): void {
      event.position = this.$todos.length + 1;
      this._httpService.postToDo(event).subscribe((data: ToDo) => {
        this.$todos.push(data);
        this.position();
      }, error => {
          console.log(`%cERROR: ${error.message}`, `color: red; font-size: 12px;`);
      });
    }

    public update(event: EventPing): void {
      if ('check' === event.label) {
        console.log(`%c"${event.label}-Event" wurde getriggert.`, `color: green;`);
        if (!event.object.status) {
          this.$todosdone.splice(this.$todosdone.indexOf(event.object), 1);
          this.$todos.push(event.object);
        } else {
          this.$todos.splice(this.$todos.indexOf(event.object), 1);
          this.$todosdone.push(event.object);
        }
      }
      if ('delete' === event.label) {
        console.log(`%c"${event.label}-Event" wurde getriggert.`, `color: green;`);
        if (event.object.status) {
          this.$todosdone.splice(this.$todosdone.indexOf(event.object), 1);
        } else {
          this.$todos.splice(this.$todos.indexOf(event.object), 1);
        }
      }
      if ('label' === event.label) {
        console.log(`%c"${event.label}-Event" wurde getriggert.`, `color: green;`);
        if (event.object.status) {
          this.$todosdone.forEach((toDo: ToDo) => {
            if (toDo._id === event.object._id) {
              toDo.label = event.object.label;
            }
          });
        } else {
          this.$todos.forEach((toDo: ToDo) => {
            if (toDo._id === event.object._id) {
              toDo.label = event.object.label;
            }
          });
        }
      }
    }

}
