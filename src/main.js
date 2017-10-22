import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'datatables.net-select-bs4/css/select.bootstrap4.min.css';
import '../public/stylesheets/style.css';

const $ = require('jquery');

/* eslint import/no-extraneous-dependencies: 'off' */
require('datatables.net-bs4');
require('datatables.net-buttons-bs4');
// require('datatables.net-fixedheader-bs4');
require('datatables.net-responsive-bs4');
require('datatables.net-buttons/js/buttons.colVis.js');
require('datatables.net-buttons/js/buttons.flash.js');
require('datatables.net-buttons/js/buttons.html5.js');
require('datatables.net-buttons/js/buttons.print.js');
require('datatables.net-select');

let studentTable = '';

const reFormat = (data) => {
  const finalData = {};
  const largerArr = [];

  data.students.forEach((studentObj) => {
    const studentArr = $.map(studentObj, el => el.toString());
    largerArr.push(studentArr);
  });

  finalData.data = largerArr;
  console.log(finalData);
  // console.log(JSON.stringify(finalData));
  // return JSON.stringify(finalData);
  return finalData.data;
};

const renderTable = () => {
  studentTable = $('#my-table').DataTable({
    columns: [
      null,
      null,
      null,
      null,
      null,
      {
        className: 'edit--btn',
        orderable: false,
        data: null,
      },
      {
        className: 'delete--btn',
        orderable: false,
        data: null,
        /* sortable: false,
        render: o => '<button class="edit--btn btn btn-secondary">Delete!</button>', */
      },
    ],
    lengthChange: false,
    select: {
      style: 'single',
    },
    buttons: [
      {
        extend: 'copy',
        text: 'Copy to clipboard',
      },
      'pdf',
      {
        text: 'View Record',
        action: () => {
          console.log('VIEW BUTTON CLICKED');
        },
      },
    ],
    columnDefs: [
      {
        visible: false,
        targets: [0, 4],
      },
      {
        targets: -1,
        data: null,
        defaultContent: '<button class="edit--btn btn btn-secondary">Delete!</button>',
      },
      {
        targets: -2,
        data: null,
        defaultContent: '<button class="delete--btn btn btn-secondary">Edit!</button>',
      },
    ],
    ajax: {
      url: '/students',
      dataSrc: d => reFormat(d),
    },
    initComplete: () => {
      studentTable.buttons().container()
        .appendTo($('.col-md-6:eq(0)', studentTable.table().container()));
    },
  });
};

const addDataEvent = () => {
  $('#student--form').on('submit', (event) => {
    event.preventDefault();
    const successAlert = $('#success--alert');
    const failAlert = $('#fail--alert');
    const formData = {
      name: $('input[name=name]').val(),
      age: $('input[name=age]').val(),
      course: $('input[name=course]').val(),
    };
    $.ajax({
      url: '/students',
      type: 'POST',
      data: formData,
    }).done((data) => {
      $(successAlert).addClass('show');
      studentTable.ajax.reload(null, false);
      console.log(data);
    }).fail((err) => {
      $(failAlert).addClass('show');
      console.log(err);
    });
  });
};

const changeRowSelected = () => {
  $('#example tbody').on('click', 'tr', () => {
    if ($(this).hasClass('selected')) {
      $(this).removeClass('selected');
    } else {
      studentTable.$('tr.selected').removeClass('selected');
      $(this).addClass('selected');
    }
  });
};

/*
const fetchStudents = () => {
  $.ajax({
    url: '/students',
  }).done((data) => {
    console.log('RETRIEVED DATA');
    console.log(data);
    return reFormat(data);
  });
};
*/

$(document).ready(() => {
  addDataEvent();
  renderTable();
  changeRowSelected();
  $('#my-table tbody').on('click', 'td.delete--btn', function () {
    console.log('DELETE BUTTON CLICKED');
    const rowData = studentTable.row($(this).parents('tr')).data();
    const route = `/students/${rowData[0]}`;
    // const test = $(this).parent('tr');
    // const test = studentTable.row($(this).parents('tr')).data();
    studentTable.row($(this).parents('tr')).remove().draw(false);
    $.ajax({
      url: route,
      type: 'DELETE',
    }).done((data) => {
      console.log(`DELETE SUCCESSFUL ${data}`);
    }).fail((err) => {
      console.log(err);
    });
  });
  $('#my-table tbody').on('click', 'td.edit--btn', () => {
    console.log('EDIT BUTTON CLICKED');
  });
});

