sap.ui.define([
    "sap/ui/core/mvc/Controller",
    'sap/ui/model/Filter', 
    'sap/ui/model/FilterOperator',
    "sap/ui/model/json/JSONModel"

],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Filter, FilterOperator, JSONModel) {
        "use strict";

        return Controller.extend("odata.project1109.controller.Main", {
            onInit: function () {

                var oData = {
                    OrderID : '',
                    CustomerID : '',
                    OrderDate_start : null,
                    OrderDate_end : null
                };
                this.getView().setModel(new JSONModel(oData), 'search')
            },
            fnDateToString : function(sValue) {
                if(sValue) {

                    var oFormat = sap.ui.core.format.DateFormat.getDateInstance({
                        pattern : 'yyyy-MM-dd'
                    });
                    return oFormat.format(sValue); //"2024.01.09" 형태로도 가능


                }
            },
            onValueHelpRequest : function() {
                this.byId('idDialog').open()

            },
            onClose : function(oEvent) {
                oEvent.getSource().getParent().close();
            },
            onSearch : function() {

                var sOrderId = this.byId("idOrderID").getValue();
                // id로 불러온 것들 주석 처리하고 json 모델 가져오기
                // var oSearchData = this.getView().getModel('search').getData();
                var aFilter = [];
                
                if(sOrderId) {
                    aFilter.push(
                        new Filter({
                          path : 'OrderID', // 대상 필드명
                          operator : FilterOperator.EQ, // 연산자(조건)
                          value1 : sOrderId, // 값(BT의 경우 From)
                          value2 : '' // (BT의 경우 To)

                        })
                        
                ); 
                    
                }; 
                
                // this.byId("idTable").getBinding("items").filter(aFilter);

                var sCustomerId = this.byId("idCustomerID").getValue();

                if(sCustomerId) {
                    aFilter.push(
                        new Filter({
                          path : 'CustomerID', // 대상 필드명
                          operator : FilterOperator.Contains, // 연산자(조건)
                          value1 : sCustomerId, // 값(BT의 경우 From)
                          value2 : '' // (BT의 경우 To)

                        })                        
                );

                }; 
                // this.byId("idTable").getBinding("items").filter(aFilter);
                
            
                var oFirstDate = this.byId("idOrderDate").getDateValue();
                var oSecondDate = this.byId("idOrderDate").getSecondDateValue();
                debugger;

                if(oFirstDate && oSecondDate) {
                    aFilter.push(
                        new Filter({
                        path : 'OrderDate', // 대상 필드명
                        operator : FilterOperator.BT, // 연산자(조건)
                        value1 : oFirstDate, // 값(BT의 경우 From)
                        value2 : oSecondDate
                    })
                        
                    );
                }; this.byId("idTable").getBinding("items").filter(aFilter);

            },
            //sap.m.Table에서,selectionChange 이벤트 실행
            onSelectionChange : function(oEvent) {
                var sPath = oEvent.getParameters().listItem.getBindingContextPath();
                // 상대 경로로 지정되어 있는 데이터 셋에서, 내가 선택한 row의 모델 경로를 얻음
                var oSelectData = this.getView().getModel().getProperty(sPath);
                // 모델 경로를 통해서, 해당 경로의 전체 데이터를 얻음
            }
        });
    });
