import { useState } from "react";

function AddEmployeeInformation(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [image, setImage] = useState("");
  const [position, setPosition] = useState("");
  const [id, setId] = useState("");
  const [gender, setGender] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [zipCode, setZipCode] = useState("");

  const add = () => {
    if (!id || isNaN(id)) {
      alert("Invalid ID. Please enter a valid ID.");
      return;
    }

    // Create an employee object
    const employee = {
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

    // Save the employee object to local storage
    const employees = JSON.parse(localStorage.getItem("employees")) || [];
    employees.push(employee);
    localStorage.setItem("employees", JSON.stringify(employees));

    alert("Employee added successfully!");

    // Clear the input fields
    setName("");
    setEmail("");
    setNumber("");
    setImage("");
    setPosition("");
    setId("");
    setGender("");
    setCity("");
    setProvince("");
    setZipCode("");
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="form-container">
      <div className="left-column">
        <input
          className="input-name"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <input
          className="input-email"
          type="text"
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
      </div>
      <div className="right-column">
        <input
          className="input-id"
          type="text"
          placeholder="ID"
          value={id}
          onChange={(event) => setId(event.target.value)}
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
          placeholder="ZipCode"
          value={zipCode}
          onChange={(event) => setZipCode(event.target.value)}
        />
      </div>
      <button onClick={add} className="Add-button">Add information</button>
    </div>
  );
}

export default AddEmployeeInformation;
