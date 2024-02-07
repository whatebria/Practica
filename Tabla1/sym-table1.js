(function (CS) {
    function symbolVis() { }
    CS.deriveVisualizationFromBase(symbolVis);
    
    //Funncion que se ejecuta al iniciar el simbolo
	symbolVis.prototype.init = function (scope, elem) {
        //Funcion que se llama cada vez que hay un cambio en la data
        this.onDataUpdate = dataUpdate;
        this.onConfigChange = customConfig;
        
        function dataUpdate(data){
            if(data) {
                scope.value = data.Value;
                scope.time = data.Time;
                if(data.Label) {
                    scope.label = data.Label;
                }

                if(scope.config.ShowBlink){
                    //Valida si es un valor numerico
                    if(isFloat(scope.value)){
                        //Dependiendo del valor se asigna un color al fondo
                        if(scope.value > 40){
                            scope.config.BackgroundColor = 'red'
                        }
                        else if(scope.value > 20){
                            scope.config.BackgroundColor = '#DC7633';
                        }
                        else if(scope.value < 20 && scope.value > 10){
                            scope.config.BackgroundColor = '#F7DC6F ';
                        }
                    }
                }
            }

            var name = elem.find('#name')[0];
            var labelValue = elem.find('#labelValue')[0];
            var valueText = elem.find('#valueText')[0];
            // var textVal = elem.find('textVal')[0];
            var time = elem.find('#time')[0];
            var timeValue = elem.find('#timeValue')[0];

            //Tamaño del texto
            name.style.fontSize = scope.config.FontSize + 'px';
            labelValue.style.fontSize = scope.config.FontSize + 'px';
            valueText.style.fontSize = scope.config.FontSize + 'px';
            // textVal.style.fontSize = scope.config.FontSize + 'px';
            time.style.fontSize = scope.config.FontSize + 'px';
            timeValue.style.fontSize = scope.config.FontSize + 'px';
        }

        function customConfig(newConfig){
            
        }

        //Funcion que averigua si es entero o decimal
        function isFloat(number){
            if(number % 1 !=0){
                return true;
            }else{
                return false;
            }
        }
    };

    var definition = {
        //Nombre del simbolo, utilizado para identificar los archivos de esta
        typeName: 'table1',
        displayName: 'Table 1',
        //Cantidad de variables aceptadas por el simbolo
        datasourceBehavior: CS.Extensibility.Enums.DatasourceBehaviors.Single,
        iconUrl: '/Scripts/app/editor/symbols/ext/Icons/table1.png',
        visObjectType: symbolVis,
        //Configuracion personalizada
        getDefaultConfig: function() {
    	    return {
    	        DataShape: 'Value',
    	        Height: 100,
                Width: 300,
                BackgroundColor: '#21618C',
                TextColor: '#17202A',
                FontSize: 18,
                ShowValue: true,
                ShowTime: true,
                ShowLabel: true,
                ShowUnderline: false,
                ShowBlink: false,
            };
        },
        //Nombre para la configuracion
        configTitle: 'Format Symbol',
    };

    CS.symbolCatalog.register(definition);
})(window.PIVisualization);