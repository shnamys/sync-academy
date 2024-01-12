sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",

],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("sap.btp.ux400solving.controller.Main", {
            onInit: function () {
                var oJSONData = new JSONModel({
                    list: []
                })
                this.getView().setModel( oJSONData,"LifeCycle");

            },
            onRandomPress : function () {
                //    var getRandomNumber = function () {
                //      return Math.floor(Math.random()*100)+1
                //    }
                //    var nResult = getRandomNumber();
               var nResult = Math.floor(Math.random()*100)+1;
               var sInput = this.getView().byId("idInput");
               sInput.setValue(nResult);

               console.log(nResult);

               var oLifeCycleModel = this.getView().getModel("LifeCycle");
               var aList = oLifeCycleModel.getProperty("/list"); 
               

               aList.push( {nResult : nResult} );
               //{key : value} 형태로 들어가야 함
                oLifeCycleModel.setData({list : aList}, true);
                                                
            },
            onOpenDialog : function() {
                this.byId("idDialog").open();
            },
            onClose : function(oEvent) {
                oEvent.getSource().getParent().close();  
            },
            transformDiscontinued : function(sValue) {
               if(sValue) {
                return "Yes";
               }else {
                return "No";
               }
            },
            onValueChange : function(sValue2) {
                if(sValue2 >= 1 && sValue2 <= 100) {
                    
                }else {
                   sValue2.setvaluestate()
                }

            }
        

              
        
            
        });
    });
