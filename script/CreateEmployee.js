const employeeFormEle = document.getElementById("employee-form");
const firstNameEle = document.getElementById("firstName");
const middleNameEle = document.getElementById("middleName");
const lastNameEle = document.getElementById("lastName");
const maritalStatusEle = document.getElementById("maritalStatus");
const dobEle = document.getElementById("dob");
const emailEle = document.getElementById("email");
const moblieEle = document.getElementById("mobile");
const streetEle = document.getElementById("street");
const cityEle = document.getElementById("city");
const stateEle = document.getElementById("state");
const countryEle = document.getElementById("country");
const pincodeEle = document.getElementById("pincode");

employeeFormEle.addEventListener("submit", async (e) => {
  e.preventDefault();
  console.log("form submitted");

  // create new emp object
  let newEmployeeData = {
    firstName: firstNameEle.value.trim(),
    middleName: middleNameEle.value.trim(),
    lastName: lastNameEle.value.trim(),
    maritalStatus: maritalStatusEle.value.trim(),
    dob: dobEle.value.trim(),
    email: emailEle.value.trim(),
    mobile: moblieEle.value.trim(),
    address: {
      street: streetEle.value.trim(),
      city: cityEle.value.trim(),
      state: stateEle.value.trim(),
      country: countryEle.value.trim(),
      pincode: pincodeEle.value.trim(),
    },
  }
  console.log(newEmployeeData);
  
  try {
    let resp = await fetch("http://localhost:5000/employees", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEmployeeData), // <-- SEND EMP DATA IN JSON-FORMAT
    });
    console.log(resp);
    // navigation to all employees page
    window.location.href = "./AllEmployees.html";
  } catch (err) {
    console.log(err);
  }
});
