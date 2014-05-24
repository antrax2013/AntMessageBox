/*! AntMessageBox V0.13
* Copyright (c) 2014 AntProduction
* https://github.com/antrax2013/AntMessageBox
*
* GPL license:
*   http://www.gnu.org/licenses/gpl.html
*
* Contributor: antrax2013@hotmail.com
*
*/

var AntMessageBox = function () {
    this.box = null
    this.title = null
    var _initWithTarget = false
        
	//this.initWithTarget = function() { return _initWithTarget},
    this.initDialogBox = function (p_title, p_elmt) {
        this.box = (p_elmt != undefined && p_elmt.trim() != "") ? $(p_elmt) : null;
        this.title = (p_title != undefined)? p_title:"";

        if (this.box == null || this.box.length == 0) {
            var id = 'AntMessageBox-'+new Date().getTime();
            $("body").append("<div id='" + id + "'></div>");
            this.box = $("#" + id);
			_initWithTarget = false;
        }
		else _initWithTarget = true;
        
        this.box.dialog({
            autoOpen: false,
            width:'auto',
            show: { effect: "blind" },
            hide: { effect: "blind" },
            buttons: { Ok: function () { $(this).html = ""; $(this).dialog("close"); } },
            title: this.title,
            close: function (event, ui) { if (_initWithTarget) $(this).dialog("close"); else { $(this).dialog("destroy"); $(this).remove(); } }
        });
        

    },

	this.MsgDialogBox = function (p_content, p_modal) {
	    if (_initWithTarget == false) this.initDialogBox((this.title != null && this.title.length)? this.title:"Info");
	    this.box.html(p_content);
	    this.box.dialog({ dialogClass: "info" });
	    this.box.dialog("option", "modal", p_modal==true);
	    this.box.dialog("open");
	}

    this.AlertDialogBox = function (p_content, p_ok_click_callback, p_label_ok) {
        if (_initWithTarget == false) this.initDialogBox((this.title != null && this.title.length)? this.title:"Alert");
        this.box.html(p_content);
        this.box.dialog("option", "modal", true);
        this.box.dialog({ dialogClass: "alert" });
        this.box.dialog("option", "buttons",
            [
                {
                    text: p_label_ok != null ? p_label_ok : "Ok",
                    click: function () { if (typeof (p_ok_click_callback) == 'function') { p_ok_click_callback(); } $(this).dialog("close"); }
                }
            ]);
        this.box.dialog("open");
    }

    this.ConfirmDialogBox = function (p_content, p_ok_click_callback, p_cancel_click_callback, p_label_ok, label_cancel) {
        if (_initWithTarget == false) this.initDialogBox((this.title != null && this.title.length)? this.title:"Confirm");
        this.box.html(p_content);
        this.box.dialog("option", "modal", true);
        this.box.dialog("option", "buttons",
            [
                {
                    text: p_label_ok != null ? p_label_ok : "Ok",
                    click: function () { if (typeof (p_ok_click_callback) == 'function') { p_ok_click_callback(); } $(this).dialog("close"); }
                },
                {
                    text: label_cancel != null ? p_label_ok : "Cancel",
                    click: function () { if (typeof (p_cancel_click_callback) == 'function') { p_cancel_click_callback(); } $(this).dialog("close"); }
                }
            ]);
        this.box.dialog("open");
    }

    //Gestion des événements clavier sur element
    this.KeyEvent = function (idBoutonValide, idElement) {
        this.box.find("#" + idElement).keypress(function (e) {
            if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {//Bouton entrée
                $("#" + idBoutonValide).click();
            }
            else if ((e.which && e.which == 27) || (e.keyCode && e.keyCode == 27)) { //Bouton échap
                $(this).dialog("close");
            }
        });
    }

};


