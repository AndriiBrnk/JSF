import StudentBlock from "./StudentBlock";

export default function StudentList({ students, onEdit, onDelete }) {
  if (students.length === 0) return <h1>Тут порожньо...</h1>;
  return (
    <>
      {students.map((student, index) => (
        <StudentBlock
          key={index}
          firstName={student.firstName}
          lastName={student.lastName}
          birthDate={student.birthDate}
          groupNumber={student.groupNumber}
          onEdit={() => onEdit(index)}
          onDelete={() => onDelete(index)}
        />
      ))}
    </>
  );
}
