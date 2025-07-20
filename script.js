// Extensión para obtener número de semana
Date.prototype.getWeek = function () {
  const d = new Date(this.getFullYear(), this.getMonth(), this.getDate());
  const dayNum = d.getDay() || 7;
  d.setDate(d.getDate() + 4 - dayNum);
  const yearStart = new Date(d.getFullYear(), 0, 1);
  return Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
};

fetch('danmei.json')
  .then(res => res.json())
  .then(data => {
    mostrarLibros(data);
    mostrarEstadisticas(data);
  });

function mostrarLibros(libros) {
  libros.forEach(libro => {
    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = `
      <img src="${libro.portada}" alt="portada">
      <div>
        <h3>${libro.titulo}</h3>
        <p><strong>Autor:</strong> ${libro.autor}</p>
        <p>${libro.sinopsis}</p>
        <button onclick="moverEstado(${libro.id}, 'leído')">✔ Leído</button>
        <button onclick="moverEstado(${libro.id}, 'leyendo')">📖 Leyendo</button>
        <button onclick="moverEstado(${libro.id}, 'comprar')">🛒 Comprar</button>
      </div>
    `;
    document.getElementById(libro.estado).appendChild(div);
  });
}

function mostrarEstadisticas(libros) {
  const ahora = new Date();
  const semanaActual = ahora.getWeek();
  const mes = ahora.getMonth();
  const año = ahora.getFullYear();

  let semana = 0, mesCount = 0, añoCount = 0;

  libros.forEach(libro => {
    if (libro.estado === "leído" && libro.fecha_leido) {
      const fecha = new Date(libro.fecha_leido);
      if (fecha.getFullYear() === año) añoCount++;
      if (fecha.getMonth() === mes) mesCount++;
      if (fecha.getWeek() === semanaActual) semana++;
    }
  });

  document.getElementById('semana').textContent = semana;
  document.getElementById('mes').textContent = mesCount;
  document.getElementById('año').textContent = añoCount;
}

function moverEstado(id, nuevoEstado) {
  alert("Este botón funcionará si editas manualmente el JSON, o con backend/API. ¡Lo puedo hacer localmente si quieres!");
}
