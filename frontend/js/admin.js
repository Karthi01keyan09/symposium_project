document.getElementById("adminLoginForm").addEventListener("submit", function(e){

e.preventDefault();

const username = document.getElementById("username").value;
const password = document.getElementById("password").value;

fetch("https://symposium-backend-vgyc.onrender.com/admin/login",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({username,password})

})

.then(res=>res.json())

.then(data=>{

if(data.success){

window.location.href="dashboard.html";

}else{

alert("Invalid login");

}

});

});