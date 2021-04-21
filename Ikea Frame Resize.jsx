/*
IKEA FRAME RESIZE
This photoshop script takes the currently open image
and prepares it for printing so that it will fit
and Ikea RIBBA or other similar frame. It is recommended
that you crop to a correct ratio or you might get distortion.

12x16 Frame: 4x5 crop
16x20 Frame: 11.5 x 15.25 crop
19 3/4 x27 1/2 Frame: 15.25 x 19.25 crop
24x35 3/4 Inches (19.75 x 27.25)  (20 x 30 print)

Author: Scott Wurzel (me@scottwurzel.com)
Date: December 2020
*/  

//Set up scriptUI elements to get user input
var dialog = new Window("dialog"); 
    dialog.text = "Document Setup"; 
    dialog.preferredSize.width = 100; 
    dialog.preferredSize.height = 100; 
    dialog.orientation = "column"; 
    dialog.alignChildren = ["center","top"]; 
    dialog.spacing = 10; 
    dialog.margins = 16; 

var statictext1 = dialog.add("statictext", undefined, undefined, {name: "statictext1"}); 
    statictext1.text = "Ikea Frame Size"; 

var size_array = ["12x16","16x20","19 3/4 x27 1/2","24x35 3/4","12x16 UK","16x20","19 3/4 x27 1/2 UK","19 3/4 x27 1/2 UK","24x35 3/4 UK"]; 
var size_selection = dialog.add("dropdownlist", undefined, undefined, {name: "size", items: size_array}); 
size_selection.selection = 0; 

var statictext1 = dialog.add("statictext", undefined, undefined, {name: "statictext1"}); 
    statictext1.text = "Orientation"; 

var orient_array = ["Landscape","Portrait"]; 
var orient_selection = dialog.add("dropdownlist", undefined, undefined, {name: "orient", items: orient_array}); 
orient_selection.selection = 0; 

var statictext2 = dialog.add("statictext", undefined, undefined, {name: "statictext2",multiline:true}); 
statictext2.text = "Note: Frame size is the total size. Actual image is smaller. See Layers for which size to order."; 
statictext2.text += " Works for most IKEA frames with listed dimensions including RIBBA. ";
statictext2.text += "\nNOTE: recommended that you crop to target aspect ratio"
var button1 = dialog.add("button", undefined, undefined, {name: "button1"}); 
button1.text = "Go!"; 

//Get open document
var docRef =  app.activeDocument;

/* Resizes image and stretch canvas */
function doResize(imageW,imageH,canvasW,canvasH){ 
    //resize image to ikea opening. This is the interior of the mat
    docRef.resizeImage(imageW,imageH);

    //increase canvas size to the size of the target print
    docRef.resizeCanvas(canvasW,canvasH);

}


/* action to execute from dialog */
button1.onClick = function(){
    // Resizes an image for an ikea frame
    var size = size_selection.selection.text;
    var orient = orient_selection.selection.text;

    //make sure ruler is set to inches
    var originalUnit = preferences.rulerUnits; 
    preferences.rulerUnits = Units.INCHES;

    //IKEA* 12x16 Inches (7 x 9) (8x10 print)
    //IKEA* 16x20 Inches (11.5 x 15.25) (12 x 18 print)
    //IKEA* 19 3/4 x27 1/2 Inches (15.25 x 19.25) (16 x 20 print)
    //IKEA* 24x35 3/4 Inches (19.75 x 27.25)  (20 x 30 print)

    var printsize = ""; //holds the print size for the selected frame size
    if(size == "12x16"){
        if(orient=="Landscape"){
            doResize(9.75,7.75,10.0,8.0);

        } else {
            doResize(7.75,9.75,8.0,10.0);
        } 
        printsize = "8x10";
    }
    else if(size=="16x20"){
        if(orient=="Landscape"){
            doResize(16,12,18.0,12.0);
        }
        else {
            doResize(12,16,12.0,18.0)
        }
        printsize = "12x18";
    }
    else if(size=="19 3/4 x27 1/2"){
        if(orient=="Landscape"){
            doResize(19.75,15.75,20.0,16.0);
        }
        else{
            doResize(15.75,19.75,16.0,20.0);
        }
        printsize = "16x20";
    }
    else if(size=="24x35 3/4"){
        if(orient=="Landscape"){
            doResize(27.5,19.75,30.0,20.0);
        }
        else{
            doResize(19.75,27.5,20.0,30.0);
        }
        printsize="20x30";
    }

    else if(size == "12x16 UK"){
        if(orient=="Landscape"){
            doResize(11.811,8.26772,8.0,10.0);

        } else {
            doResize(8.26772,11.811,10.0,8.0);
        } 
        printsize = "8x10";
    }
    else if(size=="16x20 UK"){
        if(orient=="Landscape"){
            doResize(15.748,11.811,18.0,12.0);
        }
        else {
            doResize(11.811,15.748,12.0,18.0)
        }
        printsize = "12x18";
    }
    else if(size=="19 3/4 x27 1/2 UK"){
        if(orient=="Landscape"){
            doResize(19.685,15.748,20.0,16.0);
        }
        else{
            doResize(19.685,19.2913,16.0,20.0);
        }
        printsize = "16x20";
    }
    else if(size=="24x35 3/4 UK"){
        if(orient=="Landscape"){
            doResize(27.5591,19.685,30.0,20.0);
        }
        else{
            doResize(19.685,27.5591,20.0,30.0);
        }
        printsize="20x30";
    }

    //create a layer to remind you which size to order
    var layerRef = docRef.artLayers.add();
    layerRef.name = "Order print size "+printsize+". OKAY TO DELETE"

    //cleanup
    app.preferences.rulerUnits = originalUnit;
    docRef = null;
    layerRef = null;
    dialog.close()
}

dialog.show();

