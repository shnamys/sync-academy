sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Filter, FilterOperator, JSONModel) {
        "use strict";

        return Controller.extend("exam.exprogram11.controller.Main", {
            onInit: function () {
                var oJsonData = new JSONModel({
                    list : [{
                        CategoryID : "",
                        ProductName : "",
                        UnitsInStock : "",
                        UnitsOnOrder : ""
                    }]                   
                    
                }); this.getView().setModel(oJsonData, "data");
               
            },

            onSearch : function () {
                var sCategoryID =this.byId("idCategoryID").getValue();
                var aFilter = [];

                if(sCategoryID) {
                    aFilter.push(new Filter('CategoryID','GE', sCategoryID))
                }; this.byId("idTable").getBinding("items").filter(aFilter);

                var sCategoryName = this.byId("idCategoryName").getValue();
                if(sCategoryName) {
                    aFilter.push(new Filter('CategoryName','Contains', sCategoryName))
                }; this.byId("idTable").getBinding("items").filter(aFilter);

            },
            onSelectionChange : function(oEvent) {
                var sPath =oEvent.getParameters().listItem.getBindingContextPath();
                var oSelectData = this.getView().getModel().getProperty(sPath);

                var oDataModel = this.getView().getModel();
                var oFilter = new Filter("CategoryID", 'EQ', oSelectData.CategoryID);


                oDataModel.read("/Products", {
                    filters : [oFilter],
                    success : function(oReturn) {
                        var oJSONModel = this.getView().getModel("data");
                        oJSONModel.setData(oReturn);
                    }.bind(this)

                    

                })

            }
        });
    });
