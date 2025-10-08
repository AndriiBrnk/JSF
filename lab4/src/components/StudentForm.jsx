import { useState, useEffect, useRef } from "react";
import { useFormValidation } from "../hooks/useFormValidation";

export default function StudentForm({
  onSubmit,
  onEdit,
  editingIndex,
  currentStudent,
  cancelEdit,
}) {
  const [studentInfo, setStudentInfo] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    groupNumber: "",
  });

  const [emptyForm, setEmptyForm] = useState({
    firstName: false,
    lastName: false,
    birthDate: false,
    groupNumber: false,
  });

  const spanError = useRef(null);
  const validateForm = useFormValidation(studentInfo, setEmptyForm);

  useEffect(() => {
    if (currentStudent) {
      setStudentInfo(currentStudent);
    } else {
      setStudentInfo({
        firstName: "",
        lastName: "",
        birthDate: "",
        groupNumber: "",
      });
    }
  }, [currentStudent]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const errorMsg = validateForm();
    if (errorMsg) {
      spanError.current.textContent = errorMsg;
      return;
    }

    if (editingIndex !== null) {
      onEdit(editingIndex, studentInfo);
    } else {
      onSubmit(studentInfo);
    }

    setStudentInfo({
      firstName: "",
      lastName: "",
      birthDate: "",
      groupNumber: "",
    });

    setEmptyForm({
      firstName: false,
      lastName: false,
      birthDate: false,
      groupNumber: false,
    });

    spanError.current.textContent = "";
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="firstName">Ім'я</label>
      <input
        type="text"
        id="firstName"
        value={studentInfo.firstName}
        onChange={(e) => {
          const value = e.target.value;
          setStudentInfo((prev) => ({ ...prev, firstName: value }));
          setEmptyForm((prev) => ({ ...prev, firstName: !value.trim() }));
        }}
        style={{ border: emptyForm.firstName ? "1px solid red" : null }}
      />

      <label htmlFor="lastName">Прізвище</label>
      <input
        type="text"
        id="lastName"
        value={studentInfo.lastName}
        onChange={(e) => {
          const value = e.target.value;
          setStudentInfo((prev) => ({ ...prev, lastName: value }));
          setEmptyForm((prev) => ({ ...prev, lastName: !value.trim() }));
        }}
        style={{ border: emptyForm.lastName ? "1px solid red" : null }}
      />

      <label htmlFor="dob">Дата народження</label>
      <input
        type="date"
        id="dob"
        value={studentInfo.birthDate}
        onChange={(e) => {
          const value = e.target.value;
          setStudentInfo((prev) => ({ ...prev, birthDate: value }));
          setEmptyForm((prev) => ({ ...prev, birthDate: !value.trim() }));
        }}
        style={{ border: emptyForm.birthDate ? "1px solid red" : null }}
      />

      <label htmlFor="group">Група</label>
      <input
        type="text"
        id="group"
        value={studentInfo.groupNumber}
        onChange={(e) => {
          const value = e.target.value;
          setStudentInfo((prev) => ({ ...prev, groupNumber: value }));
          setEmptyForm((prev) => ({ ...prev, groupNumber: !value.trim() }));
        }}
        style={{ border: emptyForm.groupNumber ? "1px solid red" : null }}
      />

      <span ref={spanError} style={{ color: "red" }}></span>

      <br />
      <button type="submit">
        {editingIndex !== null ? "Зберегти зміни" : "Додати"}
      </button>

      {editingIndex !== null && (
        <button
          type="button"
          onClick={cancelEdit}
          style={{ marginLeft: "10px" }}
        >
          Скасувати
        </button>
      )}
    </form>
  );
}