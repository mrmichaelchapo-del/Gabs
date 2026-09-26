async function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const formData = new FormData();
  formData.append("username", username);
  formData.append("password", password);

  const res = await fetch("login.php", {
    method: "POST",
    body: formData
  });

  const data = await res.json();

  if (data.loggedIn) {
    currentUser = data.username;

    const ownerSelect = document.getElementById("owner");
    ownerSelect.innerHTML = `<option value="${currentUser}">${currentUser}</option>`;
    ownerSelect.disabled = false;
    ownerSelect.classList.remove("locked");
  }

  document.getElementById("result").innerText = JSON.stringify(data, null, 2);
}