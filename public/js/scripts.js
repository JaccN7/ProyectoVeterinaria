const mostrar = document.getElementById('mostrar');
const ingresar = document.getElementById('ingresar');
const btnDesplegar = document.getElementById('btnDesplegar');
const btnCancelar = document.getElementById('cancelar');
const formIngreso = document.getElementById('formIngreso');
const eliminar = document.querySelectorAll('.eliminar');
const actualizar = document.querySelectorAll('.actualizar');
const welcome = document.querySelector('.welcome');

//infromacion para mostrar al cargar la pagina
window.addEventListener('load', () => {
    //comprobar si esta logueado
    if (localStorage.getItem('nombre') == null) {
        window.location.replace("/");
    } else {
        welcome.innerHTML= `Bienvenido ${localStorage.getItem('nombre')}`;
    }
});

const eliminarMascota = async (id) => {
    try {
        await fetch(`dashboardPets/${id}`, {
            method: 'DELETE'
        });
        window.location.reload();
    } catch (error) {
        console.log(error);
    }
};

const actualizarMascota = async (id) => {
    let idMascota = document.querySelectorAll('.idMascota');
    let nomMascota = document.querySelectorAll('.nomMascota');
    let nomTutor = document.querySelectorAll('.nomTutor');
    let inputEsp = document.querySelectorAll('.inputEsp');
    let inputRaza = document.querySelectorAll('.inputRaza');
    let inputColor = document.querySelectorAll('.inputColor');
    let inputSexo = document.querySelectorAll('.inputSexo');
    let iconUpd = document.querySelectorAll('.iconUpd');
    let posicion;
    try {
        for (let i = 0; i < idMascota.length; i++) {
            idMascota[i].value == id ? posicion = i : posicion;
        }
        if (nomMascota[posicion].disabled == true) {
            nomMascota[posicion].disabled = false;
            nomTutor[posicion].disabled = false;
            inputEsp[posicion].disabled = false;
            inputRaza[posicion].disabled = false;
            inputColor[posicion].disabled = false;
            inputSexo[posicion].disabled = false;
            iconUpd[posicion].classList.remove("fa-pencil", "text-primary");
            iconUpd[posicion].classList.add("fa-check", "text-success");
        } else {
            nomMascota[posicion].disabled = true;
            nomTutor[posicion].disabled = true;
            inputEsp[posicion].disabled = true;
            inputRaza[posicion].disabled = true;
            inputColor[posicion].disabled = true;
            inputSexo[posicion].disabled = true;
            iconUpd[posicion].classList.remove("fa-check", "text-success");
            iconUpd[posicion].classList.add("fa-pencil", "text-primary");
        };
        await fetch(`dashboardPets/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
                id,
                nombre: nomMascota[posicion].value,
                nombre_tutor: nomTutor[posicion].value,
                especie: inputEsp[posicion].value,
                raza: inputRaza[posicion].value,
                color: inputColor[posicion].value,
                sexo: inputSexo[posicion].value
            })
        });
    } catch (error) {
        console.log(error);
    }
};

const buscarId = async (id) => {
    try {
        const response = await fetch(`dashboardPets/${id}`);
        const json = await response.json();
        return json;
    } catch (error) {
        console.log(error);
    }
};

btnDesplegar.addEventListener('click', () => {
    if (ingresar.style.display == 'none') {
        ingresar.style.display = 'block';
        mostrar.style.display = 'none';
    } else {
        ingresar.style.display = 'none';
        mostrar.style.display = 'block';
    }
});

btnCancelar.addEventListener('click', () => {
    ingresar.style.display = 'none';
    mostrar.style.display = 'block';
    formIngreso.reset();
});

//Cerrar sesión
const cerrarSesion = () => {
    //Borrar local storage
    localStorage.removeItem('nombre');
    localStorage.removeItem('token');
    //Volver a página principal
    window.location.replace("/");
};