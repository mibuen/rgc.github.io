import { getProyectos, getProyecto, saveToReport } from './fetchDb.js';
import { errToast } from './helpers.js';
import { crearTabla, prjHeader } from './html.js';

const mainContainer = document.getElementById('main-container');
const listado = async () => {
  const lista = await getProyectos();
  const renglones = lista.map((renglon) => `<tr>
    <th ><a href="#" class="prj">${renglon.proyectoId}</a></th>
    <th>${renglon.nombre}</th>
    <th>${!renglon.fotos ? 0 : renglon.fotos.length}</th>
    </tr>`).join('');
  const tabla = crearTabla(renglones);
  return mainContainer.innerHTML = tabla;
};

mainContainer.addEventListener('click', async (e) => {
  const x = e.target.closest('.prj');

  if (!x) return;
  const content = await getProyecto(x.innerText);
  if (!content.fotos) {
    errToast('Proyecto sin fotos');
    return;
  }
  mainContainer.innerHTML = prjHeader(content);
  const fotos = document.querySelectorAll('.fotos');
  fotos.forEach((meta) => {
    const btn = meta.querySelector('.btn');
    btn.addEventListener('click', async (ev) => {
      const key = meta.querySelector('img').src.split('/').pop();
      const data = {
        proyectoId: x.innerText,
        item: meta.querySelector('input[name="item"]').value,
        comentarios: meta.querySelector('input[name="comentario"]').value,
        status: meta.querySelector('input[name="status"]').value,
        key,
      };
      await saveToReport(ev, data);
    });
  });
});

export { listado };
