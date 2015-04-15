#pragma strict
#pragma implicit
#pragma downcast


//PUBLIC VARIABLES
enum UNITY_VERSION {	UnityPro,
					Unity
			}
var unityVersionState : UNITY_VERSION;


var showReflection : boolean = true;
var showRefraction : boolean = true;
var showDepthVolume : boolean = true;


// PRIVATE VARIABLES

private var shaderBasic : Shader;
private var shaderDepth : Shader;
private var shaderDepthRefr : Shader;
private var shaderDepthRefl : Shader;
private var shaderRefr : Shader;
private var shaderRefl : Shader;
private var shaderReflRefr : Shader;
private var shaderFull : Shader;



private var effectShader1 : Shader;
private var effectShader2 : Shader;
private var effectShader3 : Shader;
private var effectShader1Ind : Shader;
private var effectShader2Ind : Shader;
private var effectShader2fwd : Shader;
private var effectShader3Ind : Shader;

private var effectBasic : Shader;
private var effectFull : Shader;
private var effectrefr : Shader;
private var effectdepth : Shader;


private var setShader : Shader;
private var setEffectShader : Shader;
private var setCamera : GameObject;

private var refPlaneObj : GameObject;
private var dropletsObj : GameObject;
private var transPlaneObj : GameObject;
private var particleRingsNormalObj : GameObject;

function Start () {

	setCamera = Camera.main.gameObject;

    effectShader1 = Shader.Find("Suimono/water_wave_overlay");
    effectShader1Ind = Shader.Find("Suimono/water_wave_overlay");
    effectShader2 = Shader.Find("Suimono/effect_refractionViewDepth");
    effectShader2fwd = Shader.Find("Suimono/effect_refractionViewDepthFwd");
    effectShader2Ind = Shader.Find("Suimono/effect_refractionViewDepthBasic");
    effectShader3 = Shader.Find("Suimono/effect_refractDroplets");
    effectShader3Ind = Shader.Find("Suimono/effect_refractDropletsBasic");
    
    shaderBasic = Shader.Find("Suimono/water_basic");
	shaderDepth = Shader.Find("Suimono/water_depth");
	shaderDepthRefr = Shader.Find("Suimono/water_depthRefractive");
	shaderDepthRefl = Shader.Find("Suimono/water_depthReflective");
	shaderRefr = Shader.Find("Suimono/water_refractive");
	shaderRefl = Shader.Find("Suimono/water_reflective");
	shaderReflRefr = Shader.Find("Suimono/water_reflectiveRefractive");
	shaderFull = Shader.Find("Suimono/water_full");

	effectBasic = Shader.Find("Suimono/effect_refractionViewDepthBasic");
	effectFull = Shader.Find("Suimono/effect_refractionViewDepth");
	effectrefr = Shader.Find("Suimono/effect_refractionViewDepthNoDepth");
	effectdepth = Shader.Find("Suimono/effect_refractionViewDepthNoRefract");

	
	InvokeRepeating("QualityUpdate", 0.1, 0.1); 
	
}



function Update () {

	refPlaneObj = GameObject.Find("effect_refract_plane");
	transPlaneObj = GameObject.Find("effect_water_fade");
	dropletsObj = GameObject.Find("effect_dropletsParticle");
	particleRingsNormalObj = GameObject.Find("splash_rings_normal_prefab");
	




setShader = shaderBasic;
if (showRefraction) setShader = shaderRefr;
if (showReflection) setShader = shaderRefl;
if (showDepthVolume) setShader = shaderDepth;
if (showDepthVolume && showReflection) setShader = shaderDepthRefl;
if (showDepthVolume && showRefraction) setShader = shaderDepthRefr;
if (showReflection && showRefraction) setShader = shaderReflRefr;
if (showReflection && showRefraction && showDepthVolume) setShader = shaderFull;



setEffectShader = effectBasic;
if (showRefraction) setEffectShader = effectrefr;
if (showReflection) setEffectShader = effectBasic;
if (showDepthVolume) setEffectShader = effectdepth;
if (showDepthVolume && showReflection) setEffectShader = effectdepth;
if (showDepthVolume && showRefraction) setEffectShader = effectFull;
if (showReflection && showRefraction) setEffectShader = effectrefr;
if (showReflection && showRefraction && showDepthVolume) setEffectShader = effectFull;



//this.renderer.material.shader = setShader;



//reset shader if using Unity (free version)
	if (unityVersionState == UNITY_VERSION.Unity){
		setShader = shaderBasic;
		setEffectShader = effectBasic;
	}
}







