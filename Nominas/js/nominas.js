$(document).ready(function() {

    console.log("Listo");
    var years = [];
    data = {
        id: 1
    }
    $.ajax({
        type: "POST",
        url: 'semanas.php',
        data: data,
        success: function(response) {

            var jsonData = JSON.parse(response);
            var nomina, nombre, planta, curp, d, w, a, array, semana, semanaGeneral;
            var select = document.getElementById("selectyear");
            console.log(jsonData);

            var cont = document.getElementById("div-lista");
            var sPaginaURL = window.location.search.substring(1);
            var sURLVariables = sPaginaURL.split('&');
            for (let i = 0; i < sURLVariables.length; i++) {
                var sParametro = sURLVariables[i].split('=');
                sParametro[1] = sParametro[1].replace(/%20/g, " ");
                if (i == 0) nomina = sParametro[1];
                //if (i == 1) nombre = sParametro[1];
                //if(i==3) curp=sParametro[1];  
            }

            data = {
                nomina: nomina
            }
            $.ajax({
                type: "POST",
                url: 'buscarNombre.php',
                data: data,
                success: function(response) {
                    var date = new Date();
                    var currentlyyear = date.getFullYear();
                    response = JSON.parse(response);
                    console.log("respuesta", response.Nombre);
                    nombre = response.Nombre;
                    document.getElementById("input-nomina").value = nomina;
                    document.getElementById("input-nombre").value = response.Nombre;
                    if (jsonData != 0) {
                        // for (let i = 0; i < jsonData.length; i++) {

                        // cont.innerHTML += `<a href="pdf.php?Semana=${jsonData[i].Semana}&Nomina=${nomina}&Nombre=${nombre}" class="list-group-item list-group-item-action"> Semana: ${semana} año ${a}</a>`;
                        //  }
                        enviar(0, array, jsonData, currentlyyear, nomina, nombre, years);

                    } else {
                        cont.innerHTML += `<a href="#" class="list-group-item list-group-item-action">No hay datos</a>`;
                    }
                    //document.getElementById("forma").submit();

                }
            });

        }
    });
});

function enviar(i, array, jsonData, currentlyyear, nomina, nombre, years) {
    if (i < jsonData.length) {
        var select = document.getElementById("selectyear");
        var cont = document.getElementById("div-lista");
        array = jsonData[i].Semana.split("-");
        w = array[0];
        a = array[1];
        data = {
            semana: jsonData[i].Semana,
            nomina: nomina,
            nombre: nombre,
            year: currentlyyear,
            week: w
        }
        $.ajax({
            type: "POST",
            url: 'documentExist.php',
            data: data,
            success: function(response) {
                var d = new Date();
                var year = d.getFullYear();
                array = jsonData[i].Semana.split("-");
                w = array[0];
                a = array[1];
                //console.log(y);

                /*d = array[0];
                 m = array[1] - 1;
                 a = array[2];*/
                //console.log("semana:" + new Date(2020, 7, 31).getWeekNumber());
                //semanaGeneral = new Date(a, m, d).getWeekNumber();
                if (years.indexOf(a) === -1) {
                    years.push(a);
                    var option = document.createElement("option");
                    option.text = a;
                    option.value = a;
                    if (a == year) {
                        option.selected = "selected";
                    }
                    select.add(option);
                }

                if (response == 1 && a == year) cont.innerHTML += `<a href="pdf.php?week=${w}&year=${a}&Nomina=${nomina}&Nombre=${nombre}" class="list-group-item list-group-item-action"> Semana: ${w} año ${a}</a>`;
                enviar(i + 1, array, jsonData, currentlyyear, nomina, nombre, years);
            }
        });
    }

}


function changeYear() {
	var select = document.getElementById("selectyear");

    var years = [];
    data = {
        id: 1,
		year: select.value
    }
    $.ajax({
        type: "POST",
        url: 'semanasparam.php',
        data: data,
        success: function(response) {

            var jsonData = JSON.parse(response);
            var nomina, nombre, planta, curp, d, w, a, array, semana, semanaGeneral;
            
			select.disabled=true;
			document.getElementById("idspin").style.display="";
            console.log(jsonData);
            var cont = document.getElementById("div-lista");
            cont.innerHTML = "";
            var sPaginaURL = window.location.search.substring(1);
            var sURLVariables = sPaginaURL.split('&');
            for (let i = 0; i < sURLVariables.length; i++) {
                var sParametro = sURLVariables[i].split('=');
                sParametro[1] = sParametro[1].replace(/%20/g, " ");
                if (i == 0) nomina = sParametro[1];
                //if (i == 1) nombre = sParametro[1];
                //if(i==3) curp=sParametro[1];  
            }

            data = {
                nomina: nomina
            }
            $.ajax({
                type: "POST",
                url: 'buscarNombre.php',
                data: data,
                success: function(response) {
                    var date = new Date();
                    var currentlyyear = date.getFullYear();

                    response = JSON.parse(response);
                    console.log("respuesta", response.Nombre);
                    nombre = response.Nombre;
                    document.getElementById("input-nomina").value = nomina;
                    document.getElementById("input-nombre").value = response.Nombre;
                    if (jsonData != 0) {
                        //for (let i = 0; i < jsonData.length; i++) {
                        enviarselect(0, array, jsonData, currentlyyear, nomina, nombre, years);

                        // cont.innerHTML += `<a href="pdf.php?Semana=${jsonData[i].Semana}&Nomina=${nomina}&Nombre=${nombre}" class="list-group-item list-group-item-action"> Semana: ${semana} año ${a}</a>`;
                        // }
                    } else {
                        cont.innerHTML += `<a href="#" class="list-group-item list-group-item-action">No hay datos</a>`;
                    }
                    //document.getElementById("forma").submit();

                }
            });

        }
    });
}

