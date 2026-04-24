const API_URL = "http://35.158.184.170:3000";

async function registerUser() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;

  if (!name || !email) {
    document.getElementById("response").innerText = "Fill all fields";
    return;
  }

  try {
    const res = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email })
    });

    const text = await res.text();
    document.getElementById("response").innerText = text;

  } catch (err) {
    document.getElementById("response").innerText = "Error connecting to server";
  }
}
