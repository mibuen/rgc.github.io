const htmlUpload = `<div class="row">
<form class="" id='myForm'>
  <div class="input-field col s6">
    <input id="proyectoId" name="proyectoId" type="text" class="validate">
    <label for="proyectoId">Proyecto Id:</label>
  </div>
  <div class="file-field input-field col s12">
    <div class="btn">
      <span>Select Files</span>
      <input id="inpFile" name="fotoFile" type="file" accept="image/*">
    </div>
    <div class="file-path-wrapper">
      <input type="text" class="file-path  validate">
    </div>
  </div>
  <button class="btn right" id="subir">Subir</button>
</form>
</div>`;

const crearTabla = (renglones) => `<table class="striped">
<thead>
  <tr>
    <th>Numero:</th>
    <th>Proyecto</th> 
    <th># Fotos</th> 
    </tr>
</thead>
<tbody>
  ${renglones}
</tbody>
</table>`;

const awsUrl = 'https://s3.amazonaws.com/leonada-de-monterrey';
const showFotos = (fotos, Id) => fotos.map((foto) => ` 
<div class="col s12 m6 fotos">
        <div class="card">
          <div class="card-image">
            <img src="${awsUrl}/${Id}/${foto.key}" height="400px">
          </div>
          <div class="card-content row">
            <div class="field-input col s12">
              <input type="text" name="item" value="${foto.item}">
              <label for="item">Item</label>
            </div>
            <div class="field-input col s12">
              <input type="text" name="comentario" value="${foto.comentarios}">
              <label for="comentario">Comentario</label>
            </div>
            <div class="field-input col s12">
              <input type="text" name="status" value="${foto.status}">
              <label for="status">Status</label>
            </div>
            <div class="col s12" style="padding-top:10px">
              <a href="#" class="btn col s12 savebtn">Save</a>
            </div>
          </div>
        </div>
      </div>
`);
const prjHeader = (prj) => `
  <div class="row">
      <div class="col s4">
        <h6>Num: ${prj.proyectoId}</h6>
      </div>
      <div class="col s8">
        <h6>Nombre: ${prj.nombre}</h6>
      </div>
      <div class="col s6">
        <h6>Cliente: ${prj.cliente}</h6>
      </div>
      <div class="col s6">
        <h6>Sitio: ${prj.sitio}</h6>
      </div>
  </div>
  <div class="row">
  ${showFotos(prj.fotos, prj.proyectoId).join('')}  
  </div>  
`;

const htmlGuardarProyecto = `<div class="row">
<form class="col s12">
  <div class="row">
    <div class="input-field col s3">
      <input type="text" name="proyectoId" id="proyectoId" class="active validate" required>
      <label for="proyectoId">Proyecto Num:</label>
    </div>
    <div class="input-field col s9">
      <input type="text" name="descripcion" id="descripcion" class="active validate" required>
      <label for="descripcion">Nombre del Proyecto:</label>
    </div>
    <div class="input-field col s6">
      <input type="text" name="cliente" id="cliente" class="active validate" required>
      <label for="cliente">Cliente:</label>
    </div>
    <div class="input-field col s6">
      <input type="text" name="sitio" id="sitio" class="active validate" required>
      <label for="sitio">Sitio:</label>
    </div>
    <button class="btn waves-effect waves-light"><i class="material-icons left">save</i>Guardar</button>
  </div>
</form>
</div>`;

export {
  htmlUpload, crearTabla, htmlGuardarProyecto, showFotos, prjHeader,
};
