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
//+++++++++++++++++++++++++++++
async function generatePost(proyectoId, key) {
  const endpoint = `${baseUrl}/gets3post`;
  const data = {
    proyectoId,
    key,
  };
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };
  const result = await fetch(endpoint, options);
  return result.json();
}

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
  saveProyecto, getProyectos, getProyecto, saveToReport, existeProyecto,
  fotoToMongo, generatePost,
};
