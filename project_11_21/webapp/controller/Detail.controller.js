sap.ui.define([
    "sap/ui/core/mvc/Controller",
    'sap/ui/model/Filter',
    "sap/ui/model/FilterOperator",
    "sap/ui/model/json/JSONModel",
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Filter, FilterOperator, JSONModel) {
        "use strict";

        return Controller.extend("project1121.controller.Detail", {
            onInit: function () {
                // debugger;
                this.oRouter = this.getOwnerComponent().getRouter();
               
                this.oRouter.getRoute("RouteDetail").attachPatternMatched(
                    this._onObjectMatched, this);
                
            },
            _onObjectMatched: function(oEvent) {
                // debugger;
                var oArgu = oEvent.getParameters().arguments;
                var aFilters = [];

                if(oArgu.Docno) aFilters.push(new Filter('Docno', FilterOperator.EQ, oArgu.Docno));

                var oFilter = new Filter({
                    filters : aFilters,
                    and : true
                });

                this.byId("idTable").getBinding("items").filter(oFilter);

            },
            onNavBack: function() {

                this.oRouter.navTo('RouteMain', {
                });
            }
            
        });
    });