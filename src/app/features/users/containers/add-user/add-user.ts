import { Component, inject, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CanDeactivateComponent } from '../../../../core/guards';
import { Asset, User } from '../../../../core/models/users.model';
import { UsersService, UsersStateService } from '../../../../core/services';

@Component({
  selector: 'app-add-user',
  imports: [ReactiveFormsModule],
  templateUrl: './add-user.html',
  styleUrl: './add-user.scss',
})
export class AddUser implements CanDeactivateComponent {
  private readonly fb = inject(FormBuilder);
  private readonly usersService = inject(UsersService);
  private readonly usersStateService = inject(UsersStateService);

  public usernameMaxLength = 10;

  public canDeactivate(): boolean {
    if (this.form.dirty) {
      return confirm('MASZ ZMIANY W FORMULARZU, NAPEWNO CHCESZ WYJSC ?');
    }

    return true;
  }

  // public form = this.fb.nonNullable.group({
  public form = this.fb.group({
    username: [
      '',
      [Validators.required, Validators.maxLength(this.usernameMaxLength)],
    ],
    age: [0, [Validators.required, Validators.max(200)]],
    city: ['', [Validators.required]],
    assets: this.fb.array([]),
    phone: [null],
  });

  public get assets(): FormArray {
    return this.form.controls.assets;
  }

  public addAssets() {
    const assetControl = this.fb.group({
      assetName: ['', Validators.required],
      quantity: [0, [Validators.required, Validators.min(0)]],
    });

    this.assets.push(assetControl);
  }

  // public addAssets(): void {
  //   const assetControl = this.fb.control('', Validators.required);
  //   this.assets.push(assetControl);
  // }

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

    const userRequest: User = {
      age: this.form.value.age || 0,
      username: this.form.value.username || '',
      assets: (this.form.value.assets as Asset[]) || [],
      city: this.form.value.city || '',
      id: crypto.randomUUID(),
    };

    console.log('userRequest: ', userRequest);

    this.usersService.createUser(userRequest).subscribe({
      next: (resp) => {
        console.log('success resp', resp);

        this.usersStateService.updateUsers(resp as User);
        this.form.reset();
      },
      error: (err) => {
        console.log('err: ', err);
      },
    });
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
