async function load(){

const res = await fetch("/data")
const data = await res.json()

const ch = document.getElementById("channels")
const rl = document.getElementById("roles")

data.channels.forEach(c => {

let opt = document.createElement("option")
opt.value = c.id
opt.textContent = "# " + c.name
ch.appendChild(opt)

})

data.roles.forEach(r => {

let opt = document.createElement("option")
opt.value = r.id
opt.textContent = "@ " + r.name
rl.appendChild(opt)

})

}

async function send(){

await fetch("/send",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

channel:channels.value,
role:roles.value,
title:title.value,
message:message.value

})

})

alert("Ankündigung gesendet")

}

load()
