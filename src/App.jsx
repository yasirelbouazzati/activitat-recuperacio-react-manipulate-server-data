import React, { useState, useEffect } from "react";
import {
  actualizarListaAlumnos,
  agregarAlumno,
  actualizarAlumno,
  eliminarAlumno,
} from "./services/alumnosService";

function App() {
  const [alumnos, setAlumnos] = useState([]);
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState("");

  useEffect(() => {
    actualizarListaAlumnos(setAlumnos);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    const alumnoExistente = alumnos.find((alumno) => alumno.nombre === nombre);
    if (alumnoExistente) {
      actualizarAlumno(alumnoExistente, edad, setNombre, setEdad, setAlumnos);
    } else {
      // Generar un nuevo id único
      const nuevoId =
        alumnos.length > 0
          ? Math.max(...alumnos.map((alumno) => alumno.id)) + 1
          : 1;
      agregarAlumno(nuevoId, nombre, edad, setNombre, setEdad, setAlumnos);
    }
  };

  const handleDelete = (id) => {
    eliminarAlumno(id, setAlumnos);
  };

  return (
    <div>
      <h1>Gestión de Alumnos</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Edad:
          <input
            type="number"
            value={edad}
            onChange={(e) => setEdad(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Agregar Alumno</button>
      </form>
      <h2>Listado de Alumnos</h2>
      <ul>
        {alumnos.map((alumno) => (
          <li key={alumno.id}>
            {alumno.nombre} - Edad: {alumno.edad} años
            <button onClick={() => handleDelete(alumno.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
