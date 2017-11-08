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

const displayTabulatedData = data => (
  `<h3 class="text-center">Detailed Record</h3>
   <table class="display table table-striped table-hover"  cellspacing="0" width="100%">
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Date of Birth</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>${data[1]}</td>
              <td>${data[2]}</td>
              <td>${data[3]}</td>
              <td>${data[4]}</td>
              <td>${data[5]}</td>
            </tr>
          </tbody>
        </table>
        <table class="display table table-striped table-hover"  cellspacing="0" width="100%">
          <thead>
            <tr>
              <th>Email</th>
              <th>Address</th>
              <th>Course</th>
              <th>Grade</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>${data[6]}</td>
              <td>${data[7]}</td>
              <td>${data[8]}</td>
              <td>${data[9]}</td>
            </tr>
          </tbody>
        </table>`);

export { createAddForm, createEditForm, displayTabulatedData };
