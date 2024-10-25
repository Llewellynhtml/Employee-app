import React, { useState, useEffect } from "react";

function Editemployee({ selectedEmployee, updateEmployee, clearSelectedEmployee }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [image, setImage] = useState(null);
  const [position, setPosition] = useState("");
  const [id, setId] = useState("");
  const [gender, setGender] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [zipCode, setZipCode] = useState("");

  useEffect(() => {
    if (selectedEmployee) {
      setName(selectedEmployee.name);
      setEmail(selectedEmployee.email);
      setNumber(selectedEmployee.number);
      setImage(selectedEmployee.image);
      setPosition(selectedEmployee.position);
      setId(selectedEmployee.id);
      setGender(selectedEmployee.gender);
      setCity(selectedEmployee.city);
      setProvince(selectedEmployee.province);
      setZipCode(selectedEmployee.zipCode);
    }
  }, [selectedEmployee]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleUpdate = () => {
    const updatedEmployee = {
      name,
      email,
      number,
      image,
      position,
      id,
      gender,
      city,
      province,
      zipCode,
    };
    
    // Update employee in application state
    updateEmployee(updatedEmployee);

    // Retrieve existing employees from local storage
    const employees = JSON.parse(localStorage.getItem("employees")) || [];

    // Find the index of the updated employee
    const index = employees.findIndex(employee => employee.id === id);
    if (index !== -1) {
      // Update the employee information in local storage
      employees[index] = updatedEmployee;
      localStorage.setItem("employees", JSON.stringify(employees));
    }

    clearSelectedEmployee();
  };

  return (
    <div className="form-container">
      <h2>Edit Employee</h2>
      <input
        className="input-name"
        type="text"
        placeholder="Name"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <input
        className="input-email"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <input
        className="input-number"
        type="text"
        placeholder="Number"
        value={number}
        onChange={(event) => setNumber(event.target.value)}
      />
      <input
        className="input-image"
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
      />
      {image && <img src={image} alt="Uploaded Preview" className="image-preview" />}
      <input
        className="input-position"
        type="text"
        placeholder="Position"
        value={position}
        onChange={(event) => setPosition(event.target.value)}
      />
      <input
        className="input-id"
        type="text"
        placeholder="ID"
        value={id}
        readOnly
      />
      <select
        className="select-gender"
        value={gender}
        onChange={(event) => setGender(event.target.value)}
      >
        <option value="" disabled>Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>
      <input
        className="input-city"
        type="text"
        placeholder="City"
        value={city}
        onChange={(event) => setCity(event.target.value)}
      />
      <select
        className="select-province"
        value={province}
        onChange={(event) => setProvince(event.target.value)}
      >
        <option value="" disabled>Select Province</option>
        <option value="Gauteng">Gauteng</option>
        <option value="KwaZulu-Natal">KwaZulu-Natal</option>
        <option value="Western Cape">Western Cape</option>
        <option value="Eastern Cape">Eastern Cape</option>
        <option value="Limpopo">Limpopo</option>
        <option value="Mpumalanga">Mpumalanga</option>
        <option value="North West">North West</option>
        <option value="Free State">Free State</option>
        <option value="Northern Cape">Northern Cape</option>
      </select>
      <input
        className="input-zipcode"
        type="text"
        placeholder="Zip Code"
        value={zipCode}
        onChange={(event) => setZipCode(event.target.value)}
      />
      <button onClick={handleUpdate} className="update-button">Update Employee</button>
      <button onClick={clearSelectedEmployee} className="cancel-button">Cancel</button>
    </div>
  );
}

export default Editemployee;
