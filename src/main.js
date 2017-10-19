import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../public/stylesheets/style.css';

const $ = require('jquery');

require('datatables.net-bs4');
require('datatables.net-buttons-bs4');
// require('datatables.net-fixedheader-bs4')();
require('datatables.net-responsive-bs4');

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
    columnDefs: [
      {
        visible: false,
        targets: [0, 4],
      },
    ],
    ajax: {
      url: '/students',
      dataSrc: d => reFormat(d),
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
});

