import { Component, inject, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-add-user',
  imports: [ReactiveFormsModule],
  templateUrl: './add-user.html',
  styleUrl: './add-user.scss',
})
export class AddUser {
  private readonly fb = inject(FormBuilder);

  public usernameMaxLength = 10;

  // public form = this.fb.nonNullable.group({
  public form = this.fb.group({
    username: [
      '',
      [Validators.required, Validators.maxLength(this.usernameMaxLength)],
    ],
    age: [0, [Validators.required, Validators.max(200)]],
    city: ['', [Validators.required]],
    assets: this.fb.array([]),
  });

  public get assets(): FormArray {
    return this.form.controls.assets;
  }

  public addAssets(): void {
    const assetControl = this.fb.control('', Validators.required);
    this.assets.push(assetControl);
  }

  public removeAsset(index: number) {
    this.assets.removeAt(index);
  }

  //   ngOnInit() {
  //  this.form = this.fb.group({
  //   username: '',
  //   age: new FormControl<number | string>(0),
  //   city: '',
  //   assets: [],
  // });
  //   }

  ngOnInit() {
    this.fillForm();
  }

  public fillForm() {
    this.form?.patchValue({
      age: 10,
    });
  }

  public showForm() {
    console.log('form: ', this.form.value);
  }

  public resetForm() {
    this.form.reset();
  }

  public submit() {
    console.log('form: ', this.form.value);
  }

  public get username(): FormControl {
    return this.form.controls.username;
  }
  public get city(): FormControl {
    return this.form.controls.city;
  }
  public get age(): FormControl {
    return this.form.controls.age;
  }
}
