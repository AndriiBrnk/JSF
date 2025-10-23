import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Student } from '../../models/student.model';

@Component({
  selector: 'app-student-block',
  templateUrl: './student-block.component.html',
  styleUrls: ['./student-block.component.css']
})
export class StudentBlockComponent {
  @Input() student!: Student;
  @Output() edit = new EventEmitter<void>();
  @Output() delete = new EventEmitter<number>();

  onEdit() {
    this.edit.emit();
  }
  onDelete() {
    if (this.student.id) this.delete.emit(this.student.id);
  }
}
