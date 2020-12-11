import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { WebservicesService } from '../webservices.service';

@Component({
  selector: 'app-studentform',
  templateUrl: './studentform.component.html',
  styleUrls: ['./studentform.component.scss']
})
export class StudentformComponent implements OnInit {
  public submitted: boolean = false;
  public alertText: any = { text: "", class: "" };
  public studentLists: any = [];
  public studentListsAll: any = [];
  public selection: any = [];
  public skip: number = 0;
  public totalPage: number;
  public isModify: boolean = false;
  public student = this.fb.group({
    studentId: [''],
    studentName: ['', Validators.required],
    fatherName: ['', Validators.required],
    dateOfBirth: ['', Validators.required],
    gender: ['', Validators.required],
    appliedCourse: ['', Validators.required],
    mobileNo: ['', Validators.required],
    emailId: ['', Validators.required],
    address: ['', Validators.required],
    // profilePhoto: ['',Validators.required]
  });
  public courseList: any = [
    'C', 'C++', 'Java', 'Python', 'Angular', 'React', 'Vue', 'Django', 'C#', 'Ruby on rails', 'Pascal'
  ]
  myOptions = {
    dateRange: false,
    dateFormat: 'dd.mm.yyyy'
    // other options...
  };
  public today: Date = new Date();
  constructor(public fb: FormBuilder, public webService: WebservicesService) {

  }

  ngOnInit(): void {
    this.getStudentList();
  }

  actionCheck(event, id) {
    if (event && this.selection.indexOf(id) == -1) {
      this.selection.push(id);
    } else if (!event && this.selection.indexOf(id) > -1) {
      this.selection.splice(this.selection.indexOf(id), 1);
    }
    console.log(this.selection);
  }

  modifyDetails() {
    this.isModify = true;
    this.studentListsAll.filter(item => {
      if (item._id == this.selection[0]) {
        this.student = this.fb.group({
          studentId: [item.studentId],
          studentName: [item.studentName, Validators.required],
          fatherName: [item.fatherName, Validators.required],
          dateOfBirth: [item.dateOfBirth, Validators.required],
          gender: [item.gender, Validators.required],
          appliedCourse: [item.appliedCourse, Validators.required],
          mobileNo: [item.mobileNo, Validators.required],
          emailId: [item.emailId, Validators.required],
          address: [item.address, Validators.required],
          // profilePhoto: [item.profilePhoto,Validators.required]
        });
      }
    })
  }

  pageChange(isNext) {
    isNext ? this.skip++ : this.skip--;
    this.studentLists = this.studentListsAll.filter((item, index) => {
      return this.skip * 10 > index;
    })
    console.log(this.totalPage, this.skip, this.studentLists);
  }

  getStudentList() {
    this.webService.getList().subscribe((data: any) => {
      console.log(data)
      this.studentListsAll = data;
      let len: any = (this.studentListsAll.length / 10);
      this.totalPage = parseInt(len, 10) + 1;
      this.skip = 1;
      this.studentLists = this.studentListsAll.filter((item, index) => {
        return this.skip * 10 > index;
      })
      console.log(this.totalPage, this.skip, this.studentLists);
    }, error => {
      console.log(error);
    });
  }

  addStudent() {
    this.submitted = true;
    // this.selection = [];
    window.scroll(0, 0);
    if (this.student.valid) {
      if (!this.isModify) {
        this.student.get('studentId').setValue(this.studentLists.length + 1);
        this.webService.addList(this.student.value).subscribe((data: any) => {
          console.log(data);
          this.alertText.class = "alert-success";
          this.alertText.text = "Student added successfully !";
          setTimeout(() => {
            this.alertText.text = "";
            this.isModify = false;
            this.student.reset();
          }, 5000);
          this.submitted = false;
          this.getStudentList();
        }, error => {
          console.log(error);
        });
      } else {
        this.webService.updateList(this.student.value, this.selection[0]).subscribe((data: any) => {
          console.log(data);
          this.alertText.class = "alert-success";
          this.alertText.text = "Student updated successfully !";
          setTimeout(() => {
            this.alertText.text = "";
            this.isModify = false;
            this.submitted = false;
            this.student.reset();
          }, 5000);
          this.getStudentList();
        }, error => {
          console.log(error);
        });
      }
    } else {
      this.alertText.class = "alert-danger";
      this.alertText.text = "Please enter valid information in the form";
      setTimeout(() => {
        this.alertText.text = "";
      }, 5000);
    }
  }

  deleteAll() {
    this.selection.filter(id => {
      this.webService.remove(id).subscribe((data: any) => {
        console.log(data);
        this.selection = [];
        this.getStudentList();
        // this.studentLists = data;
      }, error => {
        console.log(error);
      });
    })
  }

  reset() {
    // this.submitted = false;
    this.isModify = false;
    this.student.reset();
  }

}
