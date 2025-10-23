import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Student } from '../../models/student.model';
import { groupValidator } from '../../validators/group.validator';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css']
})
export class StudentFormComponent implements OnInit, OnChanges {
  @Input() editingStudent: Student | null = null;
  @Output() save = new EventEmitter<Student>();
  @Output() cancel = new EventEmitter<void>();

  form: FormGroup;
  errorMessage = '';

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      firstName: ['', [Validators.required, Validators.pattern(/^[^\d]+$/)]],
      lastName: ['', [Validators.required, Validators.pattern(/^[^\d]+$/)]],
      birthDate: ['', [Validators.required]],
      groupNumber: ['', [groupValidator]]
    });
  }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['editingStudent']) {
      if (this.editingStudent) {
        this.form.setValue({
          firstName: this.editingStudent.firstName,
          lastName: this.editingStudent.lastName,
          birthDate: this.editingStudent.birthDate,
          groupNumber: String(this.editingStudent.groupNumber)
        });
      } else {
        this.form.reset();
      }
      this.errorMessage = '';
    }
  }

  onSubmit() {
    if (this.form.invalid) {
      this.errorMessage = 'Заповніть правильно всі поля.';
      return;
    }
    const v = this.form.value;
    const student: Student = {
      firstName: v.firstName.trim(),
      lastName: v.lastName.trim(),
      birthDate: v.birthDate,
      groupNumber: Number(v.groupNumber)
    };
    this.save.emit(student);
    this.form.reset();
  }

  onCancel() {
    this.cancel.emit();
    this.form.reset();
  }
}
