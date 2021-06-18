import { htmlUpload } from './html.js';
import { getExtension, errToast, successToast } from './helpers.js';

import { existeProyecto, postS3, fotoToMongo } from './fetchDb.js';

const formHandler = (data) => {
  const fileForm = new FormData();
  Object.entries(data.s3Data.fields).forEach(([k, v]) => {
    fileForm.append(k, v);
  });
  return fileForm;
};
// Create postURL////

const postImgToS3 = async (data) => {
  const url = 'https://s3.amazonaws.com/leonada-de-monterrey';
  const postOptions = {
    method: 'POST',
    body: data,
  };
  // const s3Result = await fetch(url, postOptions);
  return fetch(url, postOptions);
};

//* ***** Main Code*********
const subirFoto = () => {
  const mainContainer = document.getElementById('main-container');
  mainContainer.innerHTML = htmlUpload;
  const mainForm = document.getElementById('myForm');
  const inputFile = document.getElementById('inpFile');
  const subir = document.getElementById('subir');
  subir.addEventListener('click', async (e) => {
    e.preventDefault();
    const proyectoId = document.getElementById('proyectoId').value;
    const existeId = await existeProyecto(proyectoId);
    if (existeId.message !== 'proyecto valido') {
      errToast(existeId.message);
      mainForm.reset();
      return;
    }
    const fileToUpload = inputFile.files[0];
    const ext = getExtension(fileToUpload.name);
    try {
      const awsPostResponse = await postS3({ proyectoId, ext });
      const formForAws = formHandler(awsPostResponse);
      formForAws.append('Content-type', inputFile.files[0].type);
      formForAws.append('file', inputFile.files[0]);
      const s3Result = await postImgToS3(formForAws);
      const imgUrl = awsPostResponse.s3Data.fields.key;
      const updateMongo = await fotoToMongo(imgUrl);
      successToast(`(${updateMongo.modified})Foto Guardada`);
      console.log(s3Result);
      mainForm.reset();
    } catch (error) {
      console.log(error);
    }
  });
};

export { subirFoto };

// const postS3 = async (data) => {
//   const baseUrl = 'http://localhost:3000/gets3post';
//   const postOptions = {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(data),
//   };
//   const awsData = await fetch(baseUrl, postOptions);
//   return awsData.json();
// };
// const fotoToMongo = async (data) => {
//   const [proyectoId, key] = data.split('/');
//   const baseUrl = 'http://localhost:3000/agregarfoto';
//   const postOptions = {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ proyectoId, key }),
//   };
//   const response = await fetch(baseUrl, postOptions);
//   const result = await response.json();
//   return result;
// };
