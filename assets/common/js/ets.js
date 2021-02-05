/******************************************************************************
*	용도		:	홈페이지 사용되는 공통 UI.js
*	대상 		:	홈페이지 메인 페이지
*	주의		:	스크립트 작성시 간략한 주석 표기
*	참고사항	:	없음
*	기타		:	Fedev UI.js
*	작성일자	:	2020.10.30
*******************************************************************************/


// Etoos Js
(function($) { 'use strict';
  var Etoos = {};
  window.Etoos = {};
  window.Etoos = Etoos = (function() {
    return {
      Theme: function() {
          /* OS테마 변경시 적용코드 */
          // var prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
          // var currentTheme = document.body.getAttribute('data-theme');

          /* if (currentTheme == "dark") {
            document.body.setAttribute('data-theme', 'dark');
          } else if (currentTheme == "light") {
            document.body.setAttribute('data-theme', 'light');
          } */

          var btnTheme = $('#colorModeBtn');
          btnTheme.append('<strong class=\"status\"></strong>');
          var status = btnTheme.find('.status');
          status.text(decodeURIComponent(atob('JUVCJTlEJUJDJUVDJTlEJUI0JUVEJThBJUI4JUVCJUFBJUE4JUVCJTkzJTlD')));

          btnTheme.on("click", function () {
            /* if (prefersDarkScheme.matches) */
            if (document.body.getAttribute('data-theme') === "light") {
              document.body.setAttribute('data-theme', 'dark');
              status.text(decodeURIComponent(atob('JUVCJTlEJUJDJUVDJTlEJUI0JUVEJThBJUI4JUVCJUFBJUE4JUVCJTkzJTlD')));
            } else {
              document.body.setAttribute('data-theme', 'light');
              status.text(decodeURIComponent(atob('JUVCJThCJUE0JUVEJTgxJUFDJUVCJUFBJUE4JUVCJTkzJTlD')));
            }
            // localStorage.setItem("theme", document.body.getAttribute("data-theme"));
          });
      },
      modules: [],
      module: function(fn) {
				this.modules.push({fn:fn});
				return this;
			},
			resetModules: function() {
				$.each(this.modules, function() {
					this.fn();
				});
				return this;
      },
      initialize: function() {
        // Ready
				$(function() {
					setTimeout(function() {
            Etoos.Theme();
            Etoos.resetModules();
            // 사이드 Default 수정
            // $("#_asideCard .side_list>li:first-child a").trigger('click');
					}, 1);
				});
				return this;
			}
    }
  })().initialize();

})(jQuery);