function enviarselect(i, array, jsonData, currentlyyear, nomina, nombre, years) {
	var select = document.getElementById("selectyear");
    if (i < jsonData.length) {
        
        var cont = document.getElementById("div-lista");
        array = jsonData[i].Semana.split("-");
        w = array[0];
        a = array[1];
        data = {
            semana: jsonData[i].Semana,
            nomina: nomina,
            nombre: nombre,
            year: select.value,
            week: w
        }
        $.ajax({
            type: "POST",
            url: 'documentExist.php',
            data: data,
            success: function(response) {
                var d = new Date();
                var year = d.getFullYear();
                array = jsonData[i].Semana.split("-");
                w = array[0];
                a = array[1];
                if (response == 1 && a == select.value) cont.innerHTML += `<a href="pdf.php?week=${w}&year=${a}&Nomina=${nomina}&Nombre=${nombre}" class="list-group-item list-group-item-action"> Semana: ${w} año ${a}</a>`;
                enviarselect(i + 1, array, jsonData, currentlyyear, nomina, nombre, years);
            }
        });
    }else{
		select.disabled=false;
	    document.getElementById("idspin").style.display="none";}
}

/*function changeYear() {
    var years = [];
    data = {
        id: 1
    }
    $.ajax({
        type: "POST",
        url: 'semanas.php',
        data: data,
        success: function(response) {

            var jsonData = JSON.parse(response);
            var nomina, nombre, planta, curp, d, m, a, array, semana, semanaGeneral;
            var select = document.getElementById("selectyear");

            var cont = document.getElementById("div-lista");
            // cont.innerHTML = `<a class="list-group-item list-group-item-info">
            //                  Seleccione la semana </a>`;
            cont.innerHTML = "";
            var sPaginaURL = window.location.search.substring(1);
            var sURLVariables = sPaginaURL.split('&');
            for (let i = 0; i < sURLVariables.length; i++) {
                var sParametro = sURLVariables[i].split('=');
                sParametro[1] = sParametro[1].replace(/%20/g, " ");
                if (i == 0) nomina = sParametro[1];
                //if (i == 1) nombre = sParametro[1];
                //if(i==3) curp=sParametro[1];  
            }

            data = {
                nomina: nomina
            }
            $.ajax({
                type: "POST",
                url: 'buscarNombre.php',
                data: data,
                success: function(response) {

                    response = JSON.parse(response);
                    console.log("respuesta", response.Nombre);
                    nombre = response.Nombre;
                    document.getElementById("input-nomina").value = nomina;
                    document.getElementById("input-nombre").value = response.Nombre;
                    if (jsonData != 0) {
                        for (let i = 0; i < jsonData.length; i++) {
                            console.log("semana: " + semanaGeneral);
                            var y = select.value;
                            console.log(y);
                            array = jsonData[i].Semana.split("-");
                            d = array[0];
                            m = array[1] - 1;
                            a = array[2];
                            //console.log("semana:" + new Date(2020, 7, 31).getWeekNumber());
                            semanaGeneral = new Date(a, m, d).getWeekNumber();
                            if (a == y) cont.innerHTML += `<a id="item${i}" href="pdf.php?Semana=${jsonData[i].Semana}&Nomina=${nomina}&Nombre=${nombre}" class="list-group-item list-group-item-action"> Semana: ${semanaGeneral} año ${a}</a>`;

                            data = {
                                semana: jsonData[i].Semana,
                                nomina: nomina,
                                nombre: nombre
                            }
                            $.ajax({
                                type: "POST",
                                url: 'documentExist.php',
                                data: data,
                                success: function(response) {
                                    // if (response == 1 && a == y) cont.innerHTML += `<a href="pdf.php?Semana=${jsonData[i].Semana}&Nomina=${nomina}&Nombre=${nombre}" class="list-group-item list-group-item-action"> Semana: ${semanaGeneral} año ${a}</a>`;
                                    if (response != 1) {
                                        console.log(i);
                                        document.getElementById("item" + i).href = "#";
                                        document.getElementById("item" + i).style.cursor = "not-allowed";
                                        document.getElementById("item" + i).style.opacity = "0.5";
                                    }
                                }
                            });
                            // cont.innerHTML += `<a href="pdf.php?Semana=${jsonData[i].Semana}&Nomina=${nomina}&Nombre=${nombre}" class="list-group-item list-group-item-action"> Semana: ${semana} año ${a}</a>`;
                        }

                        console.log(years);
                    } else {
                        cont.innerHTML += `<a href="#" class="list-group-item list-group-item-action">No hay datos</a>`;
                    }
                    //document.getElementById("forma").submit();

                }
            });

        }
    });
}

Date.prototype.getWeekNumber = function() {
    var d = new Date(+this); //Creamos un nuevo Date con la fecha de "this".
    d.setHours(0, 0, 0, 0); //Nos aseguramos de limpiar la hora.
    d.setDate(d.getDate() + 4 - (d.getDay() || 7)); // Recorremos los días para asegurarnos de estar "dentro de la semana"
    //Finalmente, calculamos redondeando y ajustando por la naturaleza de los números en JS:
    return Math.ceil((((d - new Date(d.getFullYear(), 0, 1)) / 8.64e7) + 1) / 7);
};*/