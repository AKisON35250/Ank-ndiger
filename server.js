const express = require("express")
const cors = require("cors")
const client = require("./bot")

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static("public"))

app.get("/ping",(req,res)=>{
res.send("alive")
})

app.get("/data", async (req,res)=>{

try{

const guild = client.guilds.cache.first()

await guild.channels.fetch()
await guild.roles.fetch()

const channels = guild.channels.cache
.filter(c => c.type === 0)
.map(c => ({
id:c.id,
name:c.name
}))

const roles = guild.roles.cache
.filter(r => r.name !== "@everyone")
.map(r => ({
id:r.id,
name:r.name
}))

res.json({
channels,
roles
})

}catch(e){

console.log(e)

res.json({
channels:[],
roles:[]
})

}

})

app.post("/send", async (req,res)=>{

const {channel,role,title,message,image} = req.body

const ch = await client.channels.fetch(channel)

let ping = ""

if(role){
ping = `<@&${role}>`
}

await ch.send({

content: ping,

embeds:[
{

title:title,

description:message,

color:5865,

image:{
url:image
},

fields:[
{
name:"🔗 Links",
value:"[🌐 Webseite](https://example.com) | [📜 Regeln](https://example.com/regeln)"
}
],

footer:{
text:"Server Ankündigung"
},

timestamp:new Date()

}
]

})

res.json({success:true})

})

const PORT = process.env.PORT || 3000

app.listen(PORT,()=>{
console.log("Panel läuft")
})
