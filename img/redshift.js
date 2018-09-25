

//---onload, continuous running---
function startCycle()
{
    var range=200 //---Start cycle: (positive) ---
    var duration=5000 //---ms, 1 second ---

     //--- Snap.animate(from, to, setter, duration, [easing], [callback]) ---
    var myAnim = Snap.animate(0.2, 0.1,
        function(freq) //---setter--
        {
            buildSineWave(freq)
            sineWave.attr({stroke:"#ff0000"})
        },
        duration,
        mina.linear,//---easing---

        function() //---callback (run next cycle)---
        {   sineWave.attr({stroke:"#0000ff"})
            startCycle()
        }
    );
    PauseAnim=myAnim
}


var PauseAnim //---animation in process...---
var ResumeAnim //---last animation after paused---
function pauseResumeButtonClicked()
{
   if(pauseResumeButton.innerHTML=="pause")
   {
        PauseAnim.pause()
        setTimeout(function(){ResumeAnim=PauseAnim},200)//---required to get the last animate---
        pauseResumeButton.innerHTML="resume"
   }
   else
   {
       ResumeAnim.resume()
       pauseResumeButton.innerHTML="pause"
   }
}

//---parametric equation of sine wave---
function buildSineWave(freq)
{
    var originX=0
    var originY=200*(.5) //---mid drawing---

    var width=200
    var pointSpacing=1
    var angularFrequency=freq
    var amplitude = 10
    var phaseAngle=90

    var origin = { //origin of axes
    x: originX,
    y: originY
    }

    var points=[]

    var x,y
    for (var i = 0; i < width/pointSpacing; i++)
    {
        x= i * pointSpacing + origin.x
        y= Math.sin(angularFrequency*(i + phaseAngle)) * amplitude + origin.y
        points.push([x,y])
    }

    sineWave.attr({points:points.join(" ")})
}
