const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { db, bucket } = require('./firebaseConfig');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post('/employee', async (req, res) => {
  const { name, email, number, image, position, id, gender, city, province, zipCode } = req.body;
  try {
    await db.collection('employees').doc(id).set({
      name, email, number, image, position, gender, city, province, zipCode
    });
    res.status(200).send({ message: 'Employee added successfully' });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get('/employees', async (req, res) => {
  const employeesSnapshot = await db.collection('employees').get();
  const employees = employeesSnapshot.docs.map(doc => doc.data());
  res.send(employees);
});

app.delete('/employee/:id', async (req, res) => {
  const { id } = req.params;
  await db.collection('employees').doc(id).delete();
  res.send({ message: 'Employee deleted successfully' });
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
