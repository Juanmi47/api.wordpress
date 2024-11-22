async function consultarYPublicarTiempo() {
    try {
        // Consultamos la API de AEMET para la provincia de Murcia
        const response = await fetch('https://www.el-tiempo.net/api/json/v2/provincias/30');
        const data = await response.json();

        // Verificamos que los datos de la respuesta estén presentes
        if (data && data.today && data.today.p) {
            // Extraemos los datos relevantes
            const descripcionHoy = data.today.p;
            const ciudades = data.ciudades.map(ciudad => {
                return `${ciudad.name}: ${ciudad.stateSky.description}, Temp. Max: ${ciudad.temperatures.max}°C, Temp. Min: ${ciudad.temperatures.min}°C`;
            }).join("\n");

            const contenidoTiempo = `
                Información del tiempo para la provincia de Murcia:
                \n\nDescripción general hoy: ${descripcionHoy}
                \n\nCiudades:
                ${ciudades}
            `;

            // Enviamos los datos de la API a nuestro blog
            const postData = {
                title: "Informe del Tiempo en Murcia",
                content: contenidoTiempo
            };

            // Publicamos en el blog
            const postResponse = await fetch('api.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(postData)
            });

            const result = await postResponse.json();

            if (postResponse.ok) {
                alert('Informe del tiempo publicado correctamente.');
            } else {
                console.error(result);
                alert('Error al publicar el informe del tiempo.');
            }
        } else {
            alert('No se pudo obtener la información del tiempo.');
        }
    } catch (error) {
        console.error(error);
        alert('Error al consultar la API de AEMET.');
    }
}
