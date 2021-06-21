const sideNav = () => {
  const options = {};
  const elems = document.querySelectorAll('.sidenav');
  const instances = M.Sidenav.init(elems, options);
  return instances;
};
const autoInit = () => M.AutoInit();

const isANumber = (str) => !/\D/.test(str);
const goHome = () => window.location = 'index.html';
const errToast = (msg, loader) => {
  M.toast({
    html: msg,
    displayLength: 2000,
    classes: 'red rounded',
    completeCallback: loader.classList.remove('active'),
  });
};
const failToast = (msg) => {
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
//++++++++++++++++++++++++++++++++++++
const getExtension = (data) => data.split('.').pop();
//++++++++++++++++++++++++++++++++
function createForm(data, file) {
  const upForm = new FormData();
  Object.entries(data).forEach(([k, v]) => {
    upForm.append(k, v);
  });
  upForm.append('Content-type', file.type);
  upForm.append('file', file);
  return upForm;
}

export {
  sideNav, errToast, successToast, goHome, isANumber, autoInit, getExtension, failToast, createForm,
};
