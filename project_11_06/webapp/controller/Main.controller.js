sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,Fragment) {
        "use strict";

        return Controller.extend("project1106.controller.Main", {
            onInit: function () {

            },

            //HelloFrag.fragment.xml 안에 있는 버튼 press 이벤트
            HelloButtonPress : function() {
                sap.m.MessageToast.show("Hello~~~~")
            },

            onOpenDialog : function() {
                this.byId("idDialog").open();
            },
            //Button의 press 이벤트
            //이벤트 함수는 이벤트 객체 oEvent 받아옴
            onClose : function(oEvent) {
                //oEvnet 안에는 getSource(), getParameters().. 메서드가 있음

                // this.byId("idDialog").close();
                //  => View에서 호출한 팝업 닫기
                // sap.ui.getCore().byId("idDialog").close();
                //  => Controller 안에서 파일 로드한 팝업 닫기
                // 두 버전의 "팝업 닫기"를 통일하여 사용하려면? oEvent 활용

                // oEvent.getSource() 하면, 이벤트를 일으킨 객체가 리턴됨 > 버튼
                // 버튼에서 .getParent()하면, 상위 객체 Dialog를 가져올 수 있음
                // 따라서 Dialog에서 .clos() 실행 시 팝업이 닫힘
                oEvent.getSource().getParent().close();
            },
           // Controller 내에서 Dialog Fragment 호출하기, Define 추가
           // 외부에서 추가한 것(view 파일이랑 별도로 fragment 파일이 있으므로)
            onOpenDialog_con : function() {
                var dialog = sap.ui.getCore().byId("idDialog");

           // 조건문 if문을 사용하여 파일을 1번만 load 할 수 있도록 함!    

           //만약에, dialog 변수에 값이 있으면 dialog.open() 하면 되고
           //dialog 변수에 값이 없으면 load 메서드를 실행한다.
               if(!dialog) { 
           // 팝업 부르는 구문    
               Fragment.load({
                    name : "project1106.view.fragment.Name",  //fragment경로 들어감
                    type : "XML",
                    controller : this
                }). then(function(oDialog) {
                    oDialog.open();
                });
            }else{
                dialog.open();
            }
            }
        });
    });
