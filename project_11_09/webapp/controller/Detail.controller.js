sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("odata.project1109.controller.Detail", {
            onInit: function () {
                this.oRouter = this.getOwnerComponent().getRouter();
                this.oRouter.getRoute("RouteDetail").attachPatternMatched(this._onPatternMatched, this);
                
            },
            _onPatternMatched : function(oEvent) {
                var oArgu = oEvent.getParameters().arguments;
                

                console.log(oArgu.OrderID);
                // this.byId("idText").setText(oArgu.OrderID);

                // "/EntitySetName(key='1', key2='2')"
                // "/EntitySetName('1')"
                // "/Orders(10248)"
                this.byId("idFoam").bindElement(`/Orders(${oArgu.OrderID})`);
                
            },
            onNavBack : function() {
                this.oRouter.navTo('RouteMain')
                    
                            
            }
            
            
        });
    });
