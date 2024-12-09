function getUser() {
    const body = document.body;
    let username = prompt("Write username here...");
    if (!username) {
        body.innerHTML = `User not found`;
    } else {
        fetch(`https://api.github.com/users/${username}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("User not found");
                }
                return response.json();
            })
            .then((user) => {
                // If data is present, return user details
                body.innerHTML = `
            <div style="text-align: center; font-family: Arial, sans-serif;">
              <img src="${user.avatar_url}" alt="Avatar" style="border-radius: 50%; width: 150px; height: 150px;"/>
              <h2>${user.name || "No Name"}</h2>
              <p>${user.bio || "No bio available"}</p>
              <p><strong>Public Repositories:</strong> ${user.public_repos}</p>
              <p><strong>Followers:</strong> ${user.followers}</p>
              <p><strong>Following:</strong> ${user.following}</p>
            </div>
          `;
            })
            .catch((error) => {
                body.innerHTML = `Error: ${error.message}`;
            });
    }
}

getUser();