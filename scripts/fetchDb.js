import { isANumber } from './helpers.js';

const baseUrl = 'https://rgcingenieria.herokuapp.com';
const postFetch = async (data, route) => {
  const postOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };
  try {
    const result = await fetch(`${baseUrl}/${route}`, postOptions);
    const respuesta = await result.json();
    // console.log(respuesta);
    return result.ok ? { message: 'datos validos' } : respuesta.message;
  } catch (error) {
    console.log(error.message);
  }
};

const saveProyecto = async (data) => postFetch(data, 'proyecto');

const uploadFile = async (file) => {
  // console.log('insideFetch', file);
  try {
    const result = await fetch(`${baseUrl}/agregarfoto`, {
      method: 'POST',
      body: file,
    });
    const data = await result.json();
    // console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};
const handleForm = async (e) => {
  e.preventDefault();
  const myForm = e.target;
  const fd = new FormData(myForm);
  if (!isANumber(fd.get('proyectoId'))) {
    return { message: 'proyecto invalido' };
  }
  const res = await uploadFile(fd);
  return res;
};
const getProyectos = async () => {
  try {
    const result = await fetch(`${baseUrl}/listado`);
    const data = await result.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
const getProyecto = async (proyectoId) => {
  try {
    const result = await fetch(`${baseUrl}/listado/${proyectoId}`);
    const data = await result.json();
    // console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};
const saveToReport = async (e, data) => {
  e.preventDefault();
  // console.log('SAVE', data);
  return postFetch(data, 'reporte');
};

export {
  saveProyecto, getProyectos, uploadFile, getProyecto, handleForm, saveToReport,
};

// db.proyectos.updateOne({proyectoId:1980,"fotos.url":"https://repofotosdaniel.s3.amazonaws.com/1980/2021-05-23-0002.webp"},{$set:{"fotos.$.comentarios":"Ya Chingamos con URL"}})
