import { handleForm } from './fetchDb.js';
import { errToast, successToast } from './helpers.js';
import { htmlUpload } from './html.js';

const subir = () => {
  const mainContainer = document.getElementById('main-container');
  // mainContainer.innerHTML = '';
  mainContainer.innerHTML = htmlUpload;
  const uploadForm = mainContainer.querySelector('#myForm');

  uploadForm.addEventListener('submit', async (e) => {
    const datos = await handleForm(e);
    if (datos.message) {
      errToast(`${datos.message}`);
      return;
    }
    if (datos.length > 0)successToast(`(${datos.length}) fotos subidas`);
    return mainContainer.innerHTML = '';
  });
};

export { subir };
