import { htmlUpload, htmlPreload } from './html.js';
import { createForm, errToast, successToast } from './helpers.js';

import { existeProyecto, generatePost, fotoToMongo } from './fetchDb.js';

const subirFoto = () => {
  const mainContainer = document.getElementById('main-container');
  mainContainer.innerHTML = `${htmlUpload}${htmlPreload}`;
  const mainForm = document.getElementById('myForm');
  const inputFile = document.getElementById('inpFile');
  const subir = document.getElementById('subir');
  subir.addEventListener('click', async (e) => {
    e.preventDefault();
    const proyectoId = document.getElementById('proyectoId').value;
    const loader = document.querySelector('.preloader-wrapper');
    loader.classList.add('active');
    const existeId = await existeProyecto(proyectoId);

    if (existeId.message !== 'proyecto valido') {
      errToast(existeId.message, loader);
      // mainForm.reset();
      return;
    }
    const key = inputFile.files[0];
    try {
      const { url, fields } = await generatePost(proyectoId, key.name);
      const s3Form = createForm(fields, key);
      const upload = await fetch(url, { method: 'POST', body: s3Form });
      console.log(upload);
      const updateMongo = await fotoToMongo(fields.key);
      successToast(`(${updateMongo.modified})Foto Guardada`);
      loader.classList.remove('active');
    } catch (error) {
      console.log(error);
    }
  });
};

export { subirFoto };
