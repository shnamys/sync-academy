sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("project1112.controller.Employee", {
            onInit: function () {
                this.oRouter = this.getOwnerComponent().getRouter();
                this.oRouter.getRoute("Employee").attachPatternMatched(this._onPatternMatched, this);

            },
            _onPatternMatched : function(oEvent) {
                var oArgu = oEvent.getParameters().arguments;

                console.log(oArgu);
            },
            onNavBack : function() {
                this.oRouter.navTo('RouteMain'), {
                    'query' : {
                        tab : 'okok',
                        test : 10
                    }
                }
            }
            

            
        });
    });