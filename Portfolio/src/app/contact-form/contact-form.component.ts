import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatIconModule],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.css'
})
export class ContactFormComponent {
  contactForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private contact: ContactService) {}

  ngOnInit(): void {
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      number: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      message: '',
    });
  }

  submitForm(): void {
    if (this.contactForm?.valid) {
      this.contact.send(this.contactForm);
    }
  }

}

