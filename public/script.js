async function load(){

let data = await fetch("/data").then(r=>r.json())

let ch = document.getElementById("channels")
let rl = document.getElementById("roles")

data.channels.forEach(c=>{

let o=document.createElement("option")
o.value=c.id
o.textContent="# "+c.name
ch.appendChild(o)

})

data.roles.forEach(r=>{

let o=document.createElement("option")
o.value=r.id
o.textContent="@ "+r.name
rl.appendChild(o)

})

}

async function send(){

let payload={

channel:channels.value,
role:roles.value,
title:title.value,
message:message.value,
image:image.value

}

await fetch("/send",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify(payload)

})

alert("Ankündigung gesendet")

}

load()
