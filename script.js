const formulario = document.getElementById('habito-form');
const inputNombre = document.getElementById('nombre-habito');
const selectFrecuencia = document.getElementById('frecuencia');
const listaHabitos = document.getElementById('habitos-container');

let habitos = [];

// 🔁 Recuperar hábitos guardados al cargar la página
window.addEventListener('DOMContentLoaded', () => {
  const habitosGuardados = localStorage.getItem('habitos');

  if (habitosGuardados) {
    habitos = JSON.parse(habitosGuardados);
    habitos.forEach(habito => mostrarHabitoEnPantalla(habito));
  }
});

// ✅ Mostrar hábito en pantalla con botón de eliminar
function mostrarHabitoEnPantalla(habito) {
  const item = document.createElement('li');
  item.textContent = `${habito.nombre} - Frecuencia: ${habito.frecuencia}`;

  const botonEliminar = document.createElement('button');
  botonEliminar.textContent = '🗑️';
  botonEliminar.title = 'Eliminar hábito';
  botonEliminar.classList.add('boton-eliminar');

  // ✂️ Evento para eliminar el hábito
  botonEliminar.addEventListener('click', () => {
    // Eliminar del arreglo
    habitos = habitos.filter(h => h.nombre !== habito.nombre);

    // Actualizar localStorage
    localStorage.setItem('habitos', JSON.stringify(habitos));

    // Eliminar del DOM
    item.remove();
  });

  item.appendChild(botonEliminar);
  listaHabitos.appendChild(item);
}

// 🧠 Manejo del formulario
formulario.addEventListener('submit', function(evento) {
  evento.preventDefault();

  const nombre = inputNombre.value.trim();
  const frecuencia = selectFrecuencia.value;

  if (nombre === '') {
    alert('Por favor escribe un nombre para el hábito.');
    return;
  }

  const nuevoHabito = {
    nombre,
    frecuencia
  };

  habitos.push(nuevoHabito);
  localStorage.setItem('habitos', JSON.stringify(habitos));

  mostrarHabitoEnPantalla(nuevoHabito);
  inputNombre.value = '';
  selectFrecuencia.selectedIndex = 0;
});
