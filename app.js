const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');
const contenedor = document.querySelector('.container');

formulario.addEventListener('submit',BuscarClima);

function BuscarClima(e){
    e.preventDefault();
    const ciudad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;

    console.log(ciudad);
    console.log(pais);

    if(ciudad===''|| pais===''){
        MostrarError('Ambos campos son obligatorios');
        return;
    }

    consultarAPI(ciudad,pais);


  
}

function MostrarError(mensaje){
    const alerta= document.querySelector('.bg-red-100');
    if(!alerta){
        const alerta = document.createElement('div');
        alerta.classList.add('bg-red-100',"border-red-400","text-red-700","px-4","py-3","rounded","relative","max-w-wd","mx-auto","mt-6","text-center");
        alerta.innerHTML=`
        <strong class="font-bold">Error!</strong>
        <span class="block sm:inline">${mensaje}</span>
        `;

        contenedor.appendChild(alerta);

    }

    
}

function consultarAPI(ciudad,pais){
    const keyappi='c1341a67a16ace8e194eaa7ee4ec1961';
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${keyappi}`;

    fetch(url) // URL
    .then( response => response.json())
    .then(result =>{
        LimpiarHtml();
        if (result.cod ==="404"){
            MostrarError('Ciudad No encontrada');
        }
        else{
        MostrarClima(result);
        }
        console.log(result);
    })
    .catch(error =>  console.log(error))
}

function MostrarClima(datos)
{
    
const {name,main:{temp,temp_max,temp_min}}=datos;

const grados= parseInt(temp - 273.15) ;
const max= parseInt(temp_max - 273.15) ;
const min= parseInt(temp_min - 273.15) ;

//creo el nodo donde ira el nombre de la ciudad
const NombreCiudad=document.createElement('p');
NombreCiudad.innerHTML=`Clima en ${name}`;
NombreCiudad.classList.add('font-bold','text-2x1');

//creo el nodo donde ira la temp actual
const grados_actual=document.createElement('p');
grados_actual.innerHTML=`${grados} °c`;
grados_actual.classList.add('font-bold','text-6x1');

//creo el nodo donde ira la temp maxima
const grados_max=document.createElement('p');
grados_max.innerHTML=`Max: ${max} °c`;
grados_max.classList.add('text-x1');

//creo el nodo donde ira la temp minima
const grados_min=document.createElement('p');
grados_min.innerHTML=`Min: ${min} °c`;
grados_min.classList.add('text-x1');

const contenedorDiv = document.createElement('div');
contenedorDiv.classList.add('text-enter','text-white');
contenedorDiv.appendChild(NombreCiudad);
contenedorDiv.appendChild(grados_actual);
contenedorDiv.appendChild(grados_max);
contenedorDiv.appendChild(grados_min);

resultado.appendChild(contenedorDiv);
}

function LimpiarHtml(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
}