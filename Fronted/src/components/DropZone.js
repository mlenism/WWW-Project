import React from 'react';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';
import { Button } from '@mui/material';

import { addPublicidad } from '../apicore';

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out'
};

const getColor = (props) => {
  if (props.isDragAccept) {
    return '#00e676';
  }
  if (props.isDragReject) {
    return '#ff1744';
  }
  if (props.isFocused) {
    return '#2196f3';
  }
  return '#eeeeee';
};
const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-width: 2px;
  border-radius: 2px;
  border-color: ${(props) => getColor(props)};
  border-style: dashed;
  background-color: #fafafa;
  color: #bdbdbd;
  outline: none;
  transition: border 0.24s ease-in-out;
`;
function DropZone() {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  const aregarPublicidad = () => {
    const formData = new FormData();
    formData.append('file_uploaded', acceptedFiles[0]);
    addPublicidad(formData);
    console.log('HI :D');
  };

  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  console.log(acceptedFiles[0]);

  return (
    <section className="container">
      <Container {...getRootProps({ baseStyle })}>
        <input {...getInputProps()} />
        <br />
        <p align="center">Arrastra aqui los archivos que quieras subir</p>
      </Container>
      <aside>
        <br />
        <h4 align="center">Archivos</h4>
        <ul>{files}</ul>
      </aside>
      <Button onClick={() => aregarPublicidad()}>Subir Archivo</Button>
    </section>
  );
}

export default DropZone;
