import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  public modalRef: BsModalRef;
  public createForm: FormGroup;
  public editform: FormGroup;
  public users = [];

  constructor(private modalService: BsModalService, 
              private formBuilder: FormBuilder, 
              private userService: UserServiceService) { }

  ngOnInit() {
      this.createFormCreate();
      this.getAllUsers();
  }

  getAllUsers(): void{ 
      this.userService.getAllUsersService()
      .subscribe(
        (success: any) => {
          this.users = success;
        },
        (error) => {}
      );
  }

  createFormCreate(): void {
      this.createForm = this.formBuilder.group({
          name: ['', Validators.required],
          last_name: ['', Validators.required],
          phone: ['', Validators.required],
          email: ['', Validators.required],
          address: ['', Validators.required]
      });
  }

  get createForms() { 
      return this.createForm.controls;
  }

  editUser() {
      
    let formData: FormData = new FormData();
      formData.append('user_id', '' + this.editForms.user_id.value)
      formData.append('name', this.editForms.name.value);
      formData.append('last_name', this.editForms.last_name.value);
      formData.append('phone', this.editForms.phone.value);
      formData.append('email', this.editForms.email.value);
      formData.append('address', this.editForms.address.value);

      this.userService.editUserService(formData)
      .subscribe(
        (success) => {
            this.getAllUsers();
            this.createForm.reset();
        },
        (error) => {}
      );
  }
  
  createFormedit(userData): void {
      this.editform = this.formBuilder.group({
          user_id: [userData.id],
          name: [userData.name, Validators.required],
          last_name: [userData.last_name, Validators.required],
          phone: [userData.phone, Validators.required],
          email: [userData.email, Validators.required],
          address: [userData.address, Validators.required]
      });
  }

  get editForms() {
      return this.editform.controls;
  }

  createUser() {
      let formData: FormData = new FormData();
      formData.append('name', this.createForms.name.value);
      formData.append('last_name', this.createForms.last_name.value);
      formData.append('phone', this.createForms.phone.value);
      formData.append('email', this.createForms.email.value);
      formData.append('address', this.createForms.address.value);

      this.userService.createUserService(formData)
      .subscribe(
        (success) => {
            this.getAllUsers();
            this.createForm.reset();
        },
        (error) => {}
      );
  }

  openModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template);
  }

  openModalEdit(template: TemplateRef<any>, userID): void {
    
    let formData: FormData = new FormData();
    formData.append('user_id', userID);

    this.userService.getUserService(formData)
    .subscribe(
      (success) => {
        this.modalRef = this.modalService.show(template);
        this.createFormedit(success);
      },
      (error) => {}
    )
  }

  deleteUser(userID) {
    let formData: FormData = new FormData();
    formData.append('user_id', userID);

    this.userService.deleteUserService(formData)
    .subscribe(
      (success) => {
        this.getAllUsers();
      },
      (error) => {}
    )
  }
}
