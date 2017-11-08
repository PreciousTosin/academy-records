import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-datepicker';
import 'bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css';
import 'alertifyjs/build/css/alertify.min.css';
import 'datatables.net-select-bs4/css/select.bootstrap4.min.css';
import '../public/stylesheets/style.css';
import { createAddForm, createEditForm, displayData } from './forms';

const $ = require('jquery');
const alertify = require('alertifyjs');
/* eslint import/no-extraneous-dependencies: 'off' */
require('datatables.net-bs4');
require('datatables.net-buttons-bs4');
require('datatables.net-responsive-bs4');
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
      null,
      null,
      null,
      null,
      null,
      null,
      {
        className: 'edit--btn',
        orderable: false,
        data: null,
        width: '5%',
      },
      {
        className: 'delete--btn',
        orderable: false,
        data: null,
        width: '5%',
      },
    ],
    lengthChange: false,
    select: {
      style: 'single',
    },
    buttons: [
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
        targets: [0, 4, 5, 7, 9, 10],
      },
      {
        targets: -1,
        data: null,
        defaultContent: '<button class="edit--btn btn btn-danger">Delete!</button>',
      },
      {
        targets: -2,
        data: null,
        defaultContent: '<button class="delete--btn btn btn-primary">Edit!</button>',
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
      gender: $('select#gender option:checked').val(),
      DOB: $('input[name=date]').val(),
      phone: $('input[name=phone]').val(),
      email: $('input[name=email]').val(),
      address: $('input[name=address]').val(),
      course: $('input[name=course]').val(),
      grade: $('input[name=grade]').val(),
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
      gender: $('select#gender option:checked').val(),
      DOB: $('input[name=editedDate]').val(),
      phone: $('input[name=editedPhone]').val(),
      email: $('input[name=editedEmail]').val(),
      address: $('input[name=editedAddress]').val(),
      course: $('input[name=editedCourse]').val(),
      grade: $('input[name=editedGrade]').val(),
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
  alertify.confirm('', () => {
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
  }).set({
    labels: { ok: 'Okay', cancel: 'Cancel' },
    padding: true,
    title: '<strong style="font-size:1rem">Delete Student Record</strong><br><hr>',
    message: '<p style="text-align: center; padding: 0;">Are you sure you want to delete?</p><br><hr>',
  });
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
          buttons: [{ text: 'Close!', className: 'btn btn-primary', key: 27/* Esc */ }],
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
        this.setHeader('');
      },
      hooks: {
        onshow() {
          this.elements.dialog.style.maxWidth = 'none';
          this.elements.dialog.style.width = '36%';
          // this.elements.dialog.style.height = '50%';
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

const initializeDatepicker = () => {
  $('.datepicker').datepicker({
    format: 'mm/dd/yyyy',
    weekStart: 'Sunday',
    startDate: '01/01/1900',
    endDate: '01/01/2050',
    startView: 1,
    maxViewMode: 1,
    todayBtn: 'linked',
    clearBtn: true,
    multidate: true,
    daysOfWeekHighlighted: '0,6',
    calendarWeeks: true,
    autoclose: true,
    todayHighlight: true,
    toggleActive: true,
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
  alertify.defaults.transition = 'slide';
  alertify.defaults.theme.ok = 'btn btn-primary';
  alertify.defaults.theme.cancel = 'btn btn-danger';
  alertify.defaults.theme.input = 'form-control';
  initializeDatepicker();
  addDataEvent();
  editDataEvent();
  renderTable();
  changeRowSelected();
  createViewDialog();
  createEditDialog();
  deleteRecordEvent(deleteRecord);
  showEditFormEvent(displayEditForm);
});

