import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounce, debounceTime, distinctUntilChanged } from 'rxjs';

enum Priority {
  URGENT = 'URGENT',
  MEDIUM = 'MEDIUM',
  LOW = 'LOW',
}

@Component({
  selector: 'app-todo',
  imports: [ReactiveFormsModule],
  templateUrl: './todo.html',
  styleUrl: './todo.scss',
})
export class Todo {
  private readonly fb = inject(FormBuilder);

  public priority = Priority;
  public priorityValues = Object.values(this.priority);

  public form = this.fb.group({
    task: ['', Validators.required],
    priority: [this.priority.LOW, Validators.required],
  });

  public arr = [1, 2, 3, 4, 5, 6, 7, 8];

  constructor() {
    this.form.controls.task.valueChanges
      .pipe(debounceTime(3000), distinctUntilChanged())
      .subscribe((value) => {
        console.log('current value: ', value);
        this.form.controls.task.reset();
      });
  }

  ngOnInit() {
    console.log('arr: ', this.arr);

    const reducedArr = this.arr.reduce((prev, curr) => prev + curr);

    console.log('reducedArr', reducedArr);
  }

  // ngOnInit() {
  //   this.form.patchValue({
  //     task: 'first task',
  //   });
  // }

  onSubmit() {
    console.log('form: ', this.form.value);
  }
}
