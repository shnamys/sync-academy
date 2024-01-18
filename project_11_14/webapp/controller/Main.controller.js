sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox",
    "sap/m/MessageToast"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, MessageBox, MessageToast) {
        "use strict";

        return Controller.extend("project1114.controller.Main", {
            onInit: function () {
                var oJsonData = new JSONModel({
                    Memid :"",
                    Memnm : "",
                    Telno : "",
                    Email : ""
                })
                    
            
                // Input value에다가 Binding 하기=> {data>/Productno}
                this.getView().setModel(oJsonData, "data");

            },
            onRowSelectionChange : function(oEvent) {
                // Row 선택 해제 되었을 때도, '선택' 된 것이기 때문에 이벤트 발생
                // 따라서 rowContext가 없을 땐 함수 종료하도록 함
                if(!oEvent.getParameter('rowContext')) return; // 함수종료


                var sPath = oEvent.getParameter('rowContext').getPath();
                debugger;
                var oSelectData = this.getView().getModel().getProperty(sPath);

                // debugger;

                // 모델 데이터를 가져와서
                // 각각의 Input에 세팅할 수 있음.
                // 이 때, 세팅하는 방법은 id 말고, JSON Model 데이터로 해보기
                // JSON Model의 이름은 'data'로 하겠음

                var oModel = this.getView().getModel("data"); 
                
                // console.log(oModel);
                // 오답 : 
                // var sInput = oModel.getProperty();
                // oModel.setData({ data : sInput });
                oModel.setData(oSelectData);

            },
            onReset : function() {
               
                var sInput = this.getView().getModel("data"); 
                

                // 테이블 선택되면서 생기는 파란색 
                this.byId("idTable").clearSelection();
                this.getView().getModel().refresh(true);
            },
            onEntitySet : function() {
                var oModel = this.getView().getModel();
                    oModel.read("/ZTMEMBER_SB11Set", {
                    success : function(oReturn) {
                        console.log("전체조회: ", oReturn);                               
                    },
                    error : function(oError) {
                        console.log("전체조회 중 오류 발생", oError);
                    }
                 })
                
            }, 
            onCreate : function() {
                var oModel = this.getView().getModel();
                var oJsonData = this.getView().getModel('data').getData();

                var oBody = {
                    Memid : oJsonData.Memid,
                    Memnm : oJsonData.Memnm,
                    Telno : oJsonData.Telno,
                    Email : oJsonData.Email

                };
                oModel.create("/ZTMEMBER_SB11Set", oBody, {
                    success : function() {
                        // sap.m.MessageToast.show("데이터 생성 완료");
                        MessageBox.success("데이터 생성 완료");
                        console.log("11111111");
                    },
                    error : function(oError) {
                        // sap.m.MessageToast.show("에러 발생");
                        MessageBox.error("에러 발생.", {
                            actions: ["Manage Products", MessageBox.Action.CLOSE],
                            emphasizedAction: "Manage Products",
                            onClose: function (sAction) {
                                MessageToast.show("Action selected: " + sAction);
                            }
                        });
                        console.log("22222222");
                    },
                    _showMessage : function(msg) {
                        sap.m.MessageToast.show(msg);
                    }
                });

            },
            onEntity : function() {
                var oBody = this.getView().getModel('data').getData();
                var oDataModel = this.getView().getModel();
                var sPath = oDataModel.createKey("/ZTMEMBER_SB11Set", {
                    Productno : oBody.Productno
                });
                oDataModel.read(sPath, {
                    success : function(oReturn) {
                        console.log("한 건 조회: ", oReturn)
                    }
                })


            }
            


        });
    });
