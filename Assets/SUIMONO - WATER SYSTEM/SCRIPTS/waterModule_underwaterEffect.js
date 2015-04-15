//Define variables
var enableRefraction : boolean = true;
var enableAutoColor : boolean = true;
var underwaterColor : Color = Color(0.58,0.61,0.61,0.0);
var underwaterRefraction : float = 20.0;
//var enableBlur : boolean = true;
//var underwaterBlur : float = 0.11; //0.0 - 1.0
var cameraPlane_offset : float = 5.0;

//Private Variables
private var setCamera : GameObject;
private var camBlur = 0.0;
private var camTrgt = 0.2;
private var underwaterLevel = 0.0;
private var underwaterRefractPlane : GameObject;
private var waterTransitionPlane : GameObject;
private var waterTransitionPlane2 : GameObject;
private var underwaterDebris : GameObject;
private var reflectColor : Color;
private var causticsColor : Color;
private var causticsSizing : float;
private var hitAmt : float = 1.0;
private var origDepthAmt : float = 1.0;
private var origReflColr : Color;

static var isUnderwater : boolean = false;
static var doWaterTransition : boolean = false;


function Start () {
    setCamera = Camera.main.gameObject;
    setCamera.GetComponent.<Camera>().depthTextureMode = DepthTextureMode.Depth;
    
    underwaterRefractPlane = GameObject.Find("effect_refract_plane");
    waterTransitionPlane = GameObject.Find("effect_dropletsParticle");
    waterTransitionPlane2 = GameObject.Find("effect_water_fade");
    underwaterRefractPlane.active = false;
    underwaterDebris = GameObject.Find("effect_underwater_debris");
    
    InvokeRepeating("checkWaterTransition", 2, 0.05);
}




