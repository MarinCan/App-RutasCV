var nombre = document.getElementById('nombre_parque')
var inputs = document.querySelectorAll('#contenedor-mapa input')

inputs.forEach(input => {
    input.addEventListener('mouseover', () => {
      const value = input.getAttribute('name')
      nombre.textContent = 'Parque natural: ' + value
    })
  
    input.addEventListener('mouseout', () => {
        nombre.textContent = ' '
    })
  })