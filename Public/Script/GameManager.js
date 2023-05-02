// -----JS CODE-----

//@input SceneObject worldPhotoParent;
//@input SceneObject photoBase;
//@input Asset.Material photoBaseMaterial;
//@input Asset.Texture defaultRender;
//@input Component.Text cta;
//@input SceneObject flashEffect;
//@input Component.DeviceTracking worldCam;
//@input SceneObject museum;
//@input SceneObject spawnPosition;
//@input Asset.AudioTrackAsset[] countDownSFXs;
//@input SceneObject scenesParent;
//@input SceneObject doorParent;
//@input SceneObject leftDoor;
//@input SceneObject rightDoor;
//@input SceneObject tapIconsParent;

var screenResolution;
var photoCounter = 3;

var worldCameraTransform = script.worldCam.getTransform();
var museumPosition = script.museum.getTransform().getWorldPosition();
var spawnPosition = script.spawnPosition.getTransform().getWorldPosition();
var AreYouInsideMuseum = false;
var canTakePhoto = true;

global.states = {
    Photo1: "PHOTO_1",
    Photo2: "PHOTO_2",
    Photo3: "PHOTO_3",
    Photo4: "PHOTO_4",
    Photo5: "PHOTO_5",
    Photo6: "PHOTO_6",
    Photo7: "PHOTO_7",
    Photo8: "PHOTO_8",
    Counting: "COUNTING",
    World: "WORLD"
}

global.currentState = states.Photo1;

var lastPosition = new vec3(0,0,0)
var backCtaFlag = false;
script.createEvent("CameraBackEvent").bind(function()
{
    canTakePhoto = true;
    if(AreYouInsideMuseum)
    {
        script.museum.getTransform().setWorldPosition(script.worldCam.getTransform().getWorldPosition());
               
        //script.worldCam.getTransform().setWorldPosition(script.spawnPosition.getTransform().getWorldPosition())
    }
    
    
    if(backCtaFlag) {
        script.cta.text = "Select a Frame";
        return;
    }
    backCtaFlag = true;
    script.cta.text = "Walk through to Portal Door";
})

script.createEvent("CameraFrontEvent").bind(function()
{
    script.cta.text = "Tap and Pose";
    global.resetSelections();
})

script.createEvent("UpdateEvent").bind(function()
{
    if(worldCameraTransform.getWorldPosition().distance(spawnPosition) < 60 && !global.isFrontCamera && !AreYouInsideMuseum)
    {
        AreYouInsideMuseum = true;
    }
    else if(worldCameraTransform.getWorldPosition().distance(spawnPosition) > 120 && !global.isFrontCamera)
    {
        //AreYouInsideMuseum = false;
    }
    
    openDoor()
})

function openDoor()
{
    var doorPos = script.doorParent.getTransform().getWorldPosition();
    var cameraPos = script.worldCam.getTransform().getWorldPosition();
    
    if(global.doorOpened) {return}
    if(doorPos.distance(cameraPos) < 70)
    {
        global.tweenManager.startTween(script.leftDoor, "rotate");
        global.tweenManager.startTween(script.rightDoor, "rotate", doorCompleted, doorStartOpening);
        global.doorOpened = true;
    }    
}

function doorStartOpening()
{
    script.cta.text = "Select a Frame";
    script.tapIconsParent.enabled = true;
}
function doorCompleted(){}


script.createEvent("OnStartEvent").bind(function()
{
    setPhotoBaseScale();  
})


script.createEvent("TapEvent").bind(function()
{
    if(global.currentState != global.states.World && global.isFrontCamera && canTakePhoto)
    {
        photoCounter = 4;
        counterDelay.reset(0);
    }
})

var counterDelay = script.createEvent("DelayedCallbackEvent")
counterDelay.bind(function()
{
    if(!global.isFrontCamera) 
    {
        script.cta.text = "";
        return;
    }
    
    photoCounter -= 1;
    script.cta.text = photoCounter.toString();
    global.playSound(script.countDownSFXs[photoCounter]);
    
    if(photoCounter == 0)
    {
        script.cta.text = "";
        
        canTakePhoto = false;
        global.tweenManager.startTween(script.flashEffect, "flash")
        script.cta.text = "Flip Camera"
        setWorldPhoto();
        
        return;
    }
    
    
    counterDelay.reset(1);
})


function setWorldPhoto()
{
    if(!global.isFrontCamera) {return;}
    
   
    if(global.currentState == global.states.Photo1)
    {
        global.filledFrames.push(0)
        adjustPhoto(0)
    }
    
    if(global.currentState == global.states.Photo2)
    {
        global.filledFrames.push(1)
        adjustPhoto(1)
    }
    
    if(global.currentState == global.states.Photo3)
    {
        global.filledFrames.push(2)
        adjustPhoto(2)
    }
    
    if(global.currentState == global.states.Photo4)
    {
        global.filledFrames.push(3)
        adjustPhoto(3)
    }
    
    if(global.currentState == global.states.Photo5)
    {
        global.filledFrames.push(4)
        adjustPhoto(4)
    }
    
    if(global.currentState == global.states.Photo6)
    {
        global.filledFrames.push(5)
        adjustPhoto(5)
    }
    
    if(global.currentState == global.states.Photo7)
    {
        global.filledFrames.push(6)
        adjustPhoto(6)
    }
    
    if(global.currentState == global.states.Photo8)
    {
        global.filledFrames.push(7)
        adjustPhoto(7)
    }
    print(global.filledFrames)
}


function adjustPhoto(photoIndex)
{
    var material = script.worldPhotoParent.getChild(photoIndex).getComponent("Component.RenderMeshVisual").mainMaterial;
    var copiedRender = script.defaultRender.copyFrame();        
    material.mainPass.baseTex = copiedRender;
    script.scenesParent.getChild(photoIndex).enabled = false
}

function setPhotoBaseScale()
{
    screenResolution = global.deviceInfoSystem.getTrackingCamera().resolution
  
    for(var i = 0; i < script.worldPhotoParent.getChildrenCount(); i++)
    {
        var photoBaseScale = script.photoBase.getTransform().getWorldScale()
        photoBaseScale.x = screenResolution.x / 450
        photoBaseScale.y = screenResolution.y / 450
        script.worldPhotoParent.getChild(i).getTransform().setWorldScale(photoBaseScale)
    }
}

function cancelPhotoShooting()
{
    
}


/*

function copyPhoto()
{
    var copiedObject = script.worldPhotoParent.copySceneObject(script.photoBase);
    
    var copiedMaterial = script.photoBaseMaterial.clone();
    var copiedObjectMeshVis = copiedObject.getComponent("Component.RenderMeshVisual");
    copiedObjectMeshVis.mainMaterial = copiedMaterial;
    var copiedRender = script.defaultRender.copyFrame();
    copiedObjectMeshVis.mainMaterial.mainPass.baseTex = copiedRender;
}

*/