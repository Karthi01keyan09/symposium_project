function loadRegistrations(){

fetch("https://symposium-backend-vgyc.onrender.com/admin/registrations")

.then(res=>res.json())

.then(data=>{

const table=document.querySelector("#table tbody");

table.innerHTML="";

data.forEach(row=>{

table.innerHTML+=`
<tr>
<td>${row.id}</td>
<td>${row.name}</td>
<td>${row.email}</td>
<td>${row.event}</td>
</tr>
`;

});

});

}