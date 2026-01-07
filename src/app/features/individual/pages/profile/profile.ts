import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators} from '@angular/forms'

@Component({
  selector: 'app-profile',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile {
  fb = inject(FormBuilder)

  form = this.fb.group({
    fullName: ['', Validators.required],
    email: ['', Validators.required, Validators.email]
  })

  // constructor(private fb: FormBuilder){}
}
