const restorePassword = async () => {
    const newPassword = document.getElementById('newPassword').value;
    const email = document.getElementById('email').value;
    const data = {};

    if (newPassword) {
        data.email = email;
        data.newPassword = newPassword;
    }
    await fetch(`${window.location.protocol}//${window.location.host}/auth/restorePassword`, {
        method: "put",
        mode: "cors",
        cache: "no-cache",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }).then((response) => response.json())
        .then(() => {
            window.location.href = "/auth/login";
        })
        .catch((error) => {
            console.error("Error updating user password:", error);
        });

}