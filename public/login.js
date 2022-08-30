const submit = document.getElementById("submitButton");
const username = document.getElementById("username");
const password = document.getElementById("password");

async function callLogin(body) {
    const response = await fetch("/usuarios/login",
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(body)
        });
    if(response.status === 500) alert("Contraseña incorrecta.");
    if(response.status === 200) {
        window.location.href = "/usuarios/profile";
    }
}
submit.addEventListener('click', async () => {
    const body = {
        username: username.value,
        password: password.value,
    }
    await callLogin(body);
});