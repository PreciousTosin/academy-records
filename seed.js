import Student from './models/students';

const data = [
  {
    name: 'Tosin Akinbobola',
    age: 15,
    gender: 'Male',
    DOB: '10/27/2002',
    phone: '05158755828',
    email: 'tosina@gmail.com',
    address: '4 Privet drive, Ogba',
    course: 'sense engineering',
    grade: 4.55,
  },
  {
    name: 'Ayo Ayodele',
    age: 12,
    gender: 'Male',
    DOB: '10/27/2005',
    phone: '02142565831',
    email: 'aayo@gmail.com',
    address: '7 Lance street, Yaba',
    course: 'ijekuje engineering',
    grade: 4.75,
  },
  {
    name: 'Katherine James',
    age: 14,
    gender: 'Female',
    DOB: '10/27/2003',
    phone: '08142763958',
    email: 'kjames@gmail.com',
    address: '5 Chevvy drive, Victoria Island',
    course: 'Wayo engineering',
    grade: 4.85,
  },
  {
    name: 'Tunde Alo',
    age: 13,
    gender: 'Male',
    DOB: '10/27/2005',
    phone: '08192848577',
    email: 'talo@gmail.com',
    address: '15 Morris drive, Ikeja',
    course: 'Woobe engineering',
    grade: 4.45,
  },
];

const seedDb = () => {
  // remove all student records
  Student.remove({}, (err) => {
    if (err) {
      console.log(err);
    }
    console.log('Removed all student records');
    // add some records
    data.forEach((seed) => {
      Student.create(seed, (error, student) => {
        if (err) {
          console.log(error);
        } else {
          console.log(`added this student: ${student}`);
        }
      });
    });
  });
};

export default seedDb;
