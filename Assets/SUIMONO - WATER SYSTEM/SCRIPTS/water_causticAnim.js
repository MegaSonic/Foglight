#pragma strict

//PUBLIC VARIABLES
var animFPS : int = 32;
var animFrames : Texture2D[];


//PRIVATE VARIABLES
private var isUnder : boolean = false;
private var animationSpeed : float = 1.0;
private var frameIndex : int = 0;
private var currentSpeed : float = 1.0;


function Start () {
	AnimCausticUpdate();
	InvokeRepeating("AnimCausticUpdate", (1.0 / animFPS), (1.0 / animFPS)); 
}




function Update () {

//get MASTER animation Speed
animationSpeed = this.transform.parent.GetComponent.<Renderer>().material.GetFloat("_AnimSpeed");
animationSpeed=Mathf.Clamp(animationSpeed,0.0,1.0);

//flip when underwater
if (this.transform.parent.parent.gameObject.GetComponent(waterModule_underwaterEffect) != null){
	isUnder = this.transform.parent.parent.gameObject.GetComponent(waterModule_underwaterEffect).isUnderwater;
}
if (isUnder){
	this.transform.eulerAngles = Vector3(180.0,0.0,0.0);
} else {
	this.transform.eulerAngles = Vector3(0.0,0.0,0.0);
}


//reset invoke
if (currentSpeed != animationSpeed){
	CancelInvoke();
	InvokeRepeating("AnimCausticUpdate", 0.0, (1.0 / (animFPS*animationSpeed)));
	currentSpeed=animationSpeed;
}

}




function AnimCausticUpdate() {
	//if system is animating then assign to shader
	if (this.enabled){
	if (animationSpeed > 0.0){
		
		var setTexture : String = "_MainTex";
		GetComponent.<Renderer>().material.SetTexture(setTexture, animFrames[frameIndex]);
   		frameIndex += 1;
    	if (frameIndex == animFrames.length) frameIndex = 0;
    }
    }
}