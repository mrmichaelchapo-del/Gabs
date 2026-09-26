async function createOrganization() {
  const orgName = document.getElementById("orgName").value;

  const response = await fetch("/api/create-organization", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: orgName
    })
  });

  const data = await response.json();
  document.getElementById("result").innerText = JSON.stringify(data, null, 2);
}