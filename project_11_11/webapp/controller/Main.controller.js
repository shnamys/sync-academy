sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",

],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("project1111.controller.Main", {
            onInit: function () {
            //     var oData = {
            //         chartDataset : [
            //             {year : '2020', price : '1000'},
            //             {year : '2021', price : '2000'},
            //             {year : '2022', price : '1200'},
            //             {year : '2023', price : '2500'}
            //         ]
            //     }
            //     this.getView().setModel(new JSONModel(oData), 'chart');

            }
        });
    });
