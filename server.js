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

  let guild = client.guilds.cache.first()

  let channels = guild.channels.cache
  .filter(c=>c.type===0)
  .map(c=>({id:c.id,name:c.name}))

  let roles = guild.roles.cache
  .filter(r=>!r.managed)
  .map(r=>({id:r.id,name:r.name}))

  res.json({channels,roles})

})

app.post("/send", async (req,res)=>{

  let {channel,role,title,message} = req.body

  let ch = await client.channels.fetch(channel)

  let content = ""

  if(role) content = `<@&${role}>`

await ch.send({
content: role ? `<@&${role}>` : "",
embeds: [
{
title: title,
description: message,
color: 0x5865F2,

fields: [
{
name: "👥 Benachrichtigung",
value: role ? `<@&${role}>` : "Keine Rolle"
},
{
name: "🔗 Links",
value: "[🌐 Webseite](https://seite.de) | [📜 Regeln](https://seite.de/regeln)"
}
],

footer: {
text: "Server Ankündigung"
},

timestamp: new Date()
}
]
})

  res.json({success:true})

})

const PORT = process.env.PORT || 3000

app.listen(PORT,()=>{
  console.log("Server läuft")
})