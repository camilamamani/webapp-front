import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Container } from '@mui/system';
import { Button, TextField} from '@mui/material';

export default function Student() {
  const paperStyle = {padding:'50px 20px', innerWidth:400, margin:'20px auto' }
  const buttonStyle = {margin:'20px auto' }
  const[personas, setPersonas] = useState([])
  
  //Validacion Form
  const initialValues = { name: "", surname: "", email: "", age: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target; 
    setFormValues({ ...formValues, [name]: value });
    console.log(formValues);
  };

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.name) {
      errors.name = "Nombre requerido*";
    }
    if (!values.surname) {
      errors.surname = "Apellido requerido*";
    }
    if (!values.email) {
      errors.email = "Email requirido*";
    } else if (!regex.test(values.email)) {
      errors.email = "El formato de email no es valido";
    }
    if (values.age <= 0 || values.age > 100) {
      errors.age = "Edad invalida*";
    }
    return errors;
  };

  //Requests... 
  const handleSave = (e)=>{
    e.preventDefault()
    setFormErrors(validate(formValues));

    if (Object.keys(formErrors).length === 0) {
      console.log(formValues);
      fetch("http://localhost:8080/api/persona/guardar", {
      method:"POST",
      headers: { 'Content-Type': 'application/json' },
      body:JSON.stringify(formValues)
      })
      console.log("Nueva persona Agregada.")
    }
    else{
      console.log("No cumple requerimientos.")
    }
    
  }

  const fetchData = () => {
    fetch("http://localhost:8080/api/personas")
      .then(response => {
        return response.json()
      })
      .then(data => {
        setPersonas(data)
      })
  }
  
  useEffect(() => {
    fetchData()
  }, [])

  //Formulario Alta y Tabla de Personas...
  return (
    <Box>     
    <Container>
      <Paper elevation={3} style={paperStyle}>
      
      <form>
      <h1>Alta de Personas</h1>
      <TextField
          style={{ width: "200px", margin: "5px" }}
          type="text"
          label="name"
          name="name"
          variant="outlined"
          value={formValues.name}
          onChange={handleChange}
      />
      <p>{formErrors.name}</p>
      <TextField
        style={{ width: "200px", margin: "5px" }}
        type="text"
        label="surname"
        name="surname"
        variant="outlined"
        value={formValues.surname}
        onChange={handleChange}
      />
      <p>{formErrors.surname}</p>
      <TextField
        style={{ width: "200px", margin: "5px" }}
        type="text"
        label="email"
        name="email"
        variant="outlined"
        value={formValues.email}
        onChange={handleChange}
      />
      <p>{formErrors.email}</p>
      <TextField
        style={{ width: "200px", margin: "5px" }}
        type="number"
        label="age"
        name="age"
        variant="outlined"
        value={formValues.age}
        onChange={handleChange}
      />
      <p>{formErrors.age}</p>
      
      <Button variant="contained" style={buttonStyle} onClick = {handleSave}>
        Guardar
      </Button>
      </form>

      </Paper>
    </Container>
    

    <TableContainer component={Paper}>
    <Table aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell align="center">name</TableCell>
          <TableCell align="center">surname</TableCell>
          <TableCell align="center">Email</TableCell>
          <TableCell align="center">Edad</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {personas.map(persona => (
          <TableRow
            key={persona.id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {persona.name}
            </TableCell>
            <TableCell align="right">{persona.surname}</TableCell>
            <TableCell align="right">{persona.email}</TableCell>
            <TableCell align="right">{persona.age}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>

  </Box>
  );
}

