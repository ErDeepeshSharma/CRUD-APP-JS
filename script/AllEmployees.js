const employeeContainerEle= document.getElementById("employees-container")

async function getAllEmployees(){
    try {
        let resp=await fetch("https://crud-app-js-h741.onrender.com/employees");
        let data =await resp.json();
        console.log(data);
        displayEmployees(data);
    } catch (err) {
        console.log(err);
        alert("Something went wrong");
    }
}

//? call function after dom tree creation
window.addEventListener("DOMContentLoaded",()=>{
    getAllEmployees();
});

function displayEmployees(allEmployees){
    allEmployees.map((emp) => {
        const empCard= document.createElement("article");
        empCard.innerHTML=`
        <header class="emp-header">
        <h3 class="emp-name">
         ${emp.firstName} ${emp.middleName} ${emp.lastName}</h3>
        <span class="emp-id">ID: ${emp.id}</span>
        </header>

        <section class="emp-info"> 
            <p> <strong>Date of birth:</strong> ${emp.dob}</p>
            <p><strong> Marital status:</strong>${emp.maritalStatus}</p>
            </section>
     <section class="emp-contact">
    
      <p><strong>Email:</strong>${emp.email}</p>
      <p><strong>Phone:</strong>${emp.mobile}</p>
    </section>
    <section class="emp-address">
      <p><strong>Address:</strong></p>
      <p>
          ${emp.address.street},${emp.address.city},<br>
          ${emp.address.state},${emp.address.country},${emp.address.pincode}
      </p>
    </section><br>
    <footer class="emp-actions">
      <button class="btn edit-btn" data-id="${emp.id}">Edit</button>
      <button class="btn delete-btn" data-id="${emp.id}">Delete</button>
    </footer>
        `;

        const deleteBtn=empCard.querySelector(".delete-btn");
        deleteBtn.addEventListener("click",()=>{
            handleDelete(emp.id);
        });
        const editBtn=empCard.querySelector(".edit-btn");
        editBtn.addEventListener("click",()=>{
            handleEdit(emp.id);
        });

        employeeContainerEle.append(empCard)
    });
}

async function handleDelete(id) {
    console.log(id);
    try{
        let resp=await fetch(`https://crud-app-js-h741.onrender.com/employees/${id}`,{
            method:"DELETE",
        });
        console.log(resp);
    }catch(error){

        console.log(error);
        alert("Unable to delete");
    }
}

function handleEdit(id) {
    window.location.href = `EditEmployee.html?id=${id}`;
}