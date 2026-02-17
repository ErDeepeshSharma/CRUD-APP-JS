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

const params= new URLSearchParams(window.location.search)
const id= params.get("id");

async function getEditEmployee() {
    
    try{
        let resp=await fetch(`http://localhost:5000/employees/${id}`);
        let data= await resp.json();
        console.log(data);

        //? pre-filled input fields
        firstNameEle.value= data.firstName;
        lastNameEle.value= data.lastName;
        maritalStatusEle.value= data.maritalStatus;
        dobEle.value= data.dob;
        emailEle.value= data.email;
        moblieEle.value= data.mobile;
        streetEle.value=data.address.street;
        cityEle.value=data.address.city;
        stateEle.value=data.address.state;
        countryEle.value=data.address.country;
        pincodeEle.value=data.address.pincode;
        
    }catch(error){
        console.log(error);
        alert("something went wrong")
    }

}

window.addEventListener("DOMContentLoaded",()=>{
    getEditEmployee();
});


employeeFormEle.addEventListener("submit", async (e)=>{
    e.preventDefault();

    // create new updated emp object
  let updatedEmployeeData = {
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

  try{
  let resp= await fetch(`http://localhost:5000/employees/${id}`,{
    method:"put";
    headers: {
        "Content-Type":"application/json",
    },
    body: JSON.stringify(updatedEmployeeData),
  });
    }catch(err){
        console.log(err);
        
    }   
});