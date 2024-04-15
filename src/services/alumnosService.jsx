import { useState, useEffect } from "react";

export function actualizarListaAlumnos(setAlumnos) {
  fetch("http://localhost:6715/persons")
    .then((response) => response.json())
    .then((data) => {
      setAlumnos(data);
    });
}

export function agregarAlumno(
  id,
  nombre,
  edad,
  setNombre,
  setEdad,
  setAlumnos
) {
  fetch("http://localhost:6715/persons", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: id.toString(), nombre, edad }),
  })
    .then((response) => response.json())
    .then(() => {
      setNombre("");
      setEdad("");
      actualizarListaAlumnos(setAlumnos);
    })
    .catch((error) => console.error("Error:", error));
}

export function actualizarAlumno(
  alumnoExistente,
  edad,
  setNombre,
  setEdad,
  setAlumnos
) {
  fetch(`http://localhost:6715/persons/${alumnoExistente.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...alumnoExistente, edad }),
  })
    .then(() => {
      setNombre("");
      setEdad("");
      actualizarListaAlumnos(setAlumnos);
    })
    .catch((error) => console.error("Error:", error));
}

export function eliminarAlumno(id, setAlumnos ) {
  fetch(`http://localhost:6715/persons/${id}`, {
    method: "DELETE",
  }).then(() => {
    actualizarListaAlumnos(setAlumnos);
  });
}
