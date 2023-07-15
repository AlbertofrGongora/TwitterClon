// Import and register all your controllers from the importmap under controllers/*

import { application } from "controllers/application"

// Eager load all controllers defined in the import map under controllers/**/*_controller
import { eagerLoadControllersFrom } from "@hotwired/stimulus-loading"
eagerLoadControllersFrom("controllers", application)

// Lazy load controllers as they appear in the DOM (remember not to preload controllers in import map!)
// import { lazyLoadControllersFrom } from "@hotwired/stimulus-loading"
// lazyLoadControllersFrom("controllers", application)

// tabla - config
$(document).ready(function() {
  // Inicializar DataTables solo una vez
  if (!$.fn.DataTable.isDataTable('#example')) {
    initializeDataTables();
  }

  // Capturar evento beforeunload para guardar el estado de DataTables
  $(window).on('beforeunload', function() {
    var dtState = $('#example').DataTable().state();
    localStorage.setItem('dtConfig', JSON.stringify(dtState));
  });

  // Restaurar configuraciones de DataTables al cargar la página
  var storedConfig = localStorage.getItem('dtConfig');
  if (storedConfig) {
    var dtState = JSON.parse(storedConfig);
    $('#example').DataTable().state.clear(); // Limpiar estado actual
    $('#example').DataTable().state.load(dtState); // Cargar estado guardado
  }
});

function initializeDataTables() {
  $('#example').DataTable({
    "paging": false,
    "language": {
      "lengthMenu": "Mostrar _MENU_ entradas de Twitus",
      "zeroRecords": "No se encontraron registros",
      "info": "",
      "infoEmpty": "No hay registros disponibles",
      "infoFiltered": "(filtrado de un total de _MAX_ registros)",
      "sSearch": "Buscar",
      "oPaginate": {
        "sFirst": "Primero",
        "sLast": "Último",
        "sNext": "Siguiente",
        "sPrevious": "Anterior"
      }
    }
  });
}
