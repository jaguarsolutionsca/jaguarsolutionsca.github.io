/* ================================================
 * impact.js
 =================================================*/

//The following line will make sure BodyOnLoad() is called on every page
window.onload = BodyOnLoad;

//The following lines enable custom SmartNavigation
window.onscroll   = GetScrollCoordinate;
window.onkeypress = GetScrollCoordinate;
window.onclick    = GetScrollCoordinate;


function adjustIFrameSize(iframeWindow, minHeight)
{
    if(iframeWindow.document.height)
    {
        var iframeElement = parent.document.getElementById(iframeWindow.name);
        if (iframeWindow.document.height < minHeight)
        {
			iframeElement.style.height = minHeight + 'px';
        }
        else
        {
			iframeElement.style.height = iframeWindow.document.height + 'px';
        }
        iframeElement.style.width = iframeWindow.document.width + 17 + 'px';
    }
    else if(document.all)
    {
        var iframeElement = parent.document.getElementById(iframeWindow.name);

        if (iframeWindow.document.compatMode && iframeWindow.document.compatMode != 'BackCompat')
        {
            if (iframeWindow.document.documentElement.scrollHeight < minHeight)
			{
				iframeElement.style.height = minHeight + 'px';
			}
			else
			{
				iframeElement.style.height = iframeWindow.document.documentElement.scrollHeight + 0 + 'px';
			}
            iframeElement.style.width = iframeWindow.document.documentElement.scrollWidth + 17 + 'px';
        }
        else
        {
            if (iframeWindow.document.body.scrollHeight < minHeight)
			{
				iframeElement.style.height = minHeight + 'px';
			}
			else
			{
				iframeElement.style.height = iframeWindow.document.body.scrollHeight + 0 + 'px';
			}
            iframeElement.style.width = iframeWindow.document.body.scrollWidth + 17 + 'px';
        }
    }
}

function openWin(url, w, h)
{
    window.open(url, null, 'width='+ w +',height='+ h +',status=no,scrollbars=no,resizable=no');
}

function BodyOnLoad()
{
    startList();
    //initialiseMenu();

    //Set focus to the first input tag that has a 'setFocus' attribute.
    var inputs = document.getElementsByTagName('input');
    for ( var i=0; i<inputs.length; i++ )
    {
        var setFocusField = inputs.item(i).getAttribute('setFocus');
        if (setFocusField != null)
        {
            inputs.item(i).focus();
            break;
        }
    }

    //Kludge to apply .jagEditor to the FreeTextBox
    var editor = document.getElementById("jagEditor_FTB");
    if (editor != null)
    {
		var jagEditor = getCssElement("#jagEditor_FTB .jagEditor");
		
		var tables = editor.getElementsByTagName("Table");
		var table = tables[0];
		table.style.width = jagEditor.style['width'];
		table.style.height = jagEditor.style['height']
		//alert(table);
    }
    
    //Scroll page at last position
    var form1 = document.forms['Form1'];
    if (form1)
    {
		window.scrollTo(0, form1.ScrollTop.value);
	}
}

function GetScrollCoordinate()
{
	var scrollY;

	if (document.all)
	{
		if (!document.documentElement.scrollTop)
			scrollY = document.body.scrollTop;
		else
			scrollY = document.documentElement.scrollTop;
	}   
	else
	{
		scrollY = window.pageYOffset;
	}

    var form1 = document.forms['Form1'];
    if (form1)
    {
		form1.ScrollTop.value = scrollY;
	}
}


function SmartNavNoPost(theUrl, theScroll)
{
    var form1 = document.forms['Form1'];
	location.href = theUrl.replace("/Default.aspx", "/snnp=" + form1.ScrollTop.value + "/Default.aspx");
}


function getCssElement(theClass)
{
	var cssRules;
	if (document.all)
	{
		cssRules = 'rules';
	}
	else if (document.getElementById)
	{
		cssRules = 'cssRules';
	}
	
	for (var s = 0; s < document.styleSheets.length; s++)
	{
		var allRules = document.styleSheets[s][cssRules];
		for (var r = 0; r < allRules.length; r++)
		{
			if (allRules[r].selectorText == theClass)
			{
				return allRules[r];
			}
		}
	}
	return null;
}

function changeCssElement(theClass, element, value)
{
	//documentation for this script at http://www.shawnolson.net/a/503/
	var cssRules;
	if (document.all)
	{
		cssRules = 'rules';
	}
	else if (document.getElementById)
	{
		cssRules = 'cssRules';
	}
	
	for (var s = 0; s < document.styleSheets.length; s++)
	{
		var allRules = document.styleSheets[s][cssRules];
		for (var r = 0; r < allRules.length; r++)
		{
			if (allRules[r].selectorText == theClass)
			{
				allRules[r].style[element] = value;
			}
		}
	}
}


/* ------------------------------------------------
 * Vertical menu
 * See http://www.codeproject.com/html/dmenusimple.asp
 -------------------------------------------------*/
function initialiseMenu()
{
    var objLICollection = document.getElementById("jagMenu").getElementsByTagName("LI");
    for(var i=0; i<objLICollection.length; i++)
    {       
        var objLI = objLICollection[i];                                     
        for(var j=0; j<objLI.childNodes.length; j++)
        {
            if(objLI.childNodes.item(j).nodeName == "UL")
            {
                objLI.onmouseover = showSubMenu;
                objLI.onmouseout = hideSubMenu;
/*
                for(var j=0; j<objLI.childNodes.length; j++)
                {
                    if(objLI.childNodes.item(j).nodeName == "A")
                    {                   
                        objLI.childNodes.item(j).className = "hassubmenu";                              
                    }
                }
*/
            }
        }
    }
}

function showSubMenu()
{
    var objThis = this; 
    for(var i=0; i<objThis.childNodes.length; i++)
    {
        if(objThis.childNodes.item(i).nodeName == "UL")         
        {                           
            objThis.childNodes.item(i).style.display = "block";                     
        }       
    }   
}

function hideSubMenu()
{                               
    var objThis = this; 
    for(var i=0; i<objThis.childNodes.length; i++)          
    {
        if(objThis.childNodes.item(i).nodeName == "UL")
        {               
            objThis.childNodes.item(i).style.display = "none";          
            return;
        }           
    }   
}           


/* ------------------------------------------------
 * Suckerfish
 * Horizontal menu.
 -------------------------------------------------*/
//startList = function() {
function startList()
{
    if( document.all && document.getElementById )
    {
        navRoot = document.getElementById("jagMenu_UL0");
        for(i=0; i<navRoot.childNodes.length; i++)
        {
            node = navRoot.childNodes[i];
            if(node.nodeName == "LI") {
                node.onmouseover = function() {
                    this.className += " over";
                }
                node.onmouseout = function() {
                    this.className = this.className.replace(" over", "");
                }
            }
        }
    }
}
