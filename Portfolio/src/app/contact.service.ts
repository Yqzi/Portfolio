import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import  emailjs  from '@emailjs/browser'

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor() { }

  async send(form: FormGroup) {
    emailjs.init('INgZdgf0aKP01cRR9');
    let response = await emailjs.send("service_0zpocjw","template_gkwuwjt", {
      name: form.value.name,
      email: form.value.email,
      number: '(' + form.value.number.slice(0, 3)+ ')' + form.value.number.slice(3, 6) + '-' + form.value.number.slice(6),
      message: form.value.message
      });

      alert('message has been sent');
      form.reset();
  }

}

