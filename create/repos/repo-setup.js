async function createRepo() {
  if (!currentUser) {
    document.getElementById("result").innerText = "You must log in first.";
    return;
  }

  const owner = document.getElementById("owner").value;
  const name = document.getElementById("repoName").value;
  const visibility = document.getElementById("visibility").value;
  const readme = document.getElementById("readme").value === "true";

  const response = await fetch("/api/repos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      owner,
      name,
      visibility,
      readme
    })
  });

  const data = await response.json();

  // Redirect to repo page with repo name in URL
  window.location.href = `repo.html?name=${encodeURIComponent(name)}`;
}