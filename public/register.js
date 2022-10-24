const email = document.getElementById("mail");
const password = document.getElementById("pass");
const nombre = document.getElementById("name");
const direccion = document.getElementById("address");
const edad = document.getElementById("age");
const telefono = document.getElementById("phone");

function uniqueID() {
    return Math.floor(Math.random() * Date.now())
}

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
    if(response.status === 500) alert("El usuario ya existe o los datos ingresados no son correctos.");
    if(response.status === 200) {
        if (data.file) {
            const formData = new FormData();
            formData.append('image', data.file, data.foto);
            await fetch("/usuarios/postImage", {
                method: "POST",
                body: formData,
            });
        }
        window.location.href = "/usuarios/profile";
    }
}

const registerButton = document.getElementById("registerButton");
registerButton.addEventListener('click', async () => {
    const foto = document.getElementById("image").files[0];
    const imageId = foto
        ? `profile-picture-${nombre.value.toLowerCase()}-${uniqueID()}`
        : null;
    const userData = {
      username: email.value,
      password: password.value,
      nombre: nombre.value,
      direccion: direccion.value,
      edad: edad.value,
      foto: imageId,
      telefono: telefono.value,
      file: foto,
    };
    console.log(userData);

    await postData(userData);
});

