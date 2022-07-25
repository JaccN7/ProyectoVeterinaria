let btnLogin = document.getElementById('btnLogin');
const emailUser = document.getElementById('emailUser');
const pwd = document.getElementById('pwd');
const info = document.getElementById('info');

const iniciarSesion = async () => {
    try {
        const response = await consumirLogin(emailUser.value, pwd.value);
        let estado = response.estado;
        let message = response.message;
        let token = response.token;
        if (estado === 200) {
            info.innerHTML = `<h5 class="text-success">${message}</h5>`;
            //Guardar nombre y token en localstorage
            localStorage.setItem('nombre', response.nombre);
            localStorage.setItem('token', token);
            window.location.replace("dashboardPets");
        } else if (estado === 401) {
            info.innerHTML = `<h5 class="text-warning">${message}</h5>`;
        } else {
            info.innerHTML = `<h5 class="text-danger">${message}</h5>`;
        };
    } catch (error) {
        console.log(error);
    }
};

const consumirLogin = async (user, pwd) => {
    try {
        const response = await fetch('authUsers/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: user,
                password: pwd
            })
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};