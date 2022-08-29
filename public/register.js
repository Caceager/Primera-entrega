const email = document.getElementById("mail");
const password = document.getElementById("pass");
const nombre = document.getElementById("name");
const direccion = document.getElementById("address");
const edad = document.getElementById("age");
const foto = document.getElementById("image");
const telefono = document.getElementById("phone");

async function postData(data) {
    const response = await fetch("/usuarios/nuevoUsuario",
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(data)
        });
    if(response.status === 500) alert("El usuario ya existe.");
    if(response.status === 200) {
        window.location.href = "/";
    }
}
const registerButton = document.getElementById("registerButton");
registerButton.addEventListener('click', async () => {
    const userData = {
      username: email.value,
      password: password.value,
      nombre: nombre.value,
      direccion: direccion.value,
      edad: edad.value,
      foto: foto.value,
      telefono: telefono.value,
    };

    await postData(userData);
});

