// -----JS CODE-----

//@input Component.AudioComponent effectsSource;
//@input Component.AudioComponent musicSource;


global.playSound = function(audioTrack)
{
    script.effectsSource.audioTrack = audioTrack
    script.effectsSource.play(1)
}

global.playMusic = function(audioTrack)
{
    script.musicSource.audioTrack = audioTrack
    script.musicSource.play(1)
}
