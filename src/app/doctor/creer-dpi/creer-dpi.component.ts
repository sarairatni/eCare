import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-creer-dpi',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './creer-dpi.component.html',
  styleUrl: './creer-dpi.component.css',
})
export class CreerDpiComponent implements OnInit {
  form: FormGroup;
  showError: boolean = false;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      nss: ['', Validators.required],
      nom: ['', Validators.required],
      adresse: ['', Validators.required],
      date_naissance: ['', Validators.required],
      prenom: ['', Validators.required],
      num_tel: ['', Validators.required],
      med_traitant: ['', Validators.required],
      contact: [''],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.form.valid) {
      console.log('Form Submitted:', this.form.value);
      this.showError = false;
      this.form.reset();
      // Perform further actions (e.g., API call)
    } else {
      this.showError = true;
      console.error('Form is invalid');
    }
  }
}
