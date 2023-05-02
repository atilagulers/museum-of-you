// -----JS CODE-----

//@input SceneObject framesParent;
//@input SceneObject tapIconsParent;
//@input Component.Text cta;

var previousIndex = null;
var currentIndex = null;

global.selectFrame = function(frameIndex)
{
    global.enableIcons();
    global.resetIcons();
    if(currentIndex)
    {
        previousIndex = currentIndex;
    }
    
    if(previousIndex != null)
    {
        global.tweenManager.startTween(script.framesParent.getChild(previousIndex), "unselected");
    }
    
    script.cta.text = "Flip Camera";
    currentIndex = parseInt(frameIndex);
    global.tweenManager.startTween(script.framesParent.getChild(currentIndex), "selected");
    script.tapIconsParent.getChild(currentIndex).enabled = false;
}

global.resetSelections = function()
{
    previousIndex = null;
    currentIndex = null;
    
    for(var i = 0; i < script.framesParent.getChildrenCount(); i++)
    {
        global.tweenManager.startTween(script.framesParent.getChild(i), "unselected")
    }
}

global.enableIcons = function()
{
    for(var i = 0; i < script.tapIconsParent.getChildrenCount(); i++)
    {
        script.tapIconsParent.getChild(i).enabled = true;
    }
}
global.disableIcons = function()
{
    for(var i = 0; i < script.tapIconsParent.getChildrenCount(); i++)
    {
        script.tapIconsParent.getChild(i).enabled = false;
    }
}

global.resetIcons = function()
{
    for(var i = 0; i < script.tapIconsParent.getChildrenCount(); i++)
    {
        for(var j = 0; j < global.filledFrames.length; j++)
        {
            if(global.filledFrames[j] == i)
            {
                script.tapIconsParent.getChild(i).enabled = false;
            }
            
        }  
    }
}