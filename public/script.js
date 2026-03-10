async function load() {

  const res = await fetch("/data");
  const data = await res.json();

  const ch = document.getElementById("channels");
  const rl = document.getElementById("roles");

  data.channels.forEach(c => {

    let opt = document.createElement("option");
    opt.value = c.id;
    opt.textContent = "# " + c.name;

    ch.appendChild(opt);

  });

  data.roles.forEach(r => {

    let opt = document.createElement("option");
    opt.value = r.id;
    opt.textContent = "@ " + r.name;

    rl.appendChild(opt);

  });

}

async function send() {

  let form = new FormData();

  form.append("channel", channels.value);
  form.append("role", roles.value);
  form.append("title", title.value);
  form.append("message", message.value);

  const file = document.getElementById("image").files[0];

  if (file) {
    form.append("image", file);
  }

  await fetch("/send", {
    method: "POST",
    body: form
  });

  alert("Ankündigung gesendet");

}

load();
