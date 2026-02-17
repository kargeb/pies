import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.html',
  styleUrl: './users.scss',
  imports: [RouterOutlet],
})
export class Users {}
