const mostrar = document.getElementById('mostrar');
const ingresar = document.getElementById('ingresar');
const btnDesplegar = document.getElementById('btnDesplegar');
const btnCancelar = document.getElementById('cancelar');
const formIngreso = document.getElementById('formIngreso');
const eliminar = document.querySelectorAll('.eliminar');
const actualizar = document.querySelectorAll('.actualizar');

const eliminarMascota = async (id) => {
    console.log("se esta eliminando " + id);
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
    console.log("se esta actualizando " + id);
    let idMascota = document.querySelectorAll('.idMascota');
    let nomMascota = document.querySelectorAll('.nomMascota');
    let nomTutor = document.querySelectorAll('.nomTutor');
    let inputEsp = document.querySelectorAll('.inputEsp');
    let inputRaza = document.querySelectorAll('.inputRaza');
    let inputColor = document.querySelectorAll('.inputColor');
    let inputSexo = document.querySelectorAll('.inputSexo');
    let iconUpd = document.querySelectorAll('.iconUpd');
    console.log(nomMascota[0].value);
    console.log(idMascota[0].value);
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
                tutor: nomTutor[posicion].value,
                especie: inputEsp[posicion].value,
                raza: inputRaza[posicion].value,
                color: inputColor[posicion].value,
                sexo: inputSexo[posicion].value
            })
        })
        console.log("se esta intentando ejecutar el put");
    } catch (error) {
        console.log(error);
    }
};

const buscarId = async (id) => {
    try {
        console.log("se esta buscando un id en particular")
        const response = await fetch(`dashboardPets/${id}`);
        const json = await response.json();
        return json;
    } catch (error) {
        console.log(error);
    }
}

btnDesplegar.addEventListener('click', () => {
    console.log("se esta ejecutando el código del boton desplegar");
    if (ingresar.style.display == 'none') {
        ingresar.style.display = 'block';
        mostrar.style.display = 'none';
    } else {
        ingresar.style.display = 'none';
        mostrar.style.display = 'block';
    }
});

btnCancelar.addEventListener('click', () => {
    console.log("Se esta ejecutando el código que esta en el botón cancelar");
    ingresar.style.display = 'none';
    mostrar.style.display = 'block';
    formIngreso.reset();
});