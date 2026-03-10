const express = require("express");
const cors = require("cors");
const multer = require("multer");
const client = require("./bot");

const app = express();

const upload = multer({ storage: multer.memoryStorage() });

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const GUILD_ID = process.env.GUILD_ID;

app.get("/ping", (req, res) => {
  res.send("alive");
});

app.get("/data", async (req, res) => {

  try {

    const guild = await client.guilds.fetch(GUILD_ID);

    const channels = await guild.channels.fetch();
    const roles = await guild.roles.fetch();

    const channelList = channels
      .filter(c => c.type === 0)
      .map(c => ({
        id: c.id,
        name: c.name
      }));

    const roleList = roles
      .filter(r => r.name !== "@everyone")
      .map(r => ({
        id: r.id,
        name: r.name
      }));

    res.json({
      channels: channelList,
      roles: roleList
    });

  } catch (err) {

    console.log(err);

    res.json({
      channels: [],
      roles: []
    });

  }

});

app.post("/send", upload.single("image"), async (req, res) => {

  try {

    const { channel, role, title, message } = req.body;

    const ch = await client.channels.fetch(channel);

    const files = [];

    if (req.file) {
      files.push({
        attachment: req.file.buffer,
        name: req.file.originalname
      });
    }

    await ch.send({

      content: role ? `<@&${role}>` : "",

      embeds: [
        {
          title: title,
          description: message,
          color: 5865,

          thumbnail: {
            url: "https://i.imgur.com/AfFp7pu.png"
          },

          footer: {
            text: "Server Ankündigung"
          },

          timestamp: new Date()
        }
      ],

      files: files

    });

    res.json({ success: true });

  } catch (err) {

    console.log(err);
    res.json({ success: false });

  }

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Panel gestartet");
});
