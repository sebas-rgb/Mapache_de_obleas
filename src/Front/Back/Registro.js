document.getElementById("registroForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const nombre_usuario = document.getElementById("nombre_usuario").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const tipo_usuario = document.getElementById("tipo_usuario").value;
    const num_celular = document.getElementById("num_celular").value;

    const data = {
        nombre_usuario,
        email,
        contraseña: password,
        tipo_usuario,
        num_celular,
    };

    try {
        const response = await fetch("http://localhost:3000/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            alert("Usuario registrado exitosamente");
            document.getElementById("registroForm").reset();
            window.location.href = "index.html"; 
        } else {
            const error = await response.json();
            alert(`Error: ${error.message}`);
        }
    } catch (err) {
        console.error(err);
        alert("Error al registrar el usuario");
    }
});