function QualityUpdate() {
	if (this.enabled){
		//set quality settings on all Water Planes (unless it has it's own water_quality override script)
		var rendercomponents : Component[];
		rendercomponents = GetComponentsInChildren(Renderer);
		for (var rndr : Renderer in rendercomponents) {
		//scroll through all child renderers
			if (rndr.gameObject.GetComponent(ParticleSystem) == null){ //continue if not particle system
			
			if (rndr.material.shader != effectShader3){ //exclude non-surface renderers
			if (rndr.material.shader != effectShader1){ //exclude non-surface renderers
			if (rndr.material.shader != effectShader2){ //exclude non-surface renderers
			
				if (rndr.gameObject.GetComponent(water_quality) == null){ //continue if doesn't have overriding script
					rndr.material.shader = setShader; // set surface shader
				} else {
				//if unity mode, override anyway
					if (unityVersionState == UNITY_VERSION.Unity){
						setShader = shaderBasic;
						rndr.material.shader = setShader;
					}
				}
			
			}
			}
			}
			
			
			} else { //set particles
		


			if (rndr.material.shader == effectShader1){
				//if WaterWaveOverlay then change shader if on free
				if (unityVersionState == UNITY_VERSION.Unity){
					rndr.material.shader = effectShader1Ind;
				} else {
					rndr.material.shader = effectShader1;
				}
			}

			}
    	}
    	
    	//check other objects
		if (unityVersionState == UNITY_VERSION.Unity){
			if (particleRingsNormalObj != null) particleRingsNormalObj.GetComponent.<Renderer>().material.shader = effectShader3Ind;
			if (refPlaneObj != null) refPlaneObj.GetComponent.<Renderer>().material.shader = effectShader2Ind;
			if (dropletsObj != null) dropletsObj.GetComponent.<Renderer>().material.shader = effectShader3Ind;
			if (transPlaneObj != null) transPlaneObj.GetComponent.<Renderer>().material.shader = effectShader3Ind;
		} else {
			if (setEffectShader != effectFull && setEffectShader != effectrefr){
				if (particleRingsNormalObj != null) particleRingsNormalObj.GetComponent.<Renderer>().material.shader = effectShader3Ind;
				if (refPlaneObj != null) refPlaneObj.GetComponent.<Renderer>().material.shader = setEffectShader;//effectShader2Ind;
				if (dropletsObj != null) dropletsObj.GetComponent.<Renderer>().material.shader = effectShader3Ind;
				if (transPlaneObj != null) transPlaneObj.GetComponent.<Renderer>().material.shader = effectShader3Ind;
			} else {
			if (setCamera.GetComponent.<Camera>().renderingPath == RenderingPath.Forward){
				if (refPlaneObj != null) refPlaneObj.GetComponent.<Renderer>().material.shader = effectShader2fwd;
			} else {
				if (particleRingsNormalObj != null) particleRingsNormalObj.GetComponent.<Renderer>().material.shader = effectShader3;
				if (refPlaneObj != null) refPlaneObj.GetComponent.<Renderer>().material.shader = setEffectShader;//effectShader2;
				if (dropletsObj != null) dropletsObj.GetComponent.<Renderer>().material.shader = effectShader3;
				if (transPlaneObj != null) transPlaneObj.GetComponent.<Renderer>().material.shader = effectShader3;
			}
			}
		}
    	
    	
    	
	}
}

