import { useState } from "react";

export function useStudents() {
  const [students, setStudents] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  const addStudent = (student) => {
    setStudents((prev) => [...prev, student]);
  };

  const editStudent = (index, updatedStudent) => {
    setStudents((prev) =>
      prev.map((s, i) => (i === index ? updatedStudent : s))
    );
    setEditingIndex(null);
  };

  const deleteStudent = (index) => {
    setStudents((prev) => prev.filter((_, i) => i !== index));
  };

  const startEdit = (index) => {
    setEditingIndex(index);
  };

  const cancelEdit = () => {
    setEditingIndex(null);
  };

  return {
    students,
    addStudent,
    editStudent,
    deleteStudent,
    editingIndex,
    startEdit,
    cancelEdit,
  };
}