function checkWaterTransition () {
	
	if (this.GetComponent(waterModule_underwaterEffect).enabled){
		

		//SET COLORS
		reflectColor = Color(0.827,0.941,1.0,1.0);

		//Check for underwater
		isUnderwater = false;
		var layer : int = 4;
		var layermask : int = 1 << layer;
		var hit : RaycastHit;
		var testpos : Vector3 = Vector3(setCamera.transform.position.x,setCamera.transform.position.y+5000.0,setCamera.transform.position.z);
		if (Physics.Raycast (testpos, -Vector3.up, hit,10000,layermask)) {
			if (hit.transform.gameObject.layer==4){ //hits object on water layer
				
				underwaterLevel = hit.transform.position.y;
				
				if (hit.transform.GetComponent.<Renderer>().material.GetFloat("_DepthAmt") != 0.0){
					hitAmt = hit.transform.GetComponent.<Renderer>().material.GetFloat("_DepthAmt");
					origDepthAmt = hit.transform.GetComponent.<Renderer>().material.GetFloat("_DepthAmt");
					origReflColr = hit.transform.GetComponent.<Renderer>().material.GetColor("_ReflColor2");
				}
					
				if (setCamera.transform.position.y < (underwaterLevel)) {
					isUnderwater = true;
					if (enableAutoColor){
						underwaterColor = hit.transform.GetComponent.<Renderer>().material.GetColor("_DepthColor");
					}
					hit.transform.GetComponent.<Renderer>().material.SetFloat("_DepthAmt",0.0);
					var setColr : Color = origReflColr;
					setColr.a = 1.0;
					hit.transform.GetComponent.<Renderer>().material.SetColor("_ReflColor2",setColr);
					
				} else {
					hit.transform.GetComponent.<Renderer>().material.SetFloat("_DepthAmt",origDepthAmt);
					hit.transform.GetComponent.<Renderer>().material.SetColor("_ReflColor2",origReflColr);
				}

			}
		}


		

		//IF UNDERWATER
		var blurmod = 0.0;
	    if (isUnderwater) {
			
			doWaterTransition = true;
			
			
			//set color correction
	       	//setCamera.GetComponent(ColorCorrectionCurves).enabled = true;
	       	
	       	
	       	//if you want to add underwater blur effect, simply uncomment the below block
	       	//and add a blur camera effect to your main camera.
	      	//if (enableBlur){
	      		//if (setCamera.GetComponent(BlurEffect) != null){
		      		//setCamera.GetComponent(BlurEffect).enabled = true;
			        //setCamera.GetComponent(BlurEffect).iterations = 4;
			        //camBlur = Mathf.Lerp(camBlur,camTrgt,Time.deltaTime);
			       	// setCamera.GetComponent(BlurEffect).blurSpread = underwaterBlur;
		        //}
	        //}
	        
	
	       	//set audio low pass filter (for underwater effect)
	      	//if (setCamera.GetComponent(AudioLowPassFilter) != null){
	       		//setCamera.GetComponent(AudioLowPassFilter).enabled = true;
	       		//setCamera.GetComponent(AudioLowPassFilter).cutoffFrequency = 270;
	       		//setCamera.GetComponent(AudioLowPassFilter).lowpassResonaceQ = 2.21;
	       	//}
	
	
	       	//set underwater debris
	       	underwaterDebris.transform.position = setCamera.transform.position;
	       	underwaterDebris.transform.rotation = setCamera.transform.rotation;
	       	underwaterDebris.transform.Translate(Vector3.forward * 40.0);
			underwaterDebris.GetComponent(ParticleSystem).GetComponent.<Renderer>().enabled=true;


		   
	       //turn on water refraction plane
	       if (enableRefraction){
	       	   underwaterRefractPlane.GetComponent.<Renderer>().material.SetColor("_DepthColor",underwaterColor);
		       underwaterRefractPlane.GetComponent.<Renderer>().material.SetFloat("_DepthAmt",0.001+(hitAmt*0.2));
		       underwaterRefractPlane.GetComponent.<Renderer>().material.SetFloat("_Strength",underwaterRefraction);
		       underwaterRefractPlane.transform.parent = setCamera.transform;
		       underwaterRefractPlane.transform.localPosition = Vector3(0.0,0.0,(setCamera.GetComponent.<Camera>().nearClipPlane+0.02));
		       underwaterRefractPlane.transform.localEulerAngles = Vector3(270.0,0.0,0.0);
		       underwaterRefractPlane.active = true;
		       
		       underwaterRefractPlane.GetComponent.<Renderer>().material.SetFloat("_Strength",underwaterRefraction);
		       
		       if (Camera.main.renderingPath == RenderingPath.DeferredLighting){
		       		underwaterRefractPlane.GetComponent.<Renderer>().material.SetFloat("_RPath",1.0);
		       } else {
		       		underwaterRefractPlane.GetComponent.<Renderer>().material.SetFloat("_RPath",0.0);
		       }
		       
	       }
	       
	       	//hide water transition
	     	waterTransitionPlane.GetComponent(ParticleSystem).GetComponent.<Renderer>().enabled = false;
			waterTransitionPlane2.GetComponent(ParticleSystem).GetComponent.<Renderer>().enabled = false;
	       
	       
	    }
	   
	    else {
	    
			//if you want to add underwater blur effect, simply uncomment the below block
	       	//and add a blur camera effect to your main camera.
			//if (setCamera.GetComponent(BlurEffect) != null){
	       	//	setCamera.GetComponent(BlurEffect).enabled = false;
	        //}

	
	        //reset audio low pass filter (for underwater effect)
	        //if (setCamera.GetComponent(AudioLowPassFilter) != null){
	       	//	setCamera.GetComponent(AudioLowPassFilter).enabled = false;
	       	//}
	       	
	       	
	        //reset underwater debris
	       	underwaterDebris.GetComponent(ParticleSystem).GetComponent.<Renderer>().enabled=false;
	       	

	       	//turn off water refraction plane
	       	underwaterRefractPlane.transform.parent = this.transform;
	     	underwaterRefractPlane.active = false;
	     	
	     	
	     	//show water transition
	     	if (doWaterTransition){
	     		waterTransitionPlane.GetComponent(ParticleSystem).GetComponent.<Renderer>().enabled = true;
	     		waterTransitionPlane.transform.parent = setCamera.transform;
	       		waterTransitionPlane.transform.localPosition = Vector3(0.0,0.0,cameraPlane_offset);
	       		waterTransitionPlane.transform.localEulerAngles = Vector3(270.0,262.9,0.0);
	      		waterTransitionPlane.GetComponent(ParticleSystem).Play();
	      		waterTransitionPlane.GetComponent(ParticleSystem).Emit(Random.Range(60,120));
	      		
	      		waterTransitionPlane2.GetComponent(ParticleSystem).GetComponent.<Renderer>().enabled = true;
	     		waterTransitionPlane2.transform.parent = setCamera.transform;
	       		waterTransitionPlane2.transform.localPosition = Vector3(0.0,0.0,cameraPlane_offset+0.5);
	       		waterTransitionPlane2.transform.localEulerAngles = Vector3(270.0,262.9,0.0);
	      		waterTransitionPlane2.GetComponent(ParticleSystem).Play();
	      		waterTransitionPlane2.GetComponent(ParticleSystem).Emit(1);
	      		
	       		doWaterTransition = false;
	     	} else {
	     		waterTransitionPlane.GetComponent(ParticleSystem).GetComponent.<Renderer>().enabled = true;
	     		waterTransitionPlane.GetComponent(ParticleSystem).Stop();
	     		
	     		waterTransitionPlane2.GetComponent(ParticleSystem).GetComponent.<Renderer>().enabled = true;
	     		waterTransitionPlane2.GetComponent(ParticleSystem).Stop();
	     	}
	       	
	       	
	    }
    }
}