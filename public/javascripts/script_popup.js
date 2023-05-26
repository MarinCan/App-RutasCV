
// var lat = 39.47
// var long = -.37

const lat = document.getElementById("latitud").innerHTML.trim()
const long = document.getElementById("longitud").innerHTML.trim()

var api = "https://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+long+"&appid=dc77cef654c2f914ef4a9fe3da9bd8da&units=metric&lang=es"

fetch(api)
.then(response => response.json())
.then(data => {

    var temp_actual = Math.round(data.list[0].main.temp)
    var icono_actual = data.list[0].weather[0].icon
    var fecha_actual = data.list[0].dt_txt
    var tiempo_actual = data.list[0].weather[0].description.charAt(0).toUpperCase() + data.list[0].weather[0].description.slice(1)

    document.getElementById("municipio").textContent = data.city.name 
    document.getElementById("temp_hoy").textContent = temp_actual + " ºC"
    document.getElementById("icono_hoy").classList.add(icono_api(icono_actual))
    document.getElementById("tiempo_hoy").textContent = tiempo_actual 

    document.getElementById("temp_hoy2").textContent = temp_actual + " ºC"
    document.getElementById("icono_hoy2").classList.add(icono_api(icono_actual))

    for ( let i=0; i<data.list.length; i++ ) {
        if ( data.list[i].dt_txt.split(" ")[0] != fecha_actual.split(" ")[0] ){

            var id_dia1 = i
            var id_dia2 = i + 8
            var id_dia3 = i + 16
            var id_dia4 = i + 24
            break
        }
    }

    var dia_dia1 = diaSemana_tiempo(data.list[id_dia1].dt_txt) + " " + data.list[id_dia1].dt_txt.split(" ")[0].split('-')[2]
    var dia_dia2 = diaSemana_tiempo(data.list[id_dia2].dt_txt) + " " + data.list[id_dia2].dt_txt.split(" ")[0].split('-')[2]
    var dia_dia3 = diaSemana_tiempo(data.list[id_dia3].dt_txt) + " " + data.list[id_dia3].dt_txt.split(" ")[0].split('-')[2]
    var dia_dia4 = diaSemana_tiempo(data.list[id_dia4].dt_txt) + " " + data.list[id_dia4].dt_txt.split(" ")[0].split('-')[2]

    var tiempo_dia1 = data.list[id_dia1+4].weather[0].icon
    var tiempo_dia2 = data.list[id_dia2+4].weather[0].icon
    var tiempo_dia3 = data.list[id_dia3+4].weather[0].icon
    var tiempo_dia4 = data.list[id_dia4+4].weather[0].icon

    var temp_dia1 = [data.list[id_dia1].main.temp, data.list[id_dia1+1].main.temp, data.list[id_dia1+2].main.temp, 
                    data.list[id_dia1+3].main.temp, data.list[id_dia1+4].main.temp, data.list[id_dia1+5].main.temp, 
                    data.list[id_dia1+6].main.temp, data.list[id_dia1+7].main.temp]
    var temp_max_dia1 = Math.round(Math.max(...temp_dia1)) 
    var temp_min_dia1 = Math.round(Math.min(...temp_dia1))

    var temp_dia2 = [data.list[id_dia2].main.temp, data.list[id_dia2+1].main.temp, data.list[id_dia2+2].main.temp, 
                    data.list[id_dia2+3].main.temp, data.list[id_dia2+4].main.temp, data.list[id_dia2+5].main.temp, 
                    data.list[id_dia2+6].main.temp, data.list[id_dia2+7].main.temp]
    var temp_max_dia2 = Math.round(Math.max(...temp_dia2))
    var temp_min_dia2 = Math.round(Math.min(...temp_dia2))

    var temp_dia3 = [data.list[id_dia3].main.temp, data.list[id_dia3+1].main.temp, data.list[id_dia3+2].main.temp, 
                    data.list[id_dia3+3].main.temp, data.list[id_dia3+4].main.temp, data.list[id_dia3+5].main.temp, 
                    data.list[id_dia3+6].main.temp, data.list[id_dia3+7].main.temp]
    var temp_max_dia3 = Math.round(Math.max(...temp_dia3))
    var temp_min_dia3 = Math.round(Math.min(...temp_dia3))

    var temp_dia4 = [data.list[id_dia4].main.temp, data.list[id_dia4+1].main.temp, data.list[id_dia4+2].main.temp, 
                    data.list[id_dia4+3].main.temp, data.list[id_dia4+4].main.temp, data.list[id_dia4+5].main.temp, 
                    data.list[id_dia4+6].main.temp, data.list[id_dia4+7].main.temp]
    var temp_max_dia4 = Math.round(Math.max(...temp_dia4))
    var temp_min_dia4 = Math.round(Math.min(...temp_dia4))


    document.getElementById("dia1_fecha").textContent = dia_dia1 
    document.getElementById("dia1_temp").textContent = temp_min_dia1 + "º - " + temp_max_dia1 + "º"
    document.getElementById("dia1_tiempo").classList.add(icono_api(tiempo_dia1))
    alarma_icono("dia1_tiempo", tiempo_dia1, temp_min_dia1, temp_max_dia1)

    document.getElementById("dia2_fecha").textContent = dia_dia2 
    document.getElementById("dia2_temp").textContent = temp_min_dia2 + "º - " + temp_max_dia2 + "º"
    document.getElementById("dia2_tiempo").classList.add(icono_api(tiempo_dia2))
    alarma_icono("dia2_tiempo", tiempo_dia2, temp_min_dia2, temp_max_dia2)

    document.getElementById("dia3_fecha").textContent = dia_dia3 
    document.getElementById("dia3_temp").textContent = temp_min_dia3 + "º - " + temp_max_dia3 + "º"
    document.getElementById("dia3_tiempo").classList.add(icono_api(tiempo_dia3))
    alarma_icono("dia3_tiempo", tiempo_dia3, temp_min_dia3, temp_max_dia3)

    document.getElementById("dia4_fecha").textContent = dia_dia4 
    document.getElementById("dia4_temp").textContent = temp_min_dia4 + "º - " + temp_max_dia4 + "º"
    document.getElementById("dia4_tiempo").classList.add(icono_api(tiempo_dia4))
    alarma_icono("dia4_tiempo", tiempo_dia4, temp_min_dia4, temp_max_dia4)


})
.catch(error => {
    console.error('Error:', error);
});



// Funciones para cualquier pop-up (tiempo e imágenes):
function abrirPopup(contenedor){
    const popup_contenedor = document.getElementById(contenedor);
    popup_contenedor.style.display = "flex";
}

function abrirPopup2(contenedor, url, atrib){
    const popup_contenedor = document.getElementById(contenedor);
    popup_contenedor.style.display = "flex";
    // console.log(url)
    // console.log(atrib)

    document.getElementById('foto').setAttribute("src", url)
    document.getElementById('atribucion-foto').innerHTML = atrib

}

function cerrarPopup(contenedor){
    const popupContainer = document.getElementById(contenedor);
    popupContainer.style.display = "none"
}

// Función para transformar la fecha de la api en formato 'dia semana - número día':
function diaSemana_tiempo(fecha) {
    const diasSemana = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    const partesFecha = fecha.split(' ')[0].split('-'); // Se obtiene la parte de la fecha sin la hora
    const anyo = parseInt(partesFecha[0]);
    const mes = parseInt(partesFecha[1]) - 1; // Los meses en JavaScript están indexados desde 0
    const dia = parseInt(partesFecha[2]);
    
    const fechaCompleta = new Date(anyo, mes, dia);
    const diaSemana = fechaCompleta.getDay();
    
    return diasSemana[diaSemana];
}

// Función transformar id_weather de la api con su icono correspondiente:
function icono_api(id_icono){

    if (id_icono == "01d"){
        return "fa-sun"
    } 
    else if (id_icono == "01n"){
        return "fa-moon"
    } 
    else if ( id_icono == "02d" ){
        return "fa-cloud-sun"
    } 
    else if (id_icono == "02n"){
        return "fa-cloud-moon"
    } 
    else if (id_icono == "03d" || id_icono == "04d" || id_icono == "03n" || id_icono == "04n" ){
        return "fa-cloud"
    } 
    else if (id_icono == "09d" || id_icono == "09n" ){
        return "fa-cloud-showers-heavy"
    } 
    else if ( id_icono == "10d" ){
        return "fa-cloud-sun-rain"
    } 
    else if (id_icono == "10n"){
        return "fa-cloud-moon-rain"
    } 
    else if (id_icono == "11d" || id_icono == "11n" ){
        return "fa-cloud-bolt"
    } 
    else if (id_icono == "13d" || id_icono == "13n" ){
        return "fa-snowflake"
    } 
    else if (id_icono == "50d" || id_icono == "50n" ){
        return "fa-smog"
    } 
    else {
        return "fa-circle-question"
    }
}

// Función para incluir el icono de alarma en la tabla:
function alarma_icono(id, icono, t_min, t_max){

    var tiempos_malos = ["09d","10d","11d","13d"]
    
    if ( t_min < 5 ){
        document.getElementById("sin-alertas").textContent = ""
        document.getElementById("alarma-temp").textContent = "Temperaturas bajas"
    }
    if ( t_max > 30 ){
        document.getElementById("sin-alertas").textContent = ""
        document.getElementById("alarma-temp").textContent = "Temperaturas altas"
    }
    if ( tiempos_malos.includes(icono) ){
        document.getElementById("sin-alertas").textContent = ""
        document.getElementById("tiempo_malo").textContent = "Tiempo desfavorable"
    }

    
    var add_warning = document.getElementById(id)
    var icono_warning = document.createElement("i")
    icono_warning.className = "fa-solid fa-triangle-exclamation"
    icono_warning.id = "warning"

    if (tiempos_malos.includes(icono) || ( t_min < 5 ) || ( t_max > 30 ) ) {
        add_warning.appendChild(icono_warning)
    }
}