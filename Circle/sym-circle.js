(function (CS) {
    function symbolVis() { }
    CS.deriveVisualizationFromBase(symbolVis);

    //Funncion que se ejecuta al iniciar el simbolo
	symbolVis.prototype.init = function (scope, elem) {
        //Funcion que se llama cada vez que hay un cambio en la data
        this.onDataUpdate = dataUpdate;

        //Funciona solo cuando se updatea la data
        function dataUpdate(data) {
            //Variable que contiene la fecha y horario de la maquina
            let now = new Date();
           //Variable que contiene solo la fecha y la envia al dom
            scope.date = now.toLocaleDateString();
            //Variable que contiene solo el tiempo y la envia al dom
            scope.time = now.toLocaleTimeString();


        }
    };

    //Definicion de las propiedades del simbolo
    var definition = {
        //Nombre del simbolo
        typeName: 'circle',
        //Cantidad de variables admitidas
        datasourceBehavior: CS.Extensibility.Enums.DatasourceBehaviors.Single,
        iconUrl: '/Scripts/app/editor/symbols/ext/Icons/circulo.png',
        displayName: 'Circle',
        visObjectType: symbolVis,
        //Configuraciones disponibles del simbolo
        getDefaultConfig: function() {
    	    return {
    	        DataShape: 'Value',
    	        Height: 150,
                Width: 150, 
                TextColor: 'rgb(0, 0, 139)',
                BackgroundColor: 'rgb(100, 149, 237)',
                ShowDate: true,
                ShowTime: true,
                ShowUnderline: false,
                FontSize: 12,
            };
        },
        //Nombre de la configuracion
        configTitle: 'Format Symbol',
    };
    
    //Se registra el simbolo
    CS.symbolCatalog.register(definition);
})(window.PIVisualization);