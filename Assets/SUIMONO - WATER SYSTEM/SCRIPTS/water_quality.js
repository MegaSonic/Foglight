#pragma strict

@script ExecuteInEditMode()

//PUBLIC VARIABLES
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


function Start () {

    shaderBasic = Shader.Find("Suimono/water_basic");
	shaderDepth = Shader.Find("Suimono/water_depth");
	shaderDepthRefr = Shader.Find("Suimono/water_depthRefractive");
	shaderDepthRefl = Shader.Find("Suimono/water_depthReflective");
	shaderRefr = Shader.Find("Suimono/water_refractive");
	shaderRefl = Shader.Find("Suimono/water_reflective");
	shaderReflRefr = Shader.Find("Suimono/water_reflectiveRefractive");
	shaderFull = Shader.Find("Suimono/water_full");
}



function Update () {


//set shader variables
var setShader : Shader = shaderBasic;
if (showRefraction) setShader = shaderRefr;
if (showReflection) setShader = shaderRefl;
if (showDepthVolume) setShader = shaderDepth;
if (showDepthVolume && showReflection) setShader = shaderDepthRefl;
if (showDepthVolume && showRefraction) setShader = shaderDepthRefr;
if (showReflection && showRefraction) setShader = shaderReflRefr;
if (showReflection && showRefraction && showDepthVolume) setShader = shaderFull;

if (this.transform.parent.gameObject.GetComponent(waterModule_quality).unityVersionState != UNITY_VERSION.Unity){
this.renderer.material.shader = setShader;
}




}