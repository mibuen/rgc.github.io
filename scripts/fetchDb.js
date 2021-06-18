import { isANumber } from './helpers.js';

const baseUrl = 'https://rgcingenieria.herokuapp.com';
// const baseUrl = 'http://localhost:3000';
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
//+++++++++++++++++++++++++++++++++++++++++++
const existeProyecto = async (data) => {
  if (!data) return { message: 'invalid' };
  const existe = await fetch(`${baseUrl}/verificar/${data}`);
  return existe.json();
};
//++++++++++++++++++++++++++++++++++
const postS3 = async (data) => {
  const postOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };
  const awsData = await fetch(`${baseUrl}/gets3post`, postOptions);
  return awsData.json();
};
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const fotoToMongo = async (data) => {
  const [proyectoId, key] = data.split('/');
  const postOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ proyectoId, key }),
  };
  const response = await fetch(`${baseUrl}/agregarfoto`, postOptions);
  return response.json();
};
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const handleForm = async (data) => {
  const fileForm = new FormData();
  await Object.entries(data.s3Data.fields).forEach(([k, v]) => {
    fileForm.append(k, v);
  });
  return fileForm;
};
//++++++++++++++++++++++++++++++++++++++++++++++++++++++
const getProyectos = async () => {
  try {
    const result = await fetch(`${baseUrl}/listado`);
    const data = await result.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
//+++++++++++++++++++++++++++++++++++++++++++
const getProyecto = async (proyectoId) => {
  try {
    const result = await fetch(`${baseUrl}/listado/${proyectoId}`);
    return result.json();
  } catch (error) {
    console.log(error);
  }
};
//++++++++++++++++++++++++++++++++++++++++++
const saveToReport = async (e, data) => {
  e.preventDefault();
  return postFetch(data, 'reporte');
};

export {
  saveProyecto, getProyectos, getProyecto, handleForm, saveToReport, existeProyecto,
  postS3, fotoToMongo,
};

// db.proyectos.updateOne({proyectoId:1980,"fotos.url":"https://repofotosdaniel.s3.amazonaws.com/1980/2021-05-23-0002.webp"},{$set:{"fotos.$.comentarios":"Ya Chingamos con URL"}})
// const uploadFile = async (file) => {
//   // console.log('insideFetch', file);
//   try {
//     const result = await fetch(`${baseUrl}/agregarfoto`, {
//       method: 'POST',
//       body: file,
//     });
//     const data = await result.json();
//     // console.log(data);
//     return data;
//   } catch (error) {
//     console.log(error);
//   }
// };
// const handleForm = async (e) => {
//   e.preventDefault();
//   const myForm = e.target;
//   const fd = new FormData(myForm);
//   if (!isANumber(fd.get('proyectoId'))) {
//     return { message: 'proyecto invalido' };
//   }
//   const res = await uploadFile(fd);
//   return res;
// };
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
