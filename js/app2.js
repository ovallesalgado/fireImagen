firebase.initializeApp({
    apiKey: "AIzaSyDdviIP_IsCjkjAvCZjgyxr2v_Qm_MmaYI",
    authDomain: "prueba-f3004.firebaseapp.com",
    projectId: "prueba-f3004"
});

// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();

// Aregar Documentos
function guardar() {
    var url = document.getElementById('url').value;
    var nombre = document.getElementById('nombre').value;
    var anio = document.getElementById('anio').value;

    db.collection("users").add({
            first: url,
            last: nombre,
            born: anio
        })
        .then(function (docRef) {
            console.log("Document written with ID: ", docRef.id);
            document.getElementById('url').value = '';
            document.getElementById('nombre').value = '';
            document.getElementById('anio').value = '';
        })
        .catch(function (error) {
            console.error("Error adding document: ", error);
        });
}

// Leer documentos
var tabla = document.getElementById('tabla');
db.collection("users").onSnapshot((querySnapshot) => {
    tabla.innerHTML = '';
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().first}`);
        tabla.innerHTML += `
        
            <div class="col-md-4">
                <div class="card" style="margin-top: 10px;" >
                    <img class="card-img-top" src="${doc.data().first}" alt="Card image cap">
                    <div class="card-body" style="text-align: center;">
                        <h5 class="card-title" style="text-transform: uppercase;">${doc.data().last}</h5>
                        <p class="card-text">${doc.data().born}</p>
                        <button class="btn btn-warning" id="boton" onclick="eliminar('${doc.id}')">Eliminar</button>
                        <button class="btn btn-dark" id="boton" onclick="editar('${doc.id}','${doc.data().first}','${doc.data().last}','${doc.data().born}')">Editar</button>
                    </div>
                </div>
            </div>
        `
    });
});

// Borrar datos
function eliminar(id) {
    db.collection("users").doc(id).delete().then(function () {
        console.log("Document successfully deleted!");
    }).catch(function (error) {
        console.error("Error removing document: ", error);
    });
}

//Editar Documento

function editar(id, url, nombre, anio) {
    document.getElementById('url').value = url;
    document.getElementById('nombre').value = nombre;
    document.getElementById('anio').value = anio;

    var boton = document.getElementById('boton');
    boton.innerHTML = 'Editar';

    boton.onclick = function () {
        var washingtonRef = db.collection("users").doc(id);

        // Set the "capital" field of the city 'DC'
        var url = document.getElementById('url').value;
        var nombre = document.getElementById('nombre').value;
        var anio = document.getElementById('anio').value;

        return washingtonRef.update({
                first: url,
                last: nombre,
                born: anio
            })
            .then(function () {
                console.log("Document successfully updated!");
                boton.innerHTML = 'Guardar';
                document.getElementById('url').value = '';
                document.getElementById('nombre').value = '';
                document.getElementById('anio').value = '';
            })
            .catch(function (error) {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
            });
    }



}