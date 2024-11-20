async function publicarEntrada() {
    const titulo = document.getElementById('titulo').value;
    const contenido = document.getElementById('contenido').value;

    if (!titulo || !contenido) {
        alert('Por favor, rellena todos los campos.');
        return;
    }

    const data = { title: titulo, content: contenido };

    try {
        const response = await fetch('api.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (response.ok) {
            alert('Entrada publicada correctamente.');
            document.getElementById('titulo').value = '';
            document.getElementById('contenido').value = '';
        } else {
            console.error(result);
            alert('Error al publicar la entrada.');
        }
    } catch (error) {
        console.error(error);
        alert('Error al conectar con la API.');
    }
}
