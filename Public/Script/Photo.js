// -----JS CODE-----

//@input string photoName = "Photo1" {"widget": "combobox", "values": [{"value": "Photo1", "label": "Photo1"}, {"value": "Photo2", "label": "Photo2"}, {"value": "Photo3", "label": "Photo3"}, {"value": "Photo4", "label": "Photo4"}, {"value": "Photo5", "label": "Photo5"}, {"value": "Photo6", "label": "Photo6"}, {"value": "Photo7", "label": "Photo7"}, {"value": "Photo8", "label": "Photo8"}], "label": "Photo"}
//@input Asset.AudioTrackAsset selectionSFX;


var interactionComponent = script.getSceneObject().getComponent("Component.InteractionComponent");


interactionComponent.onTap.add(function()
{
    if(!global.canSelect) {return;}
    global.canSelect = false;    
    
    global.currentState = global.states[script.photoName];
    global.playSound(script.selectionSFX);
   
    var photoIndex = script.photoName.slice(5,6);
    
    global.selectFrame(photoIndex - 1);
    
    global.resetSelectionCooldown();
})