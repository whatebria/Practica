(function (CS) {
    function symbolVis() { }
    CS.deriveVisualizationFromBase(symbolVis);

    //Funncion que se ejecuta al iniciar el simbolo
	symbolVis.prototype.init = function (scope, elem) {
        //Funcion que se llama cada vez que hay un cambio en la data
        this.onDataUpdate = dataUpdate;
        this.OnConfigChange = customConfig;
        

        //Funciona solo cuando se updatea la data
        function dataUpdate(data) {
            //Variable que contiene la fecha y horario de la maquina
            let now = new Date();
           //Variable que contiene solo la fecha y la envia al dom
            scope.date = now.toLocaleDateString();
            //Variable que contiene solo el tiempo y la envia al dom
            scope.time = now.toLocaleTimeString();

            //Variable que encuentra el texto en el dom
            var text1 = elem.find('#texto1')[0];
            var text2 = elem.find('#texto2')[0];

            //variable que busca el div
            // var div =  elem.find('#container')[0];

            //Cambio de tamaño del texto
            text1.style.fontSize = scope.config.FontSize + 'px';
            text2.style.fontSize = scope.config.FontSize + 'px';

            //Underline
            //Si es que ShowUnderlines es true
            if(scope.config.ShowUnderline){
                //Se cambia el estilo
                text1.style.textDecoration = 'underline';
                
                text2.style.textDecoration = 'underline';
            }
            else{
                text1.style.textDecoration = 'none';
                
                text2.style.textDecoration = 'none';
            }
        }
    
        function customConfig(newConfig, oldConfig){
            oldConfig = getDefaultConfig;
            
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