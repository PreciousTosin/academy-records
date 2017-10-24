import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'alertifyjs/build/css/alertify.min.css';
import 'datatables.net-select-bs4/css/select.bootstrap4.min.css';
import '../public/stylesheets/style.css';

const $ = require('jquery');
const alertify = require('alertifyjs');
/* eslint import/no-extraneous-dependencies: 'off' */
require('datatables.net-bs4');
require('datatables.net-buttons-bs4');
// require('datatables.net-fixedheader-bs4');
require('datatables.net-responsive-bs4');
// require('datatables.net-buttons/js/buttons.colVis.js');
// require('datatables.net-buttons/js/buttons.flash.js');
// require('datatables.net-buttons/js/buttons.html5.js');
// require('datatables.net-buttons/js/buttons.print.js');
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

const displayData = data => (
  `<div class="card" style="width: 20rem;">
    <div class="card-body">
      <h4 class="card-title">FULL DETAILS</h4>
      <p class="card-text">${data[1]}</p>
    </div>
   </div>`);

const createEditForm = data => (
  `<form id="editForm" action="/students/${data[1]}" method="POST">
    <div class="form-group" style="visibility: hidden">
      <label for="id">ID</label>
      <input type="text" class="form-control" id="id" placeholder="Identification" name="id" value="${data[0]}">
    </div>
    <div class="form-group">
      <label for="fullName">Name</label>
      <input type="text" class="form-control" id="fullName" placeholder="Full Name" name="editedName" value="Moses">
    </div>
    <div class="form-group">
      <label for="age">Age</label>
      <input type="text" class="form-control" id="age" placeholder="Age" name="editedAge" value="35">
    </div>
    <div class="form-group">
      <label for="course">Course</label>
      <input type="text" class="form-control" id="course" placeholder="Course" name="editedCourse" value="egbe science">
    </div>

    <button type="submit" class="btn btn-primary">Submit</button>
  </form>`
);

const createAddForm = () => (
  `<form id="student--form" action="/students" method="POST">
    <div class="form-group">
      <label for="fullName">Name</label>
      <input type="text" class="form-control" id="fullName" placeholder="Full Name" name="name">
    </div>
    <div class="form-group">
      <label for="age">Age</label>
      <input type="text" class="form-control" id="age" placeholder="Age" name="age">
    </div>
    <div class="form-group">
      <label for="course">Course</label>
      <input type="text" class="form-control" id="course" placeholder="Course" name="course">
    </div>

    <button type="submit" class="btn btn-primary">Submit</button>
  </form>`
);

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
        text: 'New Record',
        action() {
          alertify.editDialog(createAddForm());
        },
      },
      {
        text: 'View Record',
        action() {
          console.log('VIEW BUTTON CLICKED');
          const rowData = studentTable.row('.selected').data();
          if (rowData === undefined) {
            alertify.error('Select a row to view record');
          } else {
            alertify.viewDialog(displayData(rowData));
          }
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
    initComplete() {
      studentTable.buttons().container()
        .appendTo($('.col-md-6:eq(0)', studentTable.table().container()));
    },
  });
};

const addDataEvent = () => {
  $('body').on('submit', '#student--form', (event) => {
    event.preventDefault();
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
      studentTable.ajax.reload(null, false);
      alertify.editDialog().close();
      alertify.success('NEW RECORD ADDED!');
      console.log(data);
    }).fail((err) => {
      alertify.error('OPERATION NOT SUCCESSFUL');
      console.log(err);
    });
  });
};

const editDataEvent = () => {
  $('body').on('submit', '#editForm', (event) => {
    console.log('SUBMIT EDIT FORM');
    event.preventDefault();
    const id = $('input[name=id]').val();
    const route = `/students/${id}`;
    const formData = {
      name: $('input[name=editedName]').val(),
      age: $('input[name=editedAge]').val(),
      course: $('input[name=editedCourse]').val(),
    };
    $.ajax({
      url: route,
      type: 'PUT',
      data: formData,
    }).done((data) => {
      studentTable.ajax.reload(null, false);
      alertify.editDialog().close();
      alertify.success('UPDATE SUCESSFUL!');
      console.log(data);
    }).fail((err) => {
      alertify.error('UPDATE NOT SUCCESSFUL');
      console.log(err);
    });
  });
};

const deleteRecordEvent = (callback) => {
  $('#my-table').on('click', 'td.delete--btn', function eventCallback() {
    callback.call(this);
  });
};

function deleteRecord() {
  console.log('DELETE BUTTON CLICKED');
  const rowData = studentTable.row($(this).parents('tr')).data();
  const route = `/students/${rowData[0]}`;
  // const test = $(this).parent('tr');
  // const test = studentTable.row($(this).parents('tr')).data();
  alertify.confirm('Delete Student Record', 'Are you sure you want to delete?', () => {
    studentTable.row($(this).parents('tr')).remove().draw(false);
    $.ajax({
      url: route,
      type: 'DELETE',
    }).done((data) => {
      console.log(`DELETE SUCCESSFUL ${data}`);
    }).fail((err) => {
      console.log(err);
    });
    alertify.success('DELETE SUCCESSFUL');
  }, () => {
    alertify.error('Declined');
  }).set({ labels: { ok: 'Okay', cancel: 'Cancel' }, padding: false });
}

const showEditFormEvent = (callback) => {
  $('#my-table').on('click', 'td.edit--btn', function showFormCallBk() {
    callback.call(this);
  });
};

function displayEditForm() {
  console.log('EDIT BUTTON CLICKED');
  const rowData = studentTable.row($(this).parents('tr')).data();
  alertify.editDialog(createEditForm(rowData));
}


const changeRowSelected = () => {
  $('#example').on('click', 'tr', () => {
    if ($(this).hasClass('selected')) {
      $(this).removeClass('selected');
    } else {
      studentTable.$('tr.selected').removeClass('selected');
      $(this).addClass('selected');
    }
  });
};

const createViewDialog = () => {
  if (!alertify.viewDialog) {
    // define a new dialog
    alertify.dialog('viewDialog', () => ({
      main(message) {
        this.message = message;
      },
      setup() {
        return {
          buttons: [{ text: 'Exit!', key: 27/* Esc */ }],
          focus: { element: 0 },
          options: {
            maximizable: true,
            closableByDimmer: false,
            resizable: false,
            transition: 'fade',
          },
        };
      },
      prepare() {
        this.setContent(this.message);
        this.setHeader('Record Details');
      },
      hooks: {
        onshow() {
          this.elements.dialog.style.maxWidth = 'none';
          this.elements.dialog.style.width = '80%';
          this.elements.dialog.style.height = '30%';
        },
      },
    }));
  }
};

const createEditDialog = () => {
  if (!alertify.editDialog) {
    alertify.dialog('editDialog', () => ({
      main(content) {
        this.setContent(content);
      },
      setup() {
        return {
          focus: {
            element() {
              return this.elements.body.querySelector(this.get('selector'));
            },
            select: true,
          },
          options: {
            basic: true,
            maximizable: false,
            resizable: false,
            padding: false,
          },
        };
      },
      settings: {
        selector: undefined,
      },
    }));
  }
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
  editDataEvent();
  renderTable();
  changeRowSelected();
  createViewDialog();
  createEditDialog();
  deleteRecordEvent(deleteRecord);
  showEditFormEvent(displayEditForm);
});

