import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
export default function Student() {

  const[personas, setPersonas] = useState([])

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

  return (
    <TableContainer component={Paper}>
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>Nombre</TableCell>
          <TableCell align="right">Apellido</TableCell>
          <TableCell align="right">Email</TableCell>
          <TableCell align="right">Edad</TableCell>
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
  );
}

