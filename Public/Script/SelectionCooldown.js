// -----JS CODE-----

//@input float cooldown = 0.25f;

var counter = 0;

script.createEvent("UpdateEvent").bind(function()
{
    if(counter > 0)
    {
        counter -= getDeltaTime();
    }
    else
    {
        global.canSelect = true;
    }
});


global.resetSelectionCooldown = function()
{
    counter = script.cooldown;
    
}