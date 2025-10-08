import { useStudents } from "./hooks/useStudents";
import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";

export default function App() {
  const {
    students,
    addStudent,
    editStudent,
    deleteStudent,
    editingIndex,
    startEdit,
    cancelEdit,
  } = useStudents();

  return (
    <div>
      <h1>Список студентів</h1>

      <StudentForm
        onSubmit={addStudent}
        onEdit={editStudent}
        editingIndex={editingIndex}
        currentStudent={students[editingIndex]}
        cancelEdit={cancelEdit}
      />

      <StudentList
        students={students}
        onEdit={startEdit}
        onDelete={deleteStudent}
      />
    </div>
  );
}