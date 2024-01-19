sap.ui.define([
    "sap/ui/core/mvc/Controller",
    'sap/ui/model/Filter', 
    'sap/ui/model/FilterOperator',
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Filter, FilterOperator, JSONModel ) {
        "use strict";

        return Controller.extend("sap.btp.ux410solving.controller.Main", {
            onInit: function () {
                var oJSONdata = new JSONModel({
                    list : [
                        { type : 'bar' }, 
                        { type : 'column' }, 
                        { type : 'line' }, 
                        { type : 'donut' }
                    ]
                }); 
                this.getView().setModel(oJSONdata, "typeList")                        

            },
            onSearch : function() {
                var sOrderId = this.byId("idOrderID").getValue();
                // this.byId("idOrderID").getSelectedKey()
                // => ID값 안쓰려면 
                // selectedKey="{search>/OrderID}" 와 같은 세팅으로 값 가져오기
                var aFilter = [];

                
                var sType = this.byId("idType").getValue(); // chart type 'bar', 'column',.,
                this.byId("idLineChart").setVizType(sType);


                if(sOrderId) {
                    aFilter.push(
                        new Filter({
                          path : 'OrderID', 
                          operator : FilterOperator.EQ, 
                          value1 : sOrderId, 
                          value2 : '' 
                        })
                    )
                }
                this.byId("idDataset").getBinding("data").filter(aFilter);

            },
            onSelectBox : function(oEvent) {
                var oSelect = oEvent.getSource();

                if(!oSelect.getSelectedKey()) {
                    oSelect.setValueState(sap.ui.core.ValueState.Error);                    
                }else {
                    oSelect.setValueState(sap.ui.core.ValueState.None);
                }
                
            },
            onChartSelet : function(oEvent) {
                
            }



                
        });
    });
