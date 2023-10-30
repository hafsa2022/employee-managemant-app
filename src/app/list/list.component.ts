import { CoreService } from './../core/core.service';
import { AddEditComponent } from './../add-edit/add-edit.component';
// import { ConfirmDeleteComponent } from './../confirm-delete/confirm-delete.component';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeService } from './../services/employee.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'email',
    'dob',
    'gender',
    'education',
    'company',
    'experience',
    'package',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private employeeService: EmployeeService,
    private confirmDialog: MatDialog,
    private addEditDialog: MatDialog,
    private coreService: CoreService
  ) {}
  ngOnInit(): void {
    this.getEmployees();
  }
  openAddEmpForm() {
    const dialogRef = this.addEditDialog.open(AddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getEmployees();
        }
      },
    });
  }
  openEditEmployee(data:any) {
    const dialogRef = this.addEditDialog.open(AddEditComponent, { data });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getEmployees();
        }
      },
    });
  }
  getEmployees() {
    this.employeeService.getEmployeesList().subscribe({
      next: (res: any) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.log,
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  deleteEmployee(id: number) {
    this.employeeService.deleteEmployee(id).subscribe({
      next: (res: any) => {
        // alert('');
        this.coreService.openSnackBar('Employee deleted Successfully','done');
        // this.confirmDialog.open(ConfirmDeleteComponent);
        this.getEmployees();
      },
      error: console.log,
    });
  }

  editEmployee() {}
}
