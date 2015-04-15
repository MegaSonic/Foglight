#pragma strict

//PUBLIC VARIABLES
enum animatedTexture {	heightMap1,
						heightMap2,
						foamMap
					 }
var animSlot : animatedTexture;

var animFPS : int = 32;
var animFrames : Texture2D[];


//PRIVATE VARIABLES
private var animationSpeed : float = 1.0;
private var frameIndex : int = 0;
private var currentSpeed : float = 1.0;

function Start () {
	AnimWaveUpdate();
	InvokeRepeating("AnimWaveUpdate", (1.0 / animFPS), (1.0 / animFPS)); 
}



function Update () {

//get MASTER animation Speed
animationSpeed = renderer.material.GetFloat("_AnimSpeed");
animationSpeed=Mathf.Clamp(animationSpeed,0.0,1.0);


//reset invoke
if (currentSpeed != animationSpeed){
	CancelInvoke();
	InvokeRepeating("AnimWaveUpdate", 0.0, (1.0 / (animFPS*animationSpeed)));
	currentSpeed=animationSpeed;
}

}



function AnimWaveUpdate() {
	//if system is animating then assign to shader
	if (this.enabled){
	if (animationSpeed > 0.0){
		
		var setTexture : String = "_HeightMap2";
		if (animSlot == animatedTexture.heightMap1) setTexture="_HeightMap";
		if (animSlot == animatedTexture.heightMap2) setTexture="_HeightMap2";
		if (animSlot == animatedTexture.foamMap) setTexture="_FoamTex";
	
		renderer.material.SetTexture(setTexture, animFrames[frameIndex]);
   		frameIndex += 1;
    	if (frameIndex == animFrames.length) frameIndex = 0;
    }
    }
}