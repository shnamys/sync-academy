sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/MessageToast"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    

    function (Controller, Filter, FilterOperator, MessageToast) {
        "use strict";
        
        var oView ;

        function _countUpdate () {
            var cPending = 0, cAccept = 0, cReject = 0;
            
            var oDataModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZBA_GW_FI_02_SRV/", true);
            oDataModel.read("/HeaderSet", {
                success: function(oReturn) {
                    console.log("필터조회: ", oReturn); 

                    cAll = oReturn.results.length;

                    for (var i = 0 ; i < oReturn.results.length; i++){
                        switch (oReturn.results[i].Arvst){
                            case 'W':
                                cPending++;
                                break;
                            case 'Y':
                                cAccept++;
                                break;
                            case 'N':
                                cReject++;
                                break;
                            default:
                                break;
                        }
                    }
                        
                    // debugger;

                    var cAll = cPending + cAccept + cReject;
                    
                    oView.byId("idPending").setCount(cPending);
                    oView.byId("idAccept").setCount(cAccept);
                    oView.byId("idReject").setCount(cReject);
                    oView.byId("idAll").setCount(cAll);

                },
            });


        }
        
        return Controller.extend("project1121.controller.Main", {

            onInit: function () {
                // var oDataModel = this.getView().getModel();

                var oDataModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZBA_GW_FI_02_SRV/", true);
                this.getView().setModel(oDataModel);

                oView = this.getView();

                var oTable = this.getView().byId("DocTable");
                var binding = oTable.getBinding("items");

                var oFilter = new Filter("Arvst", "EQ", "W");
                var aFilters = [];
                aFilters.push(oFilter);


                oDataModel.read("/HeaderSet", {
                    success: function(oReturn) {
                        console.log("필터조회: ", oReturn); 
                        binding.filter(aFilters);

                        _countUpdate();
                    
                    },
                    error : function(oError) {
                        console.log("전체조회 중 오류 발생", oError);
                    }
                }); 


            },

            onFilterSelect : function(oEvent) {
                var oBinding = this.byId("DocTable").getBinding("items");
				var sKey = oEvent.getParameter("key");
				var aFilters = [];

                if (sKey === "W") {
                    aFilters.push(
                        new Filter({
                            path: 'Arvst',
                            operator: FilterOperator.EQ,
                            value1: 'W'
                        })
                    );
                    this.getView().byId("btn_reject").setVisible(true);
                    this.getView().byId("btn_accept").setVisible(true);
                } else if (sKey === "Y") {
                    aFilters.push(
                        new Filter({
                            path: 'Arvst',
                            operator: FilterOperator.EQ,
                            value1: 'Y'
                        })
                    );
                    this.getView().byId("btn_reject").setVisible(false);
                    this.getView().byId("btn_accept").setVisible(false);
                } else if (sKey === "N") {
                    aFilters.push(
                        new Filter({
                            path: 'Arvst',
                            operator: FilterOperator.EQ,
                            value1: 'N'
                        })
                    );
                    this.getView().byId("btn_reject").setVisible(false);
                    this.getView().byId("btn_accept").setVisible(false);
                    
                } else if (sKey === "All") {
                    aFilters.push(
                        new Filter({
                            path: 'Arvst',
                            operator: FilterOperator.NE,
                            value1: ''
                        })
                    );
                    this.getView().byId("btn_reject").setVisible(false);
                    this.getView().byId("btn_accept").setVisible(false);
                }
            
                oBinding.filter(aFilters);
            },
            onAccept : function() {

                
                var oTable = this.byId("DocTable");
                var aSelectedContexts = oTable.getSelectedContexts();
                
                debugger; 

                if (aSelectedContexts.length === 0) {
                    MessageToast.show("승인할 항목을 선택하십시오.");
                    return;
                }

                var oDataModel = this.getView().getModel();

                aSelectedContexts.forEach(function(oContext) {
                    debugger;
                    var sPath = oContext.getPath();
                    var oData = oContext.getObject();

                    // 승인 상태로 변경
                    oData.Arvst = "Y";

                    oDataModel.update(sPath, oData, {
                        success: function() {
                            MessageToast.show("데이터 변경 완료");

                    
                            oTable.getBinding("items").filter([new Filter({
                                path: 'Arvst',
                                operator: FilterOperator.EQ,
                                value1: 'W'
                            })]);

                            _countUpdate();
                        },
                        error: function(oError) {
                            MessageToast.show("데이터 변경 실패");
                            console.error("Update failed", oError);
                        }
                    });
                });
            
            },
            onReject : function() {
                var oTable = this.byId("DocTable");
                var aSelectedContexts = oTable.getSelectedContexts();
                
                debugger; 

                if (aSelectedContexts.length === 0) {
                    MessageToast.show("반려할 항목을 선택하십시오.");
                    return;
                }

                var oDataModel = this.getView().getModel();

                aSelectedContexts.forEach(function(oContext) {
                    debugger;
                    var sPath = oContext.getPath();
                    var oData = oContext.getObject();

                    // 승인 상태로 변경
                    oData.Arvst = "N";

                    oDataModel.update(sPath, oData, {
                        success: function() {
                            MessageToast.show("데이터 변경 완료");

                            oTable.getBinding("items").filter([new Filter({
                                path: 'Arvst',
                                operator: FilterOperator.EQ,
                                value1: 'W'
                            })]);

                            _countUpdate();
                        },
                        error: function(oError) {
                            MessageToast.show("데이터 변경 실패");
                            console.error("Update failed", oError);
                        }
                    });
                });
            
            },



            handleItemPress: function(oEvent) {
                // debugger;
                var oItem = oEvent.getSource();

                this.getOwnerComponent().getRouter().navTo("RouteDetail", {
                    Docno : oItem.getBindingContext().getProperty("Docno")
                }, true);

            }

        });
    });