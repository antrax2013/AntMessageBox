AntMessageBox
=============

AntMessageBox, is a pre-defined jQuery ui-dialog encapsulated in Javascript object. AntMessageBoxes are ables to contain html (v4 or v5) and optionnal callback binded functions on click event of buttons.

3 available types of AntMessageBox: 
- MsgDialogBox
- AlertDialogBox 
- ConfirmDialogBox

<a href="http://antproduction.free.fr/AntMessageBox" target="_blank">Home page</a>

Have a question about AntMessageBoxes ? Please use GitHub Issue. 

Release Note: V0.21 - 07/03/2014
=============
- Add public property content into the class
- Add public parameter p_content on prototype of initDialogBox function

Next step : v0.3
=============
- Tranform into plugin jQuery
- ex: 
(function($) {
        $.fn.antMessageBox = function(params) { ... };
})(jQuery);
