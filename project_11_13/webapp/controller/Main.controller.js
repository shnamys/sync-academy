sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, Filter) {
        "use strict";

        return Controller.extend("odata.project1113.controller.Main", {
            onInit: function () {
                var oJsonData = new JSONModel({
                    Productno : "",
                    Productname : "",
                    Fname : "",
                    Lname : "",
                    Memo : ""
                })
                // Input value에다가 Binding 하기=> {data>/Productno}
                this.getView().setModel(oJsonData, "data");
               
            },
            onRowSelectionChange : function(oEvent) {
                // Row 선택 해제 되었을 때도, '선택' 된 것이기 때문에 이벤트 발생
                // 따라서 rowContext가 없을 땐 함수 종료하도록 함
                if(!oEvent.getParameter('rowContext')) return; // 함수종료
                var sPath = oEvent.getParameter('rowContext').getPath();
                var oSelectData = this.getView().getModel().getProperty(sPath);

                // debugger;

                //모델 데이터를 가져와서
                //각각의 Input에 세팅할 수 있음.
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
                sInput.setData();

                // 테이블 선택되면서 생기는 파란색 
                this.byId("idTable").clearSelection();
                this.getView().getModel().refresh(true);
            },
            onEntitySet : function() {
                // 전체 조회 구현
                // GET 요청 : "/Products"
                var oDataModel = this.getView().getModel();
                var oFilter = new Filter("Productname", "EQ", "안녕");
                var oDialog = this.byId("idDialog");                   
                
                oDataModel.read("/Products", {
                    filters : [oFilter],
                    success : function(oReturn) {
                        console.log("전체조회: ", oReturn);
                    // 요청한 데이터를 서버에서 성공적으로 응답을 받았을 때
                    oDialog.setModel(new JSONModel(oReturn), 'filter');
                    oDialog.open();            
                    },
                    error : function(oError) {
                        console.log("전체조회 중 오류 발생", oError);
                    }
                } );
            },
            onEntity: function() {
                // 데이터 한 건 조회
                // GET 요청 :"/Products(Product('01')"

                var oBody = this.getView().getModel('data').getData();
                var oDataModel = this.getView().getModel();
                var sPath = oDataModel.createKey("/Products", {
                    Productno : oBody.Productno 
                }); // sPath값 => "/Products('1000')"
                    // Productno '1000'번에 해당하는 데이터 한 건을 조회함
                oDataModel.read(sPath, {
                    success : function(oReturn) {
                        console.log("한 건 조회: ", oReturn)
                    }

                })

            },
            onCreate : function() {
                //데이터 생성 구현
                //POST 요청 : "/Products" + Body 
                var oDataModel = this.getView().getModel();
                var oJsonData = this.getView().getModel('data').getData();
                
                // 아래 코드 중 A || '' 의 뜻 ?
                // => A 값이 없으면(false), 빈 문자열을 넣어라            
                var oBody= {
                    Productno : oJsonData.Productno,
                    Productname : oJsonData.Productname || "",
                    Fname : oJsonData.Fname || "",
                    Lname : oJsonData.Lname || "",
                    Memo : oJsonData.Memo || ""
                };
                oDataModel.create("/Products", oBody, {
                    success : function() {
                        sap.m.MessageToast.show("데이터 생성 완료");
                       
                    }
                    
                });
            },
            onUpdate : function() {
                //데이터 변경 요청
                //Put 요청 : "/Products('1000')" + Body

                var oBody = this.getView().getModel('data').getData();
                var oDataModel = this.getView().getModel();
                var sPath = oDataModel.createKey("/Products", {
                    Productno : oBody.Productno
                }); // "/Products('키값')"과 동일
                debugger;

                oDataModel.update(sPath, oBody, {
                    success : function() {
                        sap.m.MessageToast.show("데이터 변경 완료");
                    }
                });

            },
            onDelete : function() {
                //데이터 삭제 요청
                //DELETE 요청 : "/Products('1000')"


                var oBody = this.getView().getModel('data').getData();
                var oDataModel = this.getView().getModel();
                var sPath = oDataModel.createKey("/Products", {
                    Productno : oBody.Productno
                }); // "/Products('키값')"과 동일

                oDataModel.remove(sPath,{
                    success : function() {
                        sap.m.MessageToast.show('삭제되었습니다.');
                    }
                });

            },
            onClose : function() {
                this.byId("idDialog").close();

            }

        });
    });
