import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Student } from '../../models/student.model';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  students: Student[] = [];
  editingStudent: Student | null = null;

  constructor(private studentService: StudentService) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.studentService.getAll().subscribe(data => this.students = data);
  }

  startEdit(s: Student) {
    // clone to avoid two-way binding issues
    this.editingStudent = { ...s };
  }

  delete(id?: number) {
    if (!id) return;
    this.studentService.delete(id).subscribe(() => this.load());
  }

  onSave(student: Student) {
    if (this.editingStudent && this.editingStudent.id) {
      this.studentService.update(this.editingStudent.id, student).subscribe(() => {
        this.editingStudent = null;
        this.load();
      });
    } else {
      this.studentService.create(student).subscribe(() => {
        this.load();
      });
    }
  }

  onCancel() {
    this.editingStudent = null;
  }
}
