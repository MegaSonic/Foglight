#pragma strict
#pragma implicit
#pragma downcast

//PUBLIC VARIABLES
var ignoreTheseLayers : LayerMask = 0;
var causticTexture : Texture2D;
var causticTextureUnder : Texture2D;
var causticFPS : int = 32;
var animationSpeed : float = 1.0;
var baseSize : float = 1740;
var causticFrames : Texture2D[];




//PRIVATE VARIABLES
private var setTex : Texture2D;
private var isUnder : boolean = false;
private var frameIndex : int = 0;
private var currentSpeed : float = 1.0;
private var ScaleFactor : float = 1.0;




function Start () {
	//setProjector = this.gameObject.Find("caustics_projector");
	CausticEffectUpdate();
	InvokeRepeating("CausticEffectUpdate", (1.0 / causticFPS), (1.0 / causticFPS)); 
}



function Update () {



animationSpeed = 1.0;
//get underwater value and set falloff texture
	if (this.gameObject.GetComponent(waterModule_underwaterEffect) != null){
		isUnder = this.gameObject.GetComponent(waterModule_underwaterEffect).isUnderwater;
		
		var hit : RaycastHit;
		var layer : int = 4;
		var layermask : int = 1 << layer;
		var setCamera = Camera.main.gameObject;
		var testpos : Vector3 = Vector3(setCamera.transform.position.x,setCamera.transform.position.y+5000.0,setCamera.transform.position.z);
		if (Physics.Raycast (testpos, -Vector3.up, hit,10000,layermask)) {
		if (hit.transform.gameObject.layer==4){ //hits object on water layer
			animationSpeed = hit.transform.renderer.material.GetFloat("_AnimSpeed");
		}
		}
		

		//}
	}
	if (isUnder){
		setTex = causticTextureUnder;
	} else {
		setTex = causticTexture;
	}
	
	var causticproj : Component[];
	causticproj = GetComponentsInChildren (Projector);
	for (var proj : Projector in causticproj) {
		proj.material.SetTexture("_FalloffTex", setTex);
		proj.ignoreLayers = ignoreTheseLayers.value;
	}

//reset invoke
	if (currentSpeed != animationSpeed){
		CancelInvoke();
		InvokeRepeating("CausticEffectUpdate", 0.0, (1.0 / (causticFPS*animationSpeed)));
		currentSpeed=animationSpeed;
	}
	
		

}





function CausticEffectUpdate() {
	if (this.enabled){
	//if system is animating then assign to shader
	if (animationSpeed > 0.0){
		
		var causticproj : Component[];
		causticproj = GetComponentsInChildren (Projector);
		for (var proj : Projector in causticproj) {
  		  proj.material.SetTexture("_ShadowTex", causticFrames[frameIndex]);
  		  ScaleFactor = 1.0;
		  proj.material.SetTextureScale("_ShadowTex", Vector2(baseSize*ScaleFactor,baseSize*ScaleFactor));
		}


		frameIndex += 1;
    	if (frameIndex == causticFrames.length) frameIndex = 0;
    	
    	
    }
    }
}



