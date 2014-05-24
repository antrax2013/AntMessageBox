AntMessageBox
=============

AntMessageBox, is a pre-define jQuery ui-dialog encapsulated in Javascript object. All AntMessageBoxes are able to contain simple and/or advanced html like images, forms, tables... and callbacks when fired events of buttons in the footer.
There are 3 avaibles types of AntMessageBox:
. MsgDialogBox: basic info dialog box
. AlertDialogBox: alert box like alert function of javascript. Callbacks could be specified on fired click event "ok" button
. ConfirmDialogBox: confirm box like confirm function of javascript. Callbacks could be specified on fired click event of "ok/cancel" buttons			

Type is defiend when the MessageBox is displayed. Somes settings of each types are avaible to cutstomise them.

Release Note:
AntMessageBox V0.13
=============
- When AntMessageBox is displayed without call intDialogBox, the div insert into the DOM is not removed on destroy event. [fixed]
- Impossible to change title with intDialogBox fonction. [fixed]

