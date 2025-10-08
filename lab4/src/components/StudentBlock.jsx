export default function StudentBlock(
  {firstName, lastName, birthDate, groupNumber, onEdit, onDelete}) {
  return (
    <div className="student">
      <div className="student-info">
        <div><strong>Ім'я:</strong> {firstName}</div>
        <div><strong>Прізвище:</strong> {lastName}</div>
        <div><strong>Дата народження:</strong> {birthDate}</div>
        <div><strong>Група:</strong> {groupNumber}</div>
      </div>
      <div className="student-actions">
        <button title="Редагувати" onClick={onEdit}>✎</button>
        <button title="Видалити" onClick={onDelete}>🗑</button>
      </div>
    </div>
  );
}