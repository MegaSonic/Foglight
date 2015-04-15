#pragma strict

var updateCubemap : boolean = true;
var renderInStep : boolean = false;
var textureResolution : int = 1024;

var autoUpdate : float = 0.0;
var clipDistance : float = 10000.0;
var cameraHeight : float = 0.0;

private var cubemap : Cubemap;
private var cubemapFacemask : int = 63;
private var tempCam : GameObject;
private var updateTime : float = 0.0;
private var currentRes : int = 1024;
private var rendertex : RenderTexture;


function Start () {
	RenderUpdate();
	InvokeRepeating("RenderUpdate",1.0,0.5);
}





function Update () {
	if (updateCubemap) RenderUpdate();
	
	
	if (autoUpdate == 0.0){
		if (IsInvoking("RenderUpdate")){
			CancelInvoke("RenderUpdate");
		}
	} else {
		if (autoUpdate != updateTime){
			CancelInvoke("RenderUpdate");
			InvokeRepeating("RenderUpdate",0.0,autoUpdate);
		}
	}
	updateTime = autoUpdate;

}





function RenderUpdate () {
	
	if (this.enabled){

	// create temporary camera for rendering
	if (tempCam == null){
    	tempCam = new GameObject( "CubemapCamera", Camera );
    } else {
    }
    
    //create cubemap texture
    if (textureResolution < 16) textureResolution = 16;
    if (textureResolution > 2048) textureResolution = 2048;
    if (cubemap == null){
    	cubemap = new Cubemap (textureResolution, TextureFormat.RGB24, false);
    } else {
    	if (currentRes != textureResolution){
    		Destroy (cubemap);
    		cubemap = new Cubemap (textureResolution, TextureFormat.RGB24, false);
    		currentRes = textureResolution;
    	}
    }

  
    // place it on the object
    tempCam.transform.position = Camera.main.transform.position;
    tempCam.transform.position.y = this.transform.position.y+cameraHeight;
	
	//set additional camera properties
	tempCam.camera.farClipPlane = Camera.main.camera.farClipPlane;
	tempCam.camera.nearClipPlane = clipDistance;
	
	
    // render into cubemap
 	if (renderInStep){
 		var faceToRender = Time.frameCount % 6;
    	cubemapFacemask = 1 << faceToRender;
    } else {
    	cubemapFacemask = 63;
    }
    
    tempCam.camera.enabled = true;
    tempCam.camera.RenderToCubemap( cubemap,cubemapFacemask );
    tempCam.camera.enabled = false;
   
    
    //Assign Cubemap to shader
    renderer.material.SetTexture("_CubeTex2",cubemap);
    
    
    updateCubemap = false;

	}
    
}



