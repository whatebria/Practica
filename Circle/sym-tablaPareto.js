(function (CS) {
    function symbolVis() { }
    CS.deriveVisualizationFromBase(symbolVis);
    
    //Funncion que se ejecuta al iniciar el simbolo
	symbolVis.prototype.init = function (scope, elem) {
        //Funcion que se llama cada vez que hay un cambio en la data
        this.onDataUpdate = dataUpdate;

		// Locate the html div that will contain the symbol, using its id, which is "container" by default
		var symbolContainerDiv = elem.find('#container')[0];
        // Use random functions to generate a new unique id for this symbol, to make it unique among all other custom symbols
		var newUniqueIDString = "myCustomSymbol_" + Math.random().toString(36).substr(2, 16);
		// Write that new unique ID back to overwrite the old id
        symbolContainerDiv.id = newUniqueIDString;
		// Create a variable to hold the custom visualization object
		var customVisualizationObject;
		// Create vars to hold the labels and units
		
		//ARRAY LABELS
		//ARRAY VALUES
		var dataValueArray = [];
		//ARRAY VALORES ACUMULADOS
		var acumulativeArray = [];
		//ARRAY DE VALORES 2
		var copyOfDatValueArray = [];
		//ARRAY DE VALORES 3
		var copyTwoOfDatValueArray = [];
		//ARRAY DE PORCENTAJES ACUMULADOS
		var acumulativePercentArray = [];
		//COPIA DE ARRAY ACUMULATIVO
		var copyOfAcumulativeArray = []

        
        function dataUpdate(data){

			//Limpia el symbolo
			if(customVisualizationObject) {
				$('#' + symbolContainerDiv.id + ' tbody').remove();
			}
			customVisualizationObject = true;
				

			//LABELS
			// Fila
			var newRow = symbolContainerDiv.insertRow(0);
			newRow.style.width = "100%";
			newRow.style.border = "1px solid " + scope.config.borderColor;
			newRow.style.fontSize = scope.config.fontSize + "px";

			// Celda de nombre
			var labelCell = newRow.insertCell(-1);
			labelCell.innerHTML = "Label";
			labelCell.style.padding = "10px";
			labelCell.style.verticalAlign = "middle";
			labelCell.style.backgroundColor = scope.config.labelBackgroundColor;
			labelCell.style.color = scope.config.labelColor;

			// Inicializar un array para almacenar las filas únicas de datos
			var dataLabelArray = [];

			// Recorre las filas viendo si el dato no está agregado; si no lo está, lo agrega al array
			for (var i = 0; i < data.Rows.length; i++) {
				if (!dataLabelArray.some(item => item === data.Rows[i])) {
					dataLabelArray.push(data.Rows[i]);
				}
			}

			// Ordenar el array de objetos por la propiedad 'Value' antes de agregar las celdas
			ordenarObjetosPorPropiedad(dataLabelArray, 'Value');

			// Recorre el array de datos, agrega una nueva celda y le agrega la label
			for (var i = 0; i < dataLabelArray.length; i++) {
				var newCell = newRow.insertCell(-1);
				newCell.innerHTML = dataLabelArray[i].Label;
				// Apply padding and the specified color for this column
				newCell.style.padding = "10px";
				newCell.style.verticalAlign = "middle";
				newCell.style.backgroundColor = scope.config.backgroundColor;
				newCell.style.color = scope.config.textColor;
			}



			//VALORES
			//Fila
			var newRow = symbolContainerDiv.insertRow(1);
			newRow.style.width = "100%";
			newRow.style.border = "1px solid " + scope.config.borderColor;
			newRow.style.fontSize = scope.config.fontSize + "px";
			//Celda
			var labelCell = newRow.insertCell(-1);
			labelCell.innerHTML = "Value";
			labelCell.style.padding = "10px";
			labelCell.style.verticalAlign = "middle";
			labelCell.style.backgroundColor = scope.config.labelBackgroundColor;
			labelCell.style.color = scope.config.labelColor;

			//Recorre las filas viendo si el dato no esta agregado; si no lo está, lo agrega al array
			for (var i = 0; i < data.Rows.length; i++) {
				if(!dataValueArray.includes(data.Rows[i])){
					dataValueArray[i] = data.Rows[i];
				}
			}
			ordenarObjetosPorPropiedad(dataValueArray, 'Value');

			//Recorre el array de datos, agrega una nueva celda y le agrega el valor
			for (var i = 0; i < dataValueArray.length; i++) {
				var newCell = newRow.insertCell(-1);

				newCell.innerHTML = dataValueArray[i].Value;
				// Apply padding and the specified color for this column
				newCell.style.padding = "10px";
				newCell.style.verticalAlign = "middle";
				newCell.style.backgroundColor = scope.config.backgroundColor;
				newCell.style.color = scope.config.textColor;
			}


			//VALORES ACUMULADOS}
			//Fila
			var newRow = symbolContainerDiv.insertRow(2);
			newRow.style.width = "100%";
			newRow.style.border = "1px solid " + scope.config.borderColor;
			newRow.style.fontSize = scope.config.fontSize + "px";
			//Celda
			var labelCell = newRow.insertCell(-1);
			labelCell.innerHTML = "Acumulados";
			labelCell.style.padding = "10px";
			labelCell.style.verticalAlign = "middle";
			labelCell.style.backgroundColor = scope.config.labelBackgroundColor;
			labelCell.style.color = scope.config.labelColor;

			//Recorre las filas viendo si el dato no esta agregado; si no lo está, lo agrega al array
			for (var i = 0; i < data.Rows.length; i++) {
				if(!copyOfDatValueArray.includes(data.Rows[i])){
					copyOfDatValueArray[i] = data.Rows[i].Value;
				}
			}
			//Ordena de mayor a menor y suma los valores
			ordenarDeMayorAMenor(copyOfDatValueArray);
			acumulativeArray = sumarAcumulativamente(copyOfDatValueArray);

			//Recorre el array de datos, agrega una nueva celda y le agrega los valores acumulados
			for (var i = 0; i < copyOfDatValueArray.length; i++) {
				var newCell = newRow.insertCell(-1);
				newCell.innerHTML = acumulativeArray[i];
				// Apply padding and the specified color for this column
				newCell.style.padding = "10px";
				newCell.style.verticalAlign = "middle";
				newCell.style.backgroundColor = scope.config.backgroundColor;
				newCell.style.color = scope.config.textColor
			};


			//PORCENTAJES ACUMULADOS
			//Fila
			var newRow = symbolContainerDiv.insertRow(3);
			newRow.style.width = "100%";
			newRow.style.border = "1px solid " + scope.config.borderColor;
			newRow.style.fontSize = scope.config.fontSize + "px";
			//Celda
			var labelCell = newRow.insertCell(-1);
			labelCell.innerHTML = "Porcentaje Acumulado";
			labelCell.style.padding = "10px";
			labelCell.style.verticalAlign = "middle";
			labelCell.style.backgroundColor = scope.config.labelBackgroundColor;
			labelCell.style.color = scope.config.labelColor;
			//Nombre de la celda

			//Recorre las filas viendo si el dato no esta agregado; si no lo está, lo agrega al array
			for (var i = 0; i < data.Rows.length; i++) {
				if(!copyTwoOfDatValueArray.includes(data.Rows[i])){
					copyTwoOfDatValueArray[i] = data.Rows[i].Value;
				}
			}
			//Ordena de mayor a menor y suma los valores
			ordenarDeMayorAMenor(copyTwoOfDatValueArray);
			copyOfAcumulativeArray = sumarAcumulativamente(copyTwoOfDatValueArray);
			var maximo = copyOfAcumulativeArray.at(-1);
			acumulativePercentArray = sacarPorcentajesAcumulados(copyOfAcumulativeArray, maximo);

			//Recorre el array de datos, agrega una nueva celda y le agrega los porcentajes acumulados
			for (var i = 0; i < acumulativePercentArray.length; i++) {
				var newCell = newRow.insertCell(-1);
				newCell.innerHTML = acumulativePercentArray[i] + '%';
				// Apply padding and the specified color for this column
				newCell.style.padding = "10px";
				newCell.style.verticalAlign = "middle";
				newCell.style.backgroundColor = scope.config.backgroundColor;
				newCell.style.color = scope.config.textColor;
			};
			

			//FUNCIONES

			// Ordenar el array de mayor a menor
			function ordenarDeMayorAMenor(array) {

				return array.sort((a, b) => b - a);
			}
			
			//Ordenar el array de mayor a menor por una propiedad
			function ordenarObjetosPorPropiedad(array, propiedad) {

				return array.sort((a, b) => b[propiedad] - a[propiedad]);
			}

			//Suma cada objeto del array con el resultado anterior
			function sumarAcumulativamente(array) {

				const resultado = [Math.round(array[0])]; // Inicializar el array de resultado con el primer elemento del array original
				
				for (let i = 0; i < array.length - 1; i++) {
				  resultado.push(Math.round(parseFloat(resultado[i])) + Math.round(parseFloat(array[i + 1])));
				}
				
				return resultado;
			}

			//Saca los porcentajes acumulados dependiendo del ultimo objeto del array
			function sacarPorcentajesAcumulados(array, maximo){

				const resultado = [Math.round((array[0] / maximo)*100)]; // Inicializar el array de resultado con el primer elemento del array original

				for (let i = 0; i < array.length - 1; i++) {
					//Divide el dato en el valor maximo
					resultado.push(Math.round((parseFloat(array[i + 1]) / maximo)*100));
				  }
				

				return resultado;
			}

		}
			
	};

    var definition = {
        //Nombre del simbolo, utilizado para identificar los archivos de esta
        typeName: 'tablaPareto',
        displayName: 'Table de Pareto',
        //Cantidad de variables aceptadas por el simbolo
        datasourceBehavior: CS.Extensibility.Enums.DatasourceBehaviors.Multiple,
        iconUrl: '/Scripts/app/editor/symbols/ext/Icons/tablaPareto.png',
        visObjectType: symbolVis,
        //Configuracion personalizada
        getDefaultConfig: function() {
    	    return {
    	        DataShape: 'Table',
    	        Height: 100,
                Width: 300,
                textColor: "white",
				labelColor: "white",
				labelBackgroundColor: "gray",
				backgroundColor: "gray",
				borderColor: "white",
				fontSize: 20,
				scrolling: "hidden"
            };
        },
        //Nombre para la configuracion
        configTitle: 'Format Symbol',
    };

    CS.symbolCatalog.register(definition);
})(window.PIVisualization);