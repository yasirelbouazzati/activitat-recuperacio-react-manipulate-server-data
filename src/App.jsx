import { useState, useEffect } from "react";

function App() {
  let id = 2;
  const [alumnos, setAlumnos] = useState([]);
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState("");

  useEffect(() => {
    actualizarListaAlumnos();
  }, []);

  const actualizarListaAlumnos = () => {
    fetch("http://localhost:6715/persons")
      .then((response) => response.json())
      .then((data) => {
        setAlumnos(data);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const alumnoExistente = alumnos.find((alumno) => alumno.nombre === nombre);
    if (alumnoExistente) {
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
          actualizarListaAlumnos();
        })
        .catch((error) => console.error("Error:", error));
    } else {
      fetch("http://localhost:6715/persons", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      
        body: JSON.stringify({ id, nombre, edad }),
      })
        .then((response) => response.json())
        .then(() => {
          setNombre("");
          setEdad("");
          actualizarListaAlumnos();
        })
        .catch((error) => console.error("Error:", error));
    }
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:6715/persons/${id}`, {
      method: "DELETE",
    }).then(() => {
      actualizarListaAlumnos();
    });
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
