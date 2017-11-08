import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-datepicker';
import 'bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css';
import 'alertifyjs/build/css/alertify.min.css';
import 'datatables.net-select-bs4/css/select.bootstrap4.min.css';
import '../public/stylesheets/style.css';

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

const displayData = data => (
  `<div class="card" style="padding-right: 1rem">
    <div class="card-body">
      <h4 class="card-title">FULL DETAILS</h4>
      <div class="card-text">
        <form id="display--form">
          <div class="form-group row">
            <label for="fullName" class="col-md-4" style="text-align: center; padding-top: 0.5rem">Name</label>
            <input type="text" class="form-control col-md-8" id="fullName" name="name" value="${data[1]}" disabled>
          </div>
          <div class="form-group row">
            <label for="age" class="col-md-4" style="text-align: center; padding-top: 0.5rem">Age</label>
            <input type="text" class="form-control col-md-8" id="age" name="age" value="${data[2]}" disabled>
          </div>
          <div class="form-group row">
            <label for="course" class="col-md-4" style="text-align: center; padding-top: 0.5rem">Course</label>
            <input type="text" class="form-control col-md-8" id="course" name="course" value="${data[3]}" disabled>
          </div>
        </form>
      </div>
    </div>
   </div>`);

const createEditForm = data => (
  `<div class="card">
    <div class="card-body">
      <h4 class="card-title">Edit Record</h4>
      <div class="card-text">
        <form id="editForm" action="/students/${data[1]}" method="POST">
            <input type="text" class="form-control" id="id" style="visibility: hidden" name="id" value="${data[0]}">
          <div class="form-group">
            <label for="fullName">Name</label>
            <input type="text" class="form-control" id="fullName" placeholder="Full Name" name="editedName" value="${data[1]}" required pattern="[A-Za-z ]+">
          </div>
          <div class="row">
            <div class="form-group col-md-6">
              <label for="age">Age</label>    
              <input type="text" class="form-control" id="age" placeholder="Age" name="editedAge" value="${data[2]}" required pattern="[0-9]+">
            </div>
            <div class="form-group col-md-6">
              <label for="gender">Gender:</label>
              <select class="form-control select-style" id="gender" name="editedGender">
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>
          <div class="row">
            <div class="form-group col-md-6">
              <label for="date">Date of Birth</label>
              <input type="text" class="form-control" id="date" placeholder="Date of Birth" name="editedDate" 
                value="${data[4]}" data-provide="datepicker" required>
            </div>
            <div class="form-group col-md-6">
              <label for="phone">Phone</label>
              <input type="text" class="form-control" id="phone" placeholder="Phone" name="editedPhone" value="${data[5]}"
                required pattern="[0-9]{11}">
            </div>
          </div>
          <div class="form-group">
            <label for="email">E-Mail Address</label>
            <input type="email" class="form-control" id="email" placeholder="Email" name="editedEmail" value="${data[6]}" 
               required>
          </div>
          <div class="form-group">
            <label for="address">Residential Address</label>
            <input type="text" class="form-control" id="address" placeholder="Residential Address" name="editedAddress" 
              value="${data[7]}" required>
          </div>
          <div class="row">
            <div class="form-group col-md-9">
              <label for="course">Course</label>
              <input type="text" class="form-control" id="course" placeholder="Course" name="editedCourse" value="${data[8]}"
                required pattern="[A-Za-z ]+">
            </div>
            <div class="form-group col-md-3">
              <label for="grade">Grade</label>
              <input type="text" class="form-control" id="grade" placeholder="Grade" name="editedGrade" value="${data[9]}"
                required pattern="[0-9][.][0-9][0-9]">
            </div>
          </div>
      
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
       </div>
      </div>
   </div>`
);

const createAddForm = () => (
  `<div class="card">
    <div class="card-body">
      <h4 class="card-title">Add New Record</h4>
      <div class="card-text">
       <form id="student--form" action="/students" method="POST">
        <div class="form-group">
          <label for="fullName">Name</label>
          <input type="text" class="form-control" id="fullName" placeholder="Full Name" name="name" required pattern="[A-Za-z ]+">
        </div>
        <div class="row">
          <div class="form-group col-md-6">
            <label for="age">Age</label>    
            <input type="text" class="form-control" id="age" placeholder="Age" name="age" required pattern="[0-9]+">
          </div>
          <div class="form-group col-md-6">
            <label for="gender">Gender:</label>
            <select class="form-control select-style" id="gender" name="gender">
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
        </div>
        <div class="row">
          <div class="form-group col-md-6">
            <label for="date">Date of Birth</label>
            <input type="text" class="form-control" id="date" placeholder="Date of Birth" name="date" 
              data-provide="datepicker" required>
          </div>
          <div class="form-group col-md-6">
            <label for="phone">Phone</label>
            <input type="text" class="form-control" id="phone" placeholder="Phone" name="phone" required 
              pattern="[0-9]{11}">
          </div>
        </div>
        <div class="form-group">
          <label for="email">E-Mail Address</label>
          <input type="email" class="form-control" id="email" placeholder="Email" name="email" required>
        </div>
        <div class="form-group">
          <label for="address">Residential Address</label>
          <input type="text" class="form-control" id="address" placeholder="Residential Address" name="address" required>
        </div>
        <div class="row">
          <div class="form-group col-md-9">
            <label for="course">Course</label>
            <input type="text" class="form-control" id="course" placeholder="Course" name="course" 
              required pattern="[A-Za-z ]+">
          </div>
          <div class="form-group col-md-3">
            <label for="grade">Grade</label>
            <input type="text" class="form-control" id="grade" placeholder="Grade" name="grade" 
              required pattern="[0-9][.][0-9][0-9]">
          </div>
        </div>
    
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
     </div>
    </div>
   </div>`
);

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

