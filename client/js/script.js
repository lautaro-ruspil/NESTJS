document.addEventListener('DOMContentLoaded', () => {
  async function obtenerCanciones() {
    const obtenerDatos = document.querySelector('#obtenerDatos');
    obtenerDatos.addEventListener('click', () => {
      fetch('http://localhost:3000/track')
        .then((res) => res.json())
        .then((data) => {
          const contenedor = document.querySelector('#lista-canciones');
          contenedor.innerHTML = ``; // Limpiar Contenedor
          data.forEach((cancion) => {
            const itemCancion = document.createElement('li');
            const detalles = document.createElement('ul');

            Object.entries(cancion).forEach(([clave, valor]) => {
              const liDetalle = document.createElement('li');
              liDetalle.textContent = `${clave}: ${valor}`;
              detalles.appendChild(liDetalle);
            });
            itemCancion.appendChild(detalles);
            contenedor.appendChild(itemCancion);
          });
        });
    });
  }

  const formCancion = document.querySelector('#form-cancion');
  formCancion.addEventListener('submit', async (e) => {
    e.preventDefault();

    const title = document.querySelector('#title').value;
    const duration = document.querySelector('#duration').value;
    const artist = document.querySelector('#artist').value;

    if (!title || !duration || !artist) {
      alert('Valores invalidos');
      return;
    }

    const newTrack = { title, duration, artist };

    console.log(newTrack);
    const res = await fetch('http://localhost:3000/track', {
      method: 'POST',
      body: JSON.stringify(newTrack),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      throw new Error('Error al crear la cancion');
    }

    // Vaciar form
    formCancion.reset();
    obtenerCanciones(); // Refrescar lista
  });
  obtenerCanciones();
});
