const sideNav = () => {
  const options = {};
  const elems = document.querySelectorAll('.sidenav');
  const instances = M.Sidenav.init(elems, options);
  return instances;
};
const autoInit = () => M.AutoInit();

const cleanForm = (form) => form.reset();
const isANumber = (str) => !/\D/.test(str);
const goHome = () => window.location = 'index.html';
const errToast = (msg) => {
  M.toast({
    html: msg,
    displayLength: 2000,
    classes: 'red rounded',
  });
};
const successToast = (msg) => {
  M.toast({
    html: msg,
    displayLength: 2000,
    classes: 'green rounded',
  });
};
const procesarFile = (e, proyectoId) => {
  const imgFiles = e.target.files;
  const formData = new FormData();
  formData.append('proyectoId', proyectoId);
  for (let i = 0; i < imgFiles.length; i += 1) {
    formData.append('fotoFile', imgFiles[i]);
  }
  return formData;
};

export {
  sideNav, errToast, successToast, goHome, isANumber, procesarFile, autoInit,
};
