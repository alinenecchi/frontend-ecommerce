import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService, Category } from '@frontend-ecommerce/products';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';

@Component({
  selector: 'admin-categories-form',
  templateUrl: './categories-form.component.html',
  styles: [],
})
export class CategoriesFormComponent implements OnInit {
  form: FormGroup;
  isSubmited = false;

  constructor(
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private categoriesServices: CategoriesService,
    private location: Location
  ) {}
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      icon: ['', Validators.required],
    });
  }
  onSubmit() {
    this.isSubmited = true;
    if (this.form.invalid) {
      return;
    }

    const category: Category = {
      name: this.categoryForm['name'].value,
      icon: this.categoryForm['icon'].value,
    };
    this.categoriesServices.createCategory(category).subscribe(
      (response) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Category is create',
        });
        timer(2000)
          .toPromise()
          .then((done) => {
            this.location.back();
            console.log(done);
          });
        console.log(response);
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Category is not create',
        });
        console.log(error);
      }
    );
  }

  get categoryForm() {
    return this.form.controls;
  }
}
