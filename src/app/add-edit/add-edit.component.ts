import { CoreService } from './../core/core.service';
import { EmployeeService } from './../services/employee.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css'],
})
export class AddEditComponent implements OnInit {
  empForm: FormGroup;
  educations: string[] = [
    'Matric',
    'Diploma',
    'Intermediate',
    'Graduate',
    'Post Graduate',
  ];
  constructor(
    private formBuilder: FormBuilder,
    private empService: EmployeeService,
    private dialogRef: MatDialogRef<AddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private coreService: CoreService
  ) {
    this.empForm = this.formBuilder.group({
      firstName: '',
      lastName: '',
      email: '',
      dob: '',
      gender: '',
      education: '',
      company: '',
      experience: '',
      package: '',
    });
  }

  ngOnInit(): void {
    this.empForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.empForm.valid) {
      if (this.data) {
        this.empService
          .editEmployee(this.data.id, this.empForm.value)
          .subscribe({
            next: (res) => {
              // alert('');
              this.coreService.openSnackBar(
                'Employee Updated Successfully',
                'done'
              );
              this.dialogRef.close(true);
            },
          });
      } else {
        this.empService.addEmp(this.empForm.value).subscribe({
          next: (res: any) => {
            // alert(' success');
            this.coreService.openSnackBar(
              'Employee added Successfully',
              'done'
            );
            this.dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }
  }
}
