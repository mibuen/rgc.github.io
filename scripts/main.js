import { proyecto } from './agregarProyecto.js';
import { listado } from './listado.js';
import { subir } from './subirFotos.js';
import { sideNav, autoInit } from './helpers.js';

autoInit();
document.addEventListener('DOMContentLoaded', () => {
  sideNav();
});

const mainContainer = document.getElementById('main-container');
const mainTrigger = document.querySelectorAll('.app-menu');
const mainContent = async (cb) => cb();

mainTrigger.forEach((ele) => {
  mainContainer.innerHTML = '';
  ele.addEventListener('click', async (e) => {
    e.preventDefault();
    const x = e.target.closest('a');
    if (x === null) return;
    if (x.className === 'proyecto') return mainContent(proyecto);
    if (x.className === 'listado') return mainContent(listado);
    if (x.className === 'subir') return mainContent(subir);
  });
});
