//@author Lochlin S. Craig
var keybNumberAndAlpha = new keybEdit(' 0123456789abcdefghijklmnopqrstuvwxyz$@`~,"*+=-/_');

function keybEdit(strValid, strMsg) {
    var reWork = new RegExp('[a-z]','gi');		//	Regular expression\
    //	Properties
    if(reWork.test(strValid))
            this.valid = strValid.toLowerCase() + strValid.toUpperCase();
    else
            this.valid = strValid;
    if((strMsg == null) || (typeof(strMsg) == 'undefined'))
            this.message = '';
    else
            this.message = strMsg;
    //	Methods
    this.getValid = keybEditGetValid;
    this.getMessage = keybEditGetMessage;
    function keybEditGetValid() {
            return this.valid.toString();
    }
    function keybEditGetMessage() {
            return this.message;
    }
}

function editKeyBoard(ev, objForm, objKeyb) {
    strWork = objKeyb.getValid();
    strMsg = '';							// Error message
    blnValidChar = false;					// Valid character flag
    var BACKSPACE = 8;
    var DELETE = 46;
    var TAB = 9;
    var LEFT = 37 ;
    var UP = 38 ;
    var RIGHT = 39 ;
    var DOWN = 40 ;
    var END = 35 ;
    var HOME = 35 ;
    var EXCLAMATION = 33 ;
    var CARET = 94 ;
    var AMPERSAND = 38 ;
    var LEFTPARENTHESES = 40 ;
    var RIGHTPARENTHESES = 41 ;
    
    // Checking backspace and delete  
    if(ev.keyCode == BACKSPACE || ev.keyCode == LEFTPARENTHESES
        || ev.keyCode == RIGHTPARENTHESES || ev.keyCode == DELETE
        || ev.keyCode == TAB || ev.keyCode == LEFT
        || ev.keyCode == UP || ev.keyCode == RIGHT
        || ev.keyCode == DOWN || ev.keyCode == EXCLAMATION
        || ev.keyCode == CARET || ev.keyCode == EXCLAMATION)  {
            
        blnValidChar = true;
        
    }
    
    if(!blnValidChar) // Part 1: Validate input
            for(i=0;i < strWork.length;i++)
                    if(ev.which == strWork.charCodeAt(i) ) {
                            blnValidChar = true;
                            break;
                    }
                            // Part 2: Build error message
    if(!blnValidChar || ev.keyCode == AMPERSAND) 
    {
                //if(objKeyb.getMessage().toString().length != 0)
                    //		alert('Error: ' + objKeyb.getMessage());
            ev.returnValue = false;		// Clear invalid character
            
            
                ev.preventDefault();
        
            objForm.focus();						// Set focus
    }
}