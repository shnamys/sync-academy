sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    'sap/ui/model/Filter',
    'sap/ui/model/FilterOperator'
],
function (Controller, JSONModel, Filter, FilterOperator) {
    "use strict";

    return Controller.extend("project1118.controller.Main", {
        onInit: function () {
            var oDataModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZBA_GW_FI_02_SRV/", true);
            this.getView().setModel(oDataModel);

            oDataModel.read("/DocEntitySet", {
                success: function(oData) {
                    // 중복 제거하는 함수 정의
                    function removeDuplicates(array, key) {
                        return array.filter((item, index, self) =>
                            index === self.findIndex((t) => (
                                t[key] === item[key]
                            ))
                        );
                    }
                     // 중복 제거
                     var oDistinctData = removeDuplicates(oData.results, "Racct");

                     // racct로 오름차순으로 정렬
                     oDistinctData.sort(function(a, b) {
                        return a.Racct.localeCompare(b.Racct);
                    });

                    // 특정 조건을 만족하는 racct 필터링 
                    var desiredRaccts = ["111004", "221001", "441001", "441002", "551001", "991002"];
                    var filteredData = oDistinctData.filter(function(item) {
                        return desiredRaccts.includes(item.Racct);
                    });


                    // ComboBox에 중복 제거된 데이터 바인딩
                    var oComboBox = this.getView().byId("idRacct");
                    var oModel = new JSONModel(filteredData);
                    oComboBox.setModel(oModel);
                    oComboBox.bindItems("/", new sap.ui.core.ListItem({
                        key: "{Racct}",
                        text: "{Racct}",
                        additionalText: "{GlNm}"
                    }));
                }.bind(this),
                error: function(oError) {
                    console.error("Error occurred while reading data from the service: ", oError);

                }
            });
        },

        onSearch: function() {
            var sRacctId = this.byId("idRacct").getSelectedKey();
            var oVizFrame = this.getView().byId("idChart");
            var sDatasetPath = oVizFrame.getDataset().getBindingInfo("data").path;
            var oBinding = this.getView().getModel().bindList(sDatasetPath);
            var aFilters = [];
        
            if (sRacctId) {
                var oFilter = new Filter({
                    path: 'Racct',
                    operator: FilterOperator.EQ,
                    value1: sRacctId
                });
                aFilters.push(oFilter);
            }
        
            oBinding.filter(aFilters);
        }
        

        
       
    });
});
