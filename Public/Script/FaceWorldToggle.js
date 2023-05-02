// -----JS CODE-----
//@input SceneObject[] frontCamera;
//@input SceneObject[] backCamera;

//@input SceneObject scenes;
//@input SceneObject worldPhotoParent;
//@input SceneObject iconsParent;


script.createEvent("CameraFrontEvent").bind(function()
{
    script.iconsParent.enabled = false;

    for(var i = 0; i < script.frontCamera.length; i++)
    {
        script.frontCamera[i].enabled = true;
    }
    
    for(var i = 0; i < script.backCamera.length; i++)
    {
        script.backCamera[i].enabled = false;
    }
    
    for(var i = 0; i < script.worldPhotoParent.getChildrenCount(); i++)
    {
        script.worldPhotoParent.getChild(i).enabled = false;
    }

    enableCurrentPhoto()
    global.isFrontCamera = true;
})

script.createEvent("CameraBackEvent").bind(function()
{
    if(global.doorOpened){
       script.iconsParent.enabled = true; 
    }
    
    
    for(var i = 0; i < script.frontCamera.length; i++)
    {
        script.frontCamera[i].enabled = false;
    }
    
    for(var i = 0; i < script.backCamera.length; i++)
    {
        script.backCamera[i].enabled = true;
    }
    
    for(var i = 0; i < script.worldPhotoParent.getChildrenCount(); i++)
    {
        script.worldPhotoParent.getChild(i).enabled = true;
        
    }

    
    global.resetIcons();
    disableAllPhotos();
    global.isFrontCamera = false;
})

function enableCurrentPhoto()
{
    disableAllPhotos();

    if(global.currentState == global.states.Photo1)
    {
        script.scenes.getChild(0).enabled = true;
    }
    
    if(global.currentState == global.states.Photo2)
    {
        script.scenes.getChild(1).enabled = true;
    }
    
    if(global.currentState == global.states.Photo3)
    {
        script.scenes.getChild(2).enabled = true;
    }
    
    if(global.currentState == global.states.Photo4)
    {
        script.scenes.getChild(3).enabled = true;
    }
   
    if(global.currentState == global.states.Photo5)
    {
        script.scenes.getChild(4).enabled = true;
    }
    
    if(global.currentState == global.states.Photo6)
    {
        script.scenes.getChild(5).enabled = true;
    }
    
    if(global.currentState == global.states.Photo7)
    {
        script.scenes.getChild(6).enabled = true;
    }
    
    if(global.currentState == global.states.Photo8)
    {
        script.scenes.getChild(7).enabled = true;
    }
}

function disableAllPhotos()
{
    for(var i = 0; i < script.scenes.getChildrenCount(); i++)
    {
        script.scenes.getChild(i).enabled = false;
    }
}