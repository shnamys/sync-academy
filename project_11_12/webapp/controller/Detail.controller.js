sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("project1112.controller.Detail", {
            onInit: function () {
                this.oRouter = this.getOwnerComponent().getRouter();
                this.oRouter.getRoute("RouteDetail").attachPatternMatched(this._onPatternMatched, this);

            },
            _onPatternMatched : function(oEvent) {
                // RouteDetail 라우트 객체의 Pattern 이 일치할 때 마다 해당 이벤트가 실행됨
                var oArgu = oEvent.getParameters().arguments;

                console.log("Detail : ", oArgu);

            },

            onNavBack : function() {
                this.oRouter.navTo('RouteMain', {
                    'query' : {
                        tab : 'okok',
                        test : 10
                    }
                    
                });

            }
        });
    });
