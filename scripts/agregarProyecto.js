import { saveProyecto } from './fetchDb.js';
import { htmlGuardarProyecto } from './html.js';
import {
  isANumber, successToast, failToast,
} from './helpers.js';

const proyecto = () => {
  const mainContainer = document.getElementById('main-container');

  mainContainer.innerHTML = htmlGuardarProyecto;
  const mainForm = mainContainer.querySelector('form');

  mainForm.addEventListener('click', async (e) => {
    e.preventDefault();
    const proyectoId = mainForm.proyectoId.value;
    const nombre = mainForm.descripcion.value;
    const cliente = mainForm.cliente.value;
    const sitio = mainForm.sitio.value;
    const data = {
      proyectoId, nombre, cliente, sitio,
    };
    if (e.target.closest('button')) {
      if (!isANumber(proyectoId) || nombre === '') {
        failToast('datos invalidos');
        return;
      }
      const respuesta = await saveProyecto(data);
      const msg = respuesta.message;

      if (msg === 'datos validos') {
        successToast(msg);
        mainForm.reset();
      }
      if (respuesta === 'duplicate project') {
        failToast(respuesta);
      }
    }
    // mainForm.reset();
  });
};

export { proyecto };
