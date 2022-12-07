import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
  editmode = false;
  currentCategoryId: string;

  constructor(
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private categoriesServices: CategoriesService,
    private location: Location,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      icon: ['', Validators.required],
    });
    this._checkEditMode();
  }
  onSubmit() {
    this.isSubmited = true;
    if (this.form.invalid) {
      return;
    }

    const category: Category = {
      id: this.currentCategoryId,
      name: this.categoryForm['name'].value,
      icon: this.categoryForm['icon'].value,
    };
    if (this.editmode) {
      this._updateCategory(category);
    } else {
      this._addCategory(category);
    }
  }

  private _updateCategory(category: Category) {
    this.categoriesServices.updateCategory(category).subscribe(
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

  private _addCategory(category: Category) {
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

  private _checkEditMode() {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.editmode = true;
        this.currentCategoryId = params['id'];
        this.categoriesServices
          .getCategory(params['id'])
          .subscribe((category) => {
            this.categoryForm['name'].setValue(category.name);
            this.categoryForm['icon'].setValue(category.icon);
          });
      }
    });
  }

  get categoryForm() {
    return this.form.controls;
  }
}
