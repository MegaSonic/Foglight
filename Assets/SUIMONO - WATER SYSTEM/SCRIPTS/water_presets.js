#pragma strict
#pragma implicit
#pragma downcast

@script ExecuteInEditMode()

//PUBLIC VARIABLES
enum PRESET {	clearBlue,
				clearDark,
				clearWarm,
				deepBlue,
				swimmingPool,
				ice,
				murkyBrown,
				murkyGreen,
				mudBrown,
				mudGrey,
				hotSpringMedicinal,
				hotSpringSulfuric,
				sacredPool,
				toxicSludge,
				deepDark,
				lavaSingle,
				lavaPlane1,
				lavaPlane2,
				lavaPlane3,
				custom
			}
var waterSystemState : PRESET;
var publishPreset : boolean = false;
var transitionPreset : boolean = false;
var transitionLength : float = 1.0;
var transitionTime : float = 0.0;
var waterTargetState : PRESET;


// PRIVATE VARIABLES
private var currentState : PRESET = PRESET.clearBlue;
private var waterStartState : PRESET;


function Start () {
	currentState = PRESET.custom;
}





function Update () {

//update shader with preset settings
if (currentState != waterSystemState){
	AssignPreset(waterSystemState);
	currentState = waterSystemState;
}








if (transitionPreset){
	
	waterStartState = currentState;
	transitionTime += (Time.deltaTime/transitionLength);
	
	renderer.material.SetTextureScale("_HeightMap",Vector2.Lerp(GetPreset(waterStartState,"_HeightMap"),GetPreset(waterTargetState,"_HeightMap"),transitionTime));
	renderer.material.SetTextureScale("_HeightMap2",Vector2.Lerp(GetPreset(waterStartState,"_HeightMap2"),GetPreset(waterTargetState,"_HeightMap2"),transitionTime));
	renderer.material.SetFloat("_IlluminColor",Mathf.Lerp(GetPreset(waterStartState,"_IlluminColor"),GetPreset(waterTargetState,"_IlluminColor"),transitionTime));
	
	renderer.material.SetColor("_SpecColor", Color.Lerp(GetPreset(waterStartState,"_SpecColor"),GetPreset(waterTargetState,"_SpecColor"),transitionTime));
	renderer.material.SetColor("_SurfaceColor",Color.Lerp(GetPreset(waterStartState,"_SurfaceColor"),GetPreset(waterTargetState,"_SurfaceColor"),transitionTime));
	renderer.material.SetColor("_DepthColor",Color.Lerp(GetPreset(waterStartState,"_DepthColor"),GetPreset(waterTargetState,"_DepthColor"),transitionTime));
	renderer.material.SetColor("_EdgeColor",Color.Lerp(GetPreset(waterStartState,"_EdgeColor"),GetPreset(waterTargetState,"_EdgeColor"),transitionTime));
	renderer.material.SetColor("_DistColor",Color.Lerp(GetPreset(waterStartState,"_DistColor"),GetPreset(waterTargetState,"_DistColor"),transitionTime));
	renderer.material.SetColor("_FoamColor",Color.Lerp(GetPreset(waterStartState,"_FoamColor"),GetPreset(waterTargetState,"_FoamColor"),transitionTime));
	renderer.material.SetColor("_FogColor",Color.Lerp(GetPreset(waterStartState,"_FogColor"),GetPreset(waterTargetState,"_FogColor"),transitionTime));
	renderer.material.SetColor("_ReflColor",Color.Lerp(GetPreset(waterStartState,"_ReflColor"),GetPreset(waterTargetState,"_ReflColor"),transitionTime));
	renderer.material.SetColor("_ReflColor2",Color.Lerp(GetPreset(waterStartState,"_ReflColor2"),GetPreset(waterTargetState,"_ReflColor2"),transitionTime));
	renderer.material.SetColor("_ReflColor3",Color.Lerp(GetPreset(waterStartState,"_ReflColor3"),GetPreset(waterTargetState,"_ReflColor3"),transitionTime));
		
	renderer.material.SetFloat("_ReflDist",Mathf.Lerp(GetPreset(waterStartState,"_ReflDist"),GetPreset(waterTargetState,"_ReflDist"),transitionTime));
	renderer.material.SetFloat("_ReflBlend",Mathf.Lerp(GetPreset(waterStartState,"_ReflBlend"),GetPreset(waterTargetState,"_ReflBlend"),transitionTime));
																	
	renderer.material.SetFloat("_FogFar",Mathf.Lerp(GetPreset(waterStartState,"_FogFar"),GetPreset(waterTargetState,"_FogFar"),transitionTime));
	renderer.material.SetFloat("_FogAlpha",Mathf.Lerp(GetPreset(waterStartState,"_FogAlpha"),GetPreset(waterTargetState,"_FogAlpha"),transitionTime));
	renderer.material.SetFloat("_DepthAmt",Mathf.Lerp(GetPreset(waterStartState,"_DepthAmt"),GetPreset(waterTargetState,"_DepthAmt"),transitionTime));
	renderer.material.SetFloat("_EdgeAmt",Mathf.Lerp(GetPreset(waterStartState,"_EdgeAmt"),GetPreset(waterTargetState,"_EdgeAmt"),transitionTime));
	renderer.material.SetFloat("_EdgeBlend",Mathf.Lerp(GetPreset(waterStartState,"_EdgeBlend"),GetPreset(waterTargetState,"_EdgeBlend"),transitionTime));
	renderer.material.SetFloat("_DistFar",Mathf.Lerp(GetPreset(waterStartState,"_DistFar"),GetPreset(waterTargetState,"_DistFar"),transitionTime));
	renderer.material.SetFloat("_DistBlend",Mathf.Lerp(GetPreset(waterStartState,"_DistBlend"),GetPreset(waterTargetState,"_DistBlend"),transitionTime));
	renderer.material.SetFloat("_FoamAmt",Mathf.Lerp(GetPreset(waterStartState,"_FoamAmt"),GetPreset(waterTargetState,"_FoamAmt"),transitionTime));
	renderer.material.SetFloat("_FoamBlend",Mathf.Lerp(GetPreset(waterStartState,"_FoamBlend"),GetPreset(waterTargetState,"_FoamBlend"),transitionTime));
	
	renderer.material.SetFloat("_Emissive",Mathf.Lerp(GetPreset(waterStartState,"_Emissive"),GetPreset(waterTargetState,"_Emissive"),transitionTime));
	renderer.material.SetFloat("_BumpStrength",Mathf.Lerp(GetPreset(waterStartState,"_BumpStrength"),GetPreset(waterTargetState,"_BumpStrength"),transitionTime));
	renderer.material.SetFloat("_SpecStrength",Mathf.Lerp(GetPreset(waterStartState,"_SpecStrength"),GetPreset(waterTargetState,"_SpecStrength"),transitionTime));
	renderer.material.SetFloat("_Wetness",Mathf.Lerp(GetPreset(waterStartState,"_Wetness"),GetPreset(waterTargetState,"_Wetness"),transitionTime));
	
	renderer.material.SetFloat("_RefrStrength",Mathf.Lerp(GetPreset(waterStartState,"_RefrStrength"),GetPreset(waterTargetState,"_RefrStrength"),transitionTime));
	//renderer.material.SetFloat("_RefrSpeed",Mathf.Lerp(GetPreset(waterStartState,"_RefrSpeed"),GetPreset(waterTargetState,"_RefrSpeed"),transitionTime));
	//renderer.material.SetFloat("_AnimSpeed",Mathf.Lerp(GetPreset(waterStartState,"_AnimSpeed"),GetPreset(waterTargetState,"_AnimSpeed"),transitionTime));
	
	
	if (transitionTime >= 1.0){
		//set collider at end
		collider.isTrigger = GetPreset(waterTargetState,"collider");
		renderer.material.SetFloat("_RefrSpeed",GetPreset(waterTargetState,"_RefrSpeed"));
		renderer.material.SetFloat("_AnimSpeed",GetPreset(waterTargetState,"_AnimSpeed"));
	
		//reset
		waterSystemState = waterTargetState;
		transitionPreset = false;
		transitionTime = 0.0;
	}	

}














if (publishPreset){
	publishPreset = false;
	var printPreset : String= "PRESET STRING - copy the below into 'water_presets.js'...\n\n";
	var collstate : String = "false";
	var setcol : Color = Color(0,0,0,0);

	printPreset += "if (pSet == PRESET.new_preset){\n";
	printPreset += "	//collider set\n";
	var collStr : String = "false";
	if (collider != null){
		if (collider.isTrigger) collStr = "true";
	}
	printPreset += "	if(pSetting == \"collider\") return "+collStr+";\n";
	printPreset += "	//set UVs\n";
	printPreset += "	if(pSetting == \"_HeightMap\") return Vector2("+renderer.material.GetTextureScale("_HeightMap").x+","+renderer.material.GetTextureScale("_HeightMap").y+");\n";
	printPreset += "	if(pSetting == \"_HeightMap2\") return Vector2("+renderer.material.GetTextureScale("_HeightMap2").x+","+renderer.material.GetTextureScale("_HeightMap2").x+");\n";
	printPreset += "	if(pSetting == \"_FoamTex\") return Vector2("+renderer.material.GetTextureScale("_FoamTex").x+","+renderer.material.GetTextureScale("_FoamTex").x+");\n";
	printPreset += "	//set Illumination Value\n";
	printPreset += "	if(pSetting == \"_IlluminColor\") return "+renderer.material.GetFloat("_IlluminColor")+";\n";
	printPreset += "	//set colors\n";
	setcol = renderer.material.GetColor("_SpecColor");
	printPreset += "	if(pSetting == \"_SpecColor\") return Color("+setcol.r+","+setcol.g+","+setcol.b+","+setcol.a+");\n";
	setcol = renderer.material.GetColor("_SurfaceColor");
	printPreset += "	if(pSetting == \"_SurfaceColor\") return Color("+setcol.r+","+setcol.g+","+setcol.b+","+setcol.a+");\n";
	setcol = renderer.material.GetColor("_DepthColor");
	printPreset += "	if(pSetting == \"_DepthColor\") return Color("+setcol.r+","+setcol.g+","+setcol.b+","+setcol.a+");\n";
	setcol = renderer.material.GetColor("_EdgeColor");
	printPreset += "	if(pSetting == \"_EdgeColor\") return Color("+setcol.r+","+setcol.g+","+setcol.b+","+setcol.a+");\n";
	setcol = renderer.material.GetColor("_DistColor");
	printPreset += "	if(pSetting == \"_DistColor\") return Color("+setcol.r+","+setcol.g+","+setcol.b+","+setcol.a+");\n";
	setcol = renderer.material.GetColor("_FoamColor");
	printPreset += "	if(pSetting == \"_FoamColor\") return Color("+setcol.r+","+setcol.g+","+setcol.b+","+setcol.a+");\n";
	setcol = renderer.material.GetColor("_FogColor");
	printPreset += "	if(pSetting == \"_FogColor\") return Color("+setcol.r+","+setcol.g+","+setcol.b+","+setcol.a+");\n";
	setcol = renderer.material.GetColor("_ReflColor");
	printPreset += "	if(pSetting == \"_ReflColor\") return Color("+setcol.r+","+setcol.g+","+setcol.b+","+setcol.a+");\n";
	setcol = renderer.material.GetColor("_ReflColor2");
	printPreset += "	if(pSetting == \"_ReflColor2\") return Color("+setcol.r+","+setcol.g+","+setcol.b+","+setcol.a+");\n";
	setcol = renderer.material.GetColor("_ReflColor3");
	printPreset += "	if(pSetting == \"_ReflColor3\") return Color("+setcol.r+","+setcol.g+","+setcol.b+","+setcol.a+");\n";
	printPreset += "	//set fog and Depth parameters\n";
	printPreset += "	if(pSetting == \"_ReflDist\") return "+renderer.material.GetFloat("_ReflDist")+";\n";
	printPreset += "	if(pSetting == \"_ReflBlend\") return "+renderer.material.GetFloat("_ReflBlend")+";\n";
	printPreset += "	if(pSetting == \"_FogFar\") return "+renderer.material.GetFloat("_FogFar")+";\n";
	printPreset += "	if(pSetting == \"_FogAlpha\") return "+renderer.material.GetFloat("_FogAlpha")+";\n";
	printPreset += "	if(pSetting == \"_DepthAmt\") return "+renderer.material.GetFloat("_DepthAmt")+";\n";
	printPreset += "	if(pSetting == \"_EdgeAmt\") return "+renderer.material.GetFloat("_EdgeAmt")+";\n";
	printPreset += "	if(pSetting == \"_EdgeBlend\") return "+renderer.material.GetFloat("_EdgeBlend")+";\n";
	printPreset += "	if(pSetting == \"_DistFar\") return "+renderer.material.GetFloat("_DistFar")+";\n";
	printPreset += "	if(pSetting == \"_DistBlend\") return "+renderer.material.GetFloat("_DistBlend")+";\n";
	printPreset += "	if(pSetting == \"_FoamAmt\") return "+renderer.material.GetFloat("_FoamAmt")+";\n";
	printPreset += "	if(pSetting == \"_FoamBlend\") return "+renderer.material.GetFloat("_FoamBlend")+";\n";
	printPreset += "	//set norm and spec parameters\n";
	printPreset += "	if(pSetting == \"_Emissive\") return "+renderer.material.GetFloat("_Emissive")+";\n";
	printPreset += "	if(pSetting == \"_BumpStrength\") return "+renderer.material.GetFloat("_BumpStrength")+";\n";
	printPreset += "	if(pSetting == \"_SpecStrength\") return "+renderer.material.GetFloat("_SpecStrength")+";\n";
	printPreset += "	if(pSetting == \"_Wetness\") return "+renderer.material.GetFloat("_Wetness")+";\n";
	printPreset += "	//set refraction parameters\n";
	printPreset += "	if(pSetting == \"_RefrStrength\") return "+renderer.material.GetFloat("_RefrStrength")+";\n";
	printPreset += "	if(pSetting == \"_RefrSpeed\") return "+renderer.material.GetFloat("_RefrSpeed")+";\n";
	printPreset += "	//set animation speed parameter\n";
	printPreset += "	if(pSetting == \"_AnimSpeed\") return "+renderer.material.GetFloat("_AnimSpeed")+";\n";
	printPreset += "}\n\n";

	Debug.Log(printPreset);
}



}






function AssignPreset( aspSet : PRESET ){

if (collider != null){
	collider.isTrigger = GetPreset(aspSet,"collider");
}
renderer.material.SetTextureScale("_HeightMap",GetPreset(aspSet,"_HeightMap"));
renderer.material.SetTextureScale("_HeightMap2",GetPreset(aspSet,"_HeightMap2"));
renderer.material.SetTextureScale("_FoamTex",GetPreset(aspSet,"_FoamTex"));
renderer.material.SetFloat("_IlluminColor",GetPreset(aspSet,"_IlluminColor"));

renderer.material.SetColor("_SpecColor",GetPreset(aspSet,"_SpecColor"));
renderer.material.SetColor("_SurfaceColor",GetPreset(aspSet,"_SurfaceColor"));
renderer.material.SetColor("_DepthColor",GetPreset(aspSet,"_DepthColor"));
renderer.material.SetColor("_EdgeColor",GetPreset(aspSet,"_EdgeColor"));
renderer.material.SetColor("_DistColor",GetPreset(aspSet,"_DistColor"));
renderer.material.SetColor("_FoamColor",GetPreset(aspSet,"_FoamColor"));
renderer.material.SetColor("_FogColor",GetPreset(aspSet,"_FogColor"));
renderer.material.SetColor("_ReflColor",GetPreset(aspSet,"_ReflColor"));
renderer.material.SetColor("_ReflColor2",GetPreset(aspSet,"_ReflColor2"));
renderer.material.SetColor("_ReflColor3",GetPreset(aspSet,"_ReflColor3"));

renderer.material.SetFloat("_ReflDist",GetPreset(aspSet,"_ReflDist"));
renderer.material.SetFloat("_ReflBlend",GetPreset(aspSet,"_ReflBlend"));

renderer.material.SetFloat("_FogFar",GetPreset(aspSet,"_FogFar"));
renderer.material.SetFloat("_FogAlpha",GetPreset(aspSet,"_FogAlpha"));
renderer.material.SetFloat("_DepthAmt",GetPreset(aspSet,"_DepthAmt"));
renderer.material.SetFloat("_EdgeAmt",GetPreset(aspSet,"_EdgeAmt"));
renderer.material.SetFloat("_EdgeBlend",GetPreset(aspSet,"_EdgeBlend"));
renderer.material.SetFloat("_DistFar",GetPreset(aspSet,"_DistFar"));
renderer.material.SetFloat("_DistBlend",GetPreset(aspSet,"_DistBlend"));
renderer.material.SetFloat("_FoamAmt",GetPreset(aspSet,"_FoamAmt"));
renderer.material.SetFloat("_FoamBlend",GetPreset(aspSet,"_FoamBlend"));

renderer.material.SetFloat("_Emissive",GetPreset(aspSet,"_Emissive"));
renderer.material.SetFloat("_BumpStrength",GetPreset(aspSet,"_BumpStrength"));
renderer.material.SetFloat("_SpecStrength",GetPreset(aspSet,"_SpecStrength"));
renderer.material.SetFloat("_Wetness",GetPreset(aspSet,"_Wetness"));

renderer.material.SetFloat("_RefrStrength",GetPreset(aspSet,"_RefrStrength"));
renderer.material.SetFloat("_RefrSpeed",GetPreset(aspSet,"_RefrSpeed"));

renderer.material.SetFloat("_AnimSpeed",GetPreset(aspSet,"_AnimSpeed"));
	
}







function GetPreset( pSet : PRESET, pSetting : String){


if (pSet == PRESET.clearBlue){
	//collider set
	if(pSetting == "collider") return true;
	//set UVs
	if(pSetting == "_HeightMap") return Vector2(10,8);
	if(pSetting == "_HeightMap2") return Vector2(30,30);
	if(pSetting == "_FoamTex") return Vector2(10,10);
	//set Illumination Value
	if(pSetting == "_IlluminColor") return 0;
	//set colors
	if(pSetting == "_SpecColor") return Color(0.5019608,0.5019608,0.5019608,0.04313726);
	if(pSetting == "_SurfaceColor") return Color(0.2506126,0.3815854,0.4477612,0);
	if(pSetting == "_DepthColor") return Color(0.1344398,0.2199293,0.2537314,0.5607843);
	if(pSetting == "_EdgeColor") return Color(0.5458343,0.7381463,0.9029851,0.3686275);
	if(pSetting == "_DistColor") return Color(0.3835486,0.4653959,0.5298507,0.6313726);
	if(pSetting == "_FoamColor") return Color(0.633787,0.6716418,0.536311,0.6901961);
	if(pSetting == "_FogColor") return Color(0.5615616,0.6760732,0.7489667,0.05);
	if(pSetting == "_ReflColor") return Color(0.358209,0.358209,0.358209,1);
	if(pSetting == "_ReflColor2") return Color(0.7164179,0.7164179,0.7164179,0.2862745);
	if(pSetting == "_ReflColor3") return Color(0.56,0.674,0.749,0.52);
	//set fog and Depth parameters
	if(pSetting == "_ReflDist") return 50;
	if(pSetting == "_ReflBlend") return 0.005;
	if(pSetting == "_FogFar") return 1200;
	if(pSetting == "_FogAlpha") return 0.1;
	if(pSetting == "_DepthAmt") return 0.025;
	if(pSetting == "_EdgeAmt") return 0.39;
	if(pSetting == "_EdgeBlend") return 1;
	if(pSetting == "_DistFar") return 18.45;
	if(pSetting == "_DistBlend") return 0.006;
	if(pSetting == "_FoamAmt") return 0.08;
	if(pSetting == "_FoamBlend") return 1.53;
	//set norm and spec parameters
	if(pSetting == "_Emissive") return 2.5;
	if(pSetting == "_BumpStrength") return 1.07;
	if(pSetting == "_SpecStrength") return 1.5;
	if(pSetting == "_Wetness") return 0.5;
	//set refraction parameters
	if(pSetting == "_RefrStrength") return 4.0;
	if(pSetting == "_RefrSpeed") return 0.18;
	//set animation speed parameter
	if(pSetting == "_AnimSpeed") return 1.0;
}



if (pSet == PRESET.clearDark){
	//collider set
	if(pSetting == "collider") return true;
	//set UVs
	if(pSetting == "_HeightMap") return Vector2(10,8);
	if(pSetting == "_HeightMap2") return Vector2(30,30);
	if(pSetting == "_FoamTex") return Vector2(20,20);
	//set Illumination Value
	if(pSetting == "_IlluminColor") return 0;
	//set colors
	if(pSetting == "_SpecColor") return Color(0.5019608,0.5019608,0.5019608,0.1098039);
	if(pSetting == "_SurfaceColor") return Color(0.2506126,0.3815854,0.4477612,0);
	if(pSetting == "_DepthColor") return Color(0.08627451,0.08235294,0.09803922,0.5490196);
	if(pSetting == "_EdgeColor") return Color(0.4699822,0.5853906,0.7238806,0.4705882);
	if(pSetting == "_DistColor") return Color(0.1803922,0.2745098,0.4313726,0.1960784);
	if(pSetting == "_FoamColor") return Color(0.7037202,0.7863631,0.8059701,0.4078431);
	if(pSetting == "_FogColor") return Color(0.5615616,0.6760732,0.7489667,0.05);
	if(pSetting == "_ReflColor") return Color(0.5019608,0.5019608,0.5019608,0.5411765);
	if(pSetting == "_ReflColor2") return Color(0.6313726,0.7019608,0.7686275,0.3411765);
	if(pSetting == "_ReflColor3") return Color(0.56,0.674,0.749,0.52);
	//set fog and Depth parameters
	if(pSetting == "_ReflDist") return 50;
	if(pSetting == "_ReflBlend") return 0.005;
	if(pSetting == "_FogFar") return 1200;
	if(pSetting == "_FogAlpha") return 0.1;
	if(pSetting == "_DepthAmt") return 0.05;
	if(pSetting == "_EdgeAmt") return 0.39;
	if(pSetting == "_EdgeBlend") return 1;
	if(pSetting == "_DistFar") return 43.8;
	if(pSetting == "_DistBlend") return 0.01;
	if(pSetting == "_FoamAmt") return 0.08;
	if(pSetting == "_FoamBlend") return 1.53;
	//set norm and spec parameters
	if(pSetting == "_Emissive") return 2.7;
	if(pSetting == "_BumpStrength") return 1;
	if(pSetting == "_SpecStrength") return 1.35;
	if(pSetting == "_Wetness") return 1;
	//set refraction parameters
	if(pSetting == "_RefrStrength") return 8;
	if(pSetting == "_RefrSpeed") return 0.18;
	//set animation speed parameter
	if(pSetting == "_AnimSpeed") return 1;
}

if (pSet == PRESET.clearWarm){
	//collider set
	if(pSetting == "collider") return true;
	//set UVs
	if(pSetting == "_HeightMap") return Vector2(10,8);
	if(pSetting == "_HeightMap2") return Vector2(30,30);
	if(pSetting == "_FoamTex") return Vector2(20,20);
	//set Illumination Value
	if(pSetting == "_IlluminColor") return 0;
	//set colors
	if(pSetting == "_SpecColor") return Color(0.5215687,0.5215687,0.5215687,0.5254902);
	if(pSetting == "_SurfaceColor") return Color(0.2506126,0.3815854,0.4477612,0);
	if(pSetting == "_DepthColor") return Color(0.6716418,0.4839378,0,0.2509804);
	if(pSetting == "_EdgeColor") return Color(0.7014925,0.6973191,0.4030965,0.5450981);
	if(pSetting == "_DistColor") return Color(0.08235294,0.145098,0.172549,0.1647059);
	if(pSetting == "_FoamColor") return Color(0.6119403,0.5842206,0.3288037,0.772549);
	if(pSetting == "_FogColor") return Color(0.5615616,0.6760732,0.7489667,0.05);
	if(pSetting == "_ReflColor") return Color(1,0.358209,0.358209,0.372549);
	if(pSetting == "_ReflColor2") return Color(0.9402985,0.9346063,0.5333036,0.3019608);
	if(pSetting == "_ReflColor3") return Color(0.56,0.674,0.749,0.52);
	//set fog and Depth parameters
	if(pSetting == "_ReflDist") return 50;
	if(pSetting == "_ReflBlend") return 0.005;
	if(pSetting == "_FogFar") return 1200;
	if(pSetting == "_FogAlpha") return 0.1;
	if(pSetting == "_DepthAmt") return 0.05;
	if(pSetting == "_EdgeAmt") return 0.39;
	if(pSetting == "_EdgeBlend") return 1;
	if(pSetting == "_DistFar") return 76.86;
	if(pSetting == "_DistBlend") return 0.01;
	if(pSetting == "_FoamAmt") return 0.08;
	if(pSetting == "_FoamBlend") return 1.53;
	//set norm and spec parameters
	if(pSetting == "_Emissive") return 2.4;
	if(pSetting == "_BumpStrength") return 1;
	if(pSetting == "_SpecStrength") return 1.24;
	if(pSetting == "_Wetness") return 1;
	//set refraction parameters
	if(pSetting == "_RefrStrength") return 8;
	if(pSetting == "_RefrSpeed") return 0;
	//set animation speed parameter
	if(pSetting == "_AnimSpeed") return 1;
}

if (pSet == PRESET.deepBlue){
	//collider set
	if(pSetting == "collider") return true;
	//set UVs
	if(pSetting == "_HeightMap") return Vector2(10,8);
	if(pSetting == "_HeightMap2") return Vector2(40,40);
	if(pSetting == "_FoamTex") return Vector2(10,10);
	//set Illumination Value
	if(pSetting == "_IlluminColor") return 0;
	//set colors
	if(pSetting == "_SpecColor") return Color(0,0.2155306,0.5223881,0.03921569);
	if(pSetting == "_SurfaceColor") return Color(0.1483627,0.4393958,0.5373135,0.145098);
	if(pSetting == "_DepthColor") return Color(0.07919359,0.1025121,0.1343284,1);
	if(pSetting == "_EdgeColor") return Color(0.6567164,0.8415616,1,1);
	if(pSetting == "_DistColor") return Color(0.3159389,0.4560707,0.6940298,0.01568628);
	if(pSetting == "_FoamColor") return Color(0.6871062,0.7164179,0.6308755,0.5254902);
	if(pSetting == "_FogColor") return Color(0.5615616,0.6760732,0.7489667,0.05);
	if(pSetting == "_ReflColor") return Color(1,1,1,0.2862745);
	if(pSetting == "_ReflColor2") return Color(0.2352417,0.399952,0.4925373,0.5137255);
	if(pSetting == "_ReflColor3") return Color(0.56,0.674,0.749,0.52);
	//set fog and Depth parameters
	if(pSetting == "_ReflDist") return 50;
	if(pSetting == "_ReflBlend") return 0.005;
	if(pSetting == "_FogFar") return 1200;
	if(pSetting == "_FogAlpha") return 0.1;
	if(pSetting == "_DepthAmt") return 0.1;
	if(pSetting == "_EdgeAmt") return 2.06;
	if(pSetting == "_EdgeBlend") return 0.76;
	if(pSetting == "_DistFar") return 60.1;
	if(pSetting == "_DistBlend") return 0.1;
	if(pSetting == "_FoamAmt") return 0.15;
	if(pSetting == "_FoamBlend") return 3.09;
	//set norm and spec parameters
	if(pSetting == "_Emissive") return 2.5;
	if(pSetting == "_BumpStrength") return 1.07;
	if(pSetting == "_SpecStrength") return 1.5;
	if(pSetting == "_Wetness") return 0.1;
	//set refraction parameters
	if(pSetting == "_RefrStrength") return 4;
	if(pSetting == "_RefrSpeed") return 0.18;
	//set animation speed parameter
	if(pSetting == "_AnimSpeed") return 1;
}

if (pSet == PRESET.swimmingPool){
	//collider set
	if(pSetting == "collider") return true;
	//set UVs
	if(pSetting == "_HeightMap") return Vector2(10,8);
	if(pSetting == "_HeightMap2") return Vector2(30,30);
	if(pSetting == "_FoamTex") return Vector2(10,10);
	//set Illumination Value
	if(pSetting == "_IlluminColor") return 0.1;
	//set colors
	if(pSetting == "_SpecColor") return Color(0.3734913,0.4650837,0.5253665,0.5977209);
	if(pSetting == "_SurfaceColor") return Color(0,1,0.4965036,0.2078431);
	if(pSetting == "_DepthColor") return Color(0.009022047,0.3546358,0.6044776,0.5568628);
	if(pSetting == "_EdgeColor") return Color(0.5522388,1,0.9436384,0.4117647);
	if(pSetting == "_DistColor") return Color(0.08543106,0.3758709,0.4402985,0.2235294);
	if(pSetting == "_FoamColor") return Color(0.6313726,0.7019608,0.7686275,0);
	if(pSetting == "_FogColor") return Color(0.5615616,0.6760732,0.7489667,0.05);
	if(pSetting == "_ReflColor") return Color(0.3998538,1,0.141791,0.4313726);
	if(pSetting == "_ReflColor2") return Color(0.6313726,0.7019608,0.7686275,0);
	if(pSetting == "_ReflColor3") return Color(0.56,0.674,0.749,0.52);
	//set fog and Depth parameters
	if(pSetting == "_ReflDist") return 50;
	if(pSetting == "_ReflBlend") return 0.005;
	if(pSetting == "_FogFar") return 1200;
	if(pSetting == "_FogAlpha") return 0.1;
	if(pSetting == "_DepthAmt") return 0.05;
	if(pSetting == "_EdgeAmt") return 0.39;
	if(pSetting == "_EdgeBlend") return 1;
	if(pSetting == "_DistFar") return 0.2;
	if(pSetting == "_DistBlend") return 0.005;
	if(pSetting == "_FoamAmt") return 0.08;
	if(pSetting == "_FoamBlend") return 1.53;
	//set norm and spec parameters
	if(pSetting == "_Emissive") return 2.8;
	if(pSetting == "_BumpStrength") return 1.52;
	if(pSetting == "_SpecStrength") return 0;
	if(pSetting == "_Wetness") return 0.1;
	//set refraction parameters
	if(pSetting == "_RefrStrength") return 2;
	if(pSetting == "_RefrSpeed") return 0.18;
	//set animation speed parameter
	if(pSetting == "_AnimSpeed") return 1;
}


if (pSet == PRESET.ice){
	//collider set
	if(pSetting == "collider") return false;
	//set UVs
	if(pSetting == "_HeightMap") return Vector2(10,8);
	if(pSetting == "_HeightMap2") return Vector2(30,30);
	if(pSetting == "_FoamTex") return Vector2(12,12);
	//set Illumination Value
	if(pSetting == "_IlluminColor") return 0;
	//set colors
	if(pSetting == "_SpecColor") return Color(0.415506,0.5215935,0.5903718,1);
	if(pSetting == "_SurfaceColor") return Color(0.6549342,0.7945763,0.8955224,0.3607843);
	if(pSetting == "_DepthColor") return Color(0.07991758,0.1956377,0.2611941,1);
	if(pSetting == "_EdgeColor") return Color(1,1,1,1);
	if(pSetting == "_DistColor") return Color(0.6791044,0.6791044,0.6791044,0.1764706);
	if(pSetting == "_FoamColor") return Color(0.8358209,0.9380023,1,0.7215686);
	if(pSetting == "_FogColor") return Color(0.5615616,0.6760732,0.7489667,0.05);
	if(pSetting == "_ReflColor") return Color(0,1,0.9160838,0.6431373);
	if(pSetting == "_ReflColor2") return Color(0.2958343,0.462241,0.619403,0.3098039);
	if(pSetting == "_ReflColor3") return Color(0.56,0.674,0.749,0.52);
	//set fog and Depth parameters
	if(pSetting == "_ReflDist") return 50;
	if(pSetting == "_ReflBlend") return 0.005;
	if(pSetting == "_FogFar") return 1200;
	if(pSetting == "_FogAlpha") return 0.1;
	if(pSetting == "_DepthAmt") return 0.1;
	if(pSetting == "_EdgeAmt") return 0.4;
	if(pSetting == "_EdgeBlend") return 0.97;
	if(pSetting == "_DistFar") return -6.9;
	if(pSetting == "_DistBlend") return 0.02;
	if(pSetting == "_FoamAmt") return 0;
	if(pSetting == "_FoamBlend") return 1;
	//set norm and spec parameters
	if(pSetting == "_Emissive") return 2.4;
	if(pSetting == "_BumpStrength") return 1;
	if(pSetting == "_SpecStrength") return 1.24;
	if(pSetting == "_Wetness") return 0.2;
	//set refraction parameters
	if(pSetting == "_RefrStrength") return 12.1;
	if(pSetting == "_RefrSpeed") return 0.18;
	//set animation speed parameter
	if(pSetting == "_AnimSpeed") return 0;
}

if (pSet == PRESET.murkyBrown){
	//collider set
	if(pSetting == "collider") return true;
	//set UVs
	if(pSetting == "_HeightMap") return Vector2(10,8);
	if(pSetting == "_HeightMap2") return Vector2(50,50);
	if(pSetting == "_FoamTex") return Vector2(20,20);
	//set Illumination Value
	if(pSetting == "_IlluminColor") return 0;
	//set colors
	if(pSetting == "_SpecColor") return Color(0.5019608,0.5019608,0.5019608,0.02745098);
	if(pSetting == "_SurfaceColor") return Color(1,1,1,0);
	if(pSetting == "_DepthColor") return Color(0.2910448,0.2520403,0.05864335,1);
	if(pSetting == "_EdgeColor") return Color(0.1492537,0.1283791,0,0.2980392);
	if(pSetting == "_DistColor") return Color(0.2944813,0.3134328,0.138004,0.2941177);
	if(pSetting == "_FoamColor") return Color(0.5024208,0.5298507,0.2846959,0.3686275);
	if(pSetting == "_FogColor") return Color(0.5615616,0.6760732,0.7489667,0.05);
	if(pSetting == "_ReflColor") return Color(0.3059701,0.6214381,1,0.4745098);
	if(pSetting == "_ReflColor2") return Color(0.5597015,0.5120326,0.3466808,0.1686275);
	if(pSetting == "_ReflColor3") return Color(0.56,0.674,0.749,0.52);
	//set fog and Depth parameters
	if(pSetting == "_ReflDist") return 50;
	if(pSetting == "_ReflBlend") return 0.005;
	if(pSetting == "_FogFar") return 1200;
	if(pSetting == "_FogAlpha") return 0.1;
	if(pSetting == "_DepthAmt") return 0.07;
	if(pSetting == "_EdgeAmt") return 0.19;
	if(pSetting == "_EdgeBlend") return 1;
	if(pSetting == "_DistFar") return 43.8;
	if(pSetting == "_DistBlend") return 0.01;
	if(pSetting == "_FoamAmt") return 0.05;
	if(pSetting == "_FoamBlend") return 1.53;
	//set norm and spec parameters
	if(pSetting == "_Emissive") return 2.7;
	if(pSetting == "_BumpStrength") return 1;
	if(pSetting == "_SpecStrength") return 1.35;
	if(pSetting == "_Wetness") return 0.1;
	//set refraction parameters
	if(pSetting == "_RefrStrength") return 2;
	if(pSetting == "_RefrSpeed") return 0.18;
	//set animation speed parameter
	if(pSetting == "_AnimSpeed") return 0.7;
}

if (pSet == PRESET.mudBrown){
	//collider set
	if(pSetting == "collider") return true;
	//set UVs
	if(pSetting == "_HeightMap") return Vector2(10,8);
	if(pSetting == "_HeightMap2") return Vector2(30,30);
	if(pSetting == "_FoamTex") return Vector2(20,20);
	//set Illumination Value
	if(pSetting == "_IlluminColor") return 0;
	//set colors
	if(pSetting == "_SpecColor") return Color(0.3058824,0.3372549,0.07843138,0.8941177);
	if(pSetting == "_SurfaceColor") return Color(0.7014925,0.5428312,0.1832257,1);
	if(pSetting == "_DepthColor") return Color(0.5149254,0.4427897,0.195979,1);
	if(pSetting == "_EdgeColor") return Color(0.1492537,0.1283791,0,0.3372549);
	if(pSetting == "_DistColor") return Color(0.6156863,0.7294118,0.9882353,0.03921569);
	if(pSetting == "_FoamColor") return Color(0.6940298,0.6211022,0.4350635,0.454902);
	if(pSetting == "_FogColor") return Color(0.5615616,0.6760732,0.7489667,0.05);
	if(pSetting == "_ReflColor") return Color(0.3214524,0.4242516,0.8283582,1);
	if(pSetting == "_ReflColor2") return Color(0.6313726,0.7019608,0.7686275,0);
	if(pSetting == "_ReflColor3") return Color(0.56,0.674,0.749,0.52);
	//set fog and Depth parameters
	if(pSetting == "_ReflDist") return 50;
	if(pSetting == "_ReflBlend") return 0.005;
	if(pSetting == "_FogFar") return 1200;
	if(pSetting == "_FogAlpha") return 0.1;
	if(pSetting == "_DepthAmt") return 16.98;
	if(pSetting == "_EdgeAmt") return 0.14;
	if(pSetting == "_EdgeBlend") return 1;
	if(pSetting == "_DistFar") return 70.48;
	if(pSetting == "_DistBlend") return 0.01;
	if(pSetting == "_FoamAmt") return -0.1;
	if(pSetting == "_FoamBlend") return 1.53;
	//set norm and spec parameters
	if(pSetting == "_Emissive") return 2.4;
	if(pSetting == "_BumpStrength") return 0.63;
	if(pSetting == "_SpecStrength") return 1.24;
	if(pSetting == "_Wetness") return 0;
	//set refraction parameters
	if(pSetting == "_RefrStrength") return 2;
	if(pSetting == "_RefrSpeed") return 0.18;
	//set animation speed parameter
	if(pSetting == "_AnimSpeed") return 0;
}

if (pSet == PRESET.mudGrey){
	//collider set
	if(pSetting == "collider") return true;
	//set UVs
	if(pSetting == "_HeightMap") return Vector2(10,8);
	if(pSetting == "_HeightMap2") return Vector2(40,40);
	if(pSetting == "_FoamTex") return Vector2(20,20);
	//set Illumination Value
	if(pSetting == "_IlluminColor") return 0;
	//set colors
	if(pSetting == "_SpecColor") return Color(0.2235294,0.2235294,0.2235294,0.8941177);
	if(pSetting == "_SurfaceColor") return Color(0.4925373,0.4598538,0.3197817,1);
	if(pSetting == "_DepthColor") return Color(0.4,0.372549,0.254902,1);
	if(pSetting == "_EdgeColor") return Color(0.1492537,0.1283791,0,0.3372549);
	if(pSetting == "_DistColor") return Color(0.4941176,0.4823529,0.3607843,1);
	if(pSetting == "_FoamColor") return Color(0.9179105,0.8883611,0.7809089,0.5647059);
	if(pSetting == "_FogColor") return Color(0.5615616,0.6760732,0.7489667,0.05);
	if(pSetting == "_ReflColor") return Color(0.5,0.7134342,1,0.5764706);
	if(pSetting == "_ReflColor2") return Color(0.6313726,0.7019608,0.7686275,0);
	if(pSetting == "_ReflColor3") return Color(0.56,0.674,0.749,0.52);
	//set fog and Depth parameters
	if(pSetting == "_ReflDist") return 50;
	if(pSetting == "_ReflBlend") return 0.005;
	if(pSetting == "_FogFar") return 1200;
	if(pSetting == "_FogAlpha") return 0.1;
	if(pSetting == "_DepthAmt") return 16.98;
	if(pSetting == "_EdgeAmt") return 0.14;
	if(pSetting == "_EdgeBlend") return 1;
	if(pSetting == "_DistFar") return 70.48;
	if(pSetting == "_DistBlend") return 0.01;
	if(pSetting == "_FoamAmt") return -0.1;
	if(pSetting == "_FoamBlend") return 1.53;
	//set norm and spec parameters
	if(pSetting == "_Emissive") return 2.4;
	if(pSetting == "_BumpStrength") return -0.69;
	if(pSetting == "_SpecStrength") return 1.24;
	if(pSetting == "_Wetness") return 0;
	//set refraction parameters
	if(pSetting == "_RefrStrength") return 2;
	if(pSetting == "_RefrSpeed") return 0.18;
	//set animation speed parameter
	if(pSetting == "_AnimSpeed") return 0;
}

if (pSet == PRESET.hotSpringMedicinal){
	//collider set
	if(pSetting == "collider") return true;
	//set UVs
	if(pSetting == "_HeightMap") return Vector2(10,8);
	if(pSetting == "_HeightMap2") return Vector2(30,30);
	if(pSetting == "_FoamTex") return Vector2(10,10);
	//set Illumination Value
	if(pSetting == "_IlluminColor") return 0;
	//set colors
	if(pSetting == "_SpecColor") return Color(0.3686275,0.427451,0.5607843,1);
	if(pSetting == "_SurfaceColor") return Color(0.1777679,0.5671642,0.5486474,0.09411765);
	if(pSetting == "_DepthColor") return Color(0.3306661,0.4328358,0.1776565,1);
	if(pSetting == "_EdgeColor") return Color(0.6093526,0.8358209,0.4678102,0.4313726);
	if(pSetting == "_DistColor") return Color(0.2196078,0.448101,0.945098,0.1333333);
	if(pSetting == "_FoamColor") return Color(0.5591941,0.858209,0.3906772,0.2);
	if(pSetting == "_FogColor") return Color(0.5615616,0.6760732,0.7489667,0.05);
	if(pSetting == "_ReflColor") return Color(1,1,1,0);
	if(pSetting == "_ReflColor2") return Color(0.3163288,0.5616837,0.5970149,0.3058824);
	if(pSetting == "_ReflColor3") return Color(0.56,0.674,0.749,0.52);
	//set fog and Depth parameters
	if(pSetting == "_ReflDist") return 50;
	if(pSetting == "_ReflBlend") return 0.005;
	if(pSetting == "_FogFar") return 1200;
	if(pSetting == "_FogAlpha") return 0.1;
	if(pSetting == "_DepthAmt") return 0.07;
	if(pSetting == "_EdgeAmt") return 1.12;
	if(pSetting == "_EdgeBlend") return 0.46;
	if(pSetting == "_DistFar") return 25.6;
	if(pSetting == "_DistBlend") return 0.009;
	if(pSetting == "_FoamAmt") return 0.08;
	if(pSetting == "_FoamBlend") return 1.53;
	//set norm and spec parameters
	if(pSetting == "_Emissive") return 2.8;
	if(pSetting == "_BumpStrength") return 1.07;
	if(pSetting == "_SpecStrength") return 0;
	if(pSetting == "_Wetness") return 0.1;
	//set refraction parameters
	if(pSetting == "_RefrStrength") return 2;
	if(pSetting == "_RefrSpeed") return 0.18;
	//set animation speed parameter
	if(pSetting == "_AnimSpeed") return 0.5;
}

if (pSet == PRESET.hotSpringSulfuric){
	//collider set
	if(pSetting == "collider") return true;
	//set UVs
	if(pSetting == "_HeightMap") return Vector2(8,10);
	if(pSetting == "_HeightMap2") return Vector2(35,35);
	if(pSetting == "_FoamTex") return Vector2(10,10);
	//set Illumination Value
	if(pSetting == "_IlluminColor") return 0;
	//set colors
	if(pSetting == "_SpecColor") return Color(0.3686275,0.427451,0.5607843,1);
	if(pSetting == "_SurfaceColor") return Color(0.4440823,0.5671642,0.1777679,0.07843138);
	if(pSetting == "_DepthColor") return Color(0.3461919,0.5298507,0.2095678,0.7294118);
	if(pSetting == "_EdgeColor") return Color(0.6093526,0.8358209,0.4678102,0.4313726);
	if(pSetting == "_DistColor") return Color(0.5373135,0.5164891,0.04410782,0.227451);
	if(pSetting == "_FoamColor") return Color(0.4874136,0.6567164,0.3381599,0.4039216);
	if(pSetting == "_FogColor") return Color(0.5615616,0.6760732,0.7489667,0.05);
	if(pSetting == "_ReflColor") return Color(0.7313433,0.3091954,0,0.4196078);
	if(pSetting == "_ReflColor2") return Color(0.5522388,0.5946441,1,0.07843138);
	if(pSetting == "_ReflColor3") return Color(0.56,0.674,0.749,0.52);
	//set fog and Depth parameters
	if(pSetting == "_ReflDist") return 50;
	if(pSetting == "_ReflBlend") return 0.005;
	if(pSetting == "_FogFar") return 1200;
	if(pSetting == "_FogAlpha") return 0.1;
	if(pSetting == "_DepthAmt") return 0.07;
	if(pSetting == "_EdgeAmt") return 1.12;
	if(pSetting == "_EdgeBlend") return 0.46;
	if(pSetting == "_DistFar") return 22;
	if(pSetting == "_DistBlend") return 0.02;
	if(pSetting == "_FoamAmt") return 0.08;
	if(pSetting == "_FoamBlend") return 1.53;
	//set norm and spec parameters
	if(pSetting == "_Emissive") return 2.8;
	if(pSetting == "_BumpStrength") return 1.07;
	if(pSetting == "_SpecStrength") return 0;
	if(pSetting == "_Wetness") return 0.1;
	//set refraction parameters
	if(pSetting == "_RefrStrength") return 2;
	if(pSetting == "_RefrSpeed") return 0.18;
	//set animation speed parameter
	if(pSetting == "_AnimSpeed") return 1;
}

if (pSet == PRESET.sacredPool){
	//collider set
	if(pSetting == "collider") return true;
	//set UVs
	if(pSetting == "_HeightMap") return Vector2(10,8);
	if(pSetting == "_HeightMap2") return Vector2(30,30);
	if(pSetting == "_FoamTex") return Vector2(20,20);
	//set Illumination Value
	if(pSetting == "_IlluminColor") return 0.15;
	//set colors
	if(pSetting == "_SpecColor") return Color(0.172549,0.3647059,0.4980392,0.03137255);
	if(pSetting == "_SurfaceColor") return Color(0.4440823,0.5671642,0.1777679,0);
	if(pSetting == "_DepthColor") return Color(0,0.5820895,0.5696477,1);
	if(pSetting == "_EdgeColor") return Color(0.7622372,1,0,0.3333333);
	if(pSetting == "_DistColor") return Color(0.2073959,0.5369739,0.5671642,0.1372549);
	if(pSetting == "_FoamColor") return Color(0.4342281,0.8432836,0.587624,0.3058824);
	if(pSetting == "_FogColor") return Color(0.5615616,0.6760732,0.7489667,0.05);
	if(pSetting == "_ReflColor") return Color(0.3722993,1,0.2761194,1);
	if(pSetting == "_ReflColor2") return Color(0.2390845,0.4270009,0.6044776,0.2588235);
	if(pSetting == "_ReflColor3") return Color(0.56,0.674,0.749,0.52);
	//set fog and Depth parameters
	if(pSetting == "_ReflDist") return 50;
	if(pSetting == "_ReflBlend") return 0.005;
	if(pSetting == "_FogFar") return 1200;
	if(pSetting == "_FogAlpha") return 0.1;
	if(pSetting == "_DepthAmt") return 0.022;
	if(pSetting == "_EdgeAmt") return 0.04;
	if(pSetting == "_EdgeBlend") return 0.46;
	if(pSetting == "_DistFar") return 12.77;
	if(pSetting == "_DistBlend") return 0.02;
	if(pSetting == "_FoamAmt") return 0.08;
	if(pSetting == "_FoamBlend") return 1.53;
	//set norm and spec parameters
	if(pSetting == "_Emissive") return -0.17;
	if(pSetting == "_BumpStrength") return 1.08;
	if(pSetting == "_SpecStrength") return 1.5;
	if(pSetting == "_Wetness") return 1;
	//set refraction parameters
	if(pSetting == "_RefrStrength") return 8;
	if(pSetting == "_RefrSpeed") return 0.18;
	//set animation speed parameter
	if(pSetting == "_AnimSpeed") return 1;
}

if (pSet == PRESET.toxicSludge){
	//collider set
	if(pSetting == "collider") return true;
	//set UVs
	if(pSetting == "_HeightMap") return Vector2(5,8);
	if(pSetting == "_HeightMap2") return Vector2(30,30);
	if(pSetting == "_FoamTex") return Vector2(20,20);
	//set Illumination Value
	if(pSetting == "_IlluminColor") return 0.3;
	//set colors
	if(pSetting == "_SpecColor") return Color(0,1,0.07692337,0.07058824);
	if(pSetting == "_SurfaceColor") return Color(0.4440823,0.5671642,0.1777679,0);
	if(pSetting == "_DepthColor") return Color(0.4657134,0.6865672,0,1);
	if(pSetting == "_EdgeColor") return Color(0.7622372,1,0,1);
	if(pSetting == "_DistColor") return Color(0.00540209,0.7238806,0.1712048,0.2666667);
	if(pSetting == "_FoamColor") return Color(0.9720278,1,0,1);
	if(pSetting == "_FogColor") return Color(0.5615616,0.6760732,0.7489667,0.05);
	if(pSetting == "_ReflColor") return Color(1,0,0,0);
	if(pSetting == "_ReflColor2") return Color(0.4443555,1,0,0.6);
	if(pSetting == "_ReflColor3") return Color(0.56,0.674,0.749,0.52);
	//set fog and Depth parameters
	if(pSetting == "_ReflDist") return 50;
	if(pSetting == "_ReflBlend") return 0.005;
	if(pSetting == "_FogFar") return 1200;
	if(pSetting == "_FogAlpha") return 0.1;
	if(pSetting == "_DepthAmt") return 0.1;
	if(pSetting == "_EdgeAmt") return 0.32;
	if(pSetting == "_EdgeBlend") return 1.11;
	if(pSetting == "_DistFar") return 12.77;
	if(pSetting == "_DistBlend") return 0.015;
	if(pSetting == "_FoamAmt") return -0.1;
	if(pSetting == "_FoamBlend") return 4.72;
	//set norm and spec parameters
	if(pSetting == "_Emissive") return 1;
	if(pSetting == "_BumpStrength") return 1.16;
	if(pSetting == "_SpecStrength") return 1.5;
	if(pSetting == "_Wetness") return 1;
	//set refraction parameters
	if(pSetting == "_RefrStrength") return 0;
	if(pSetting == "_RefrSpeed") return 0.18;
	//set animation speed parameter
	if(pSetting == "_AnimSpeed") return 0.5;
}

if (pSet == PRESET.lavaPlane1){
	//collider set
	if(pSetting == "collider") return true;
	//set UVs
	if(pSetting == "_HeightMap") return Vector2(5,5);
	if(pSetting == "_HeightMap2") return Vector2(10,10);
	if(pSetting == "_FoamTex") return Vector2(15,15);
	//set Illumination Value
	if(pSetting == "_IlluminColor") return 14.5;
	//set colors
	if(pSetting == "_SpecColor") return Color(0.8588235,0.5215687,0.2156863,0);
	if(pSetting == "_SurfaceColor") return Color(1,0.434965,0,0.945098);
	if(pSetting == "_DepthColor") return Color(1,0.4151082,0,1);
	if(pSetting == "_EdgeColor") return Color(1,0.9860146,0,1);
	if(pSetting == "_DistColor") return Color(0.6865672,0.6096382,0,0);
	if(pSetting == "_FoamColor") return Color(1,0.8811189,0,1);
	if(pSetting == "_FogColor") return Color(0.5615616,0.6760732,0.7489667,0.05);
	if(pSetting == "_ReflColor") return Color(0.854902,0.5019608,0.2078431,1);
	if(pSetting == "_ReflColor2") return Color(0.6313726,0.7019608,0.7686275,0.5137255);
	if(pSetting == "_ReflColor3") return Color(0.56,0.674,0.749,0.52);
	//set fog and Depth parameters
	if(pSetting == "_ReflDist") return 50;
	if(pSetting == "_ReflBlend") return 0.005;
	if(pSetting == "_FogFar") return 1200;
	if(pSetting == "_FogAlpha") return 0.1;
	if(pSetting == "_DepthAmt") return 0.05;
	if(pSetting == "_EdgeAmt") return 0.07;
	if(pSetting == "_EdgeBlend") return 1.63;
	if(pSetting == "_DistFar") return 60;
	if(pSetting == "_DistBlend") return 0.02;
	if(pSetting == "_FoamAmt") return -0.1;
	if(pSetting == "_FoamBlend") return 4.72;
	//set norm and spec parameters
	if(pSetting == "_Emissive") return 1;
	if(pSetting == "_BumpStrength") return 0;
	if(pSetting == "_SpecStrength") return 0;
	if(pSetting == "_Wetness") return 0;
	//set refraction parameters
	if(pSetting == "_RefrStrength") return 6;
	if(pSetting == "_RefrSpeed") return 0.2;
	//set animation speed parameter
	if(pSetting == "_AnimSpeed") return 0.5;
}

if (pSet == PRESET.lavaPlane2){
	//collider set
	if(pSetting == "collider") return true;
	//set UVs
	if(pSetting == "_HeightMap") return Vector2(20,20);
	if(pSetting == "_HeightMap2") return Vector2(10,10);
	if(pSetting == "_FoamTex") return Vector2(10,10);
	//set Illumination Value
	if(pSetting == "_IlluminColor") return 6.53;
	//set colors
	if(pSetting == "_SpecColor") return Color(0.8588235,0.5215687,0.2156863,0);
	if(pSetting == "_SurfaceColor") return Color(1,0.434965,0,0.1960784);
	if(pSetting == "_DepthColor") return Color(1,0.8713787,0,0);
	if(pSetting == "_EdgeColor") return Color(1,0.9860146,0,0);
	if(pSetting == "_DistColor") return Color(0,0,0,0);
	if(pSetting == "_FoamColor") return Color(0.06716418,0.02363157,0,1);
	if(pSetting == "_FogColor") return Color(0.5615616,0.6760732,0.7489667,0.05);
	if(pSetting == "_ReflColor") return Color(0,0,0,0);
	if(pSetting == "_ReflColor2") return Color(0,0,0,0);
	if(pSetting == "_ReflColor3") return Color(0.56,0.674,0.749,0.52);
	//set fog and Depth parameters
	if(pSetting == "_ReflDist") return 50;
	if(pSetting == "_ReflBlend") return 0.005;
	if(pSetting == "_FogFar") return 1200;
	if(pSetting == "_FogAlpha") return 0.1;
	if(pSetting == "_DepthAmt") return 0.05;
	if(pSetting == "_EdgeAmt") return 0.07;
	if(pSetting == "_EdgeBlend") return 1.63;
	if(pSetting == "_DistFar") return 60;
	if(pSetting == "_DistBlend") return 0.02;
	if(pSetting == "_FoamAmt") return -0.1;
	if(pSetting == "_FoamBlend") return 4.72;
	//set norm and spec parameters
	if(pSetting == "_Emissive") return 1;
	if(pSetting == "_BumpStrength") return 0;
	if(pSetting == "_SpecStrength") return 0;
	if(pSetting == "_Wetness") return 0;
	//set refraction parameters
	if(pSetting == "_RefrStrength") return 6;
	if(pSetting == "_RefrSpeed") return 0.1;
	//set animation speed parameter
	if(pSetting == "_AnimSpeed") return 0.2;
}


if (pSet == PRESET.lavaPlane3){
	//collider set
	if(pSetting == "collider") return true;
	//set UVs
	if(pSetting == "_HeightMap") return Vector2(5,10);
	if(pSetting == "_HeightMap2") return Vector2(0.1,0.1);
	if(pSetting == "_FoamTex") return Vector2(10,10);
	//set Illumination Value
	if(pSetting == "_IlluminColor") return 1;
	//set colors
	if(pSetting == "_SpecColor") return Color(0.8588235,0.5215687,0.2156863,0);
	if(pSetting == "_SurfaceColor") return Color(1,0.434965,0,0);
	if(pSetting == "_DepthColor") return Color(1,0.3146854,0,0.5058824);
	if(pSetting == "_EdgeColor") return Color(1,0.9860146,0,0);
	if(pSetting == "_DistColor") return Color(0,0,0,0);
	if(pSetting == "_FoamColor") return Color(0.2761194,0.162196,0,0.5254902);
	if(pSetting == "_FogColor") return Color(0.5615616,0.6760732,0.7489667,0.05);
	if(pSetting == "_ReflColor") return Color(0,0,0,0);
	if(pSetting == "_ReflColor2") return Color(0,0,0,0);
	if(pSetting == "_ReflColor3") return Color(0.56,0.674,0.749,0.52);
	//set fog and Depth parameters
	if(pSetting == "_ReflDist") return 50;
	if(pSetting == "_ReflBlend") return 0.005;
	if(pSetting == "_FogFar") return 1200;
	if(pSetting == "_FogAlpha") return 0.1;
	if(pSetting == "_DepthAmt") return 0.05;
	if(pSetting == "_EdgeAmt") return 0.07;
	if(pSetting == "_EdgeBlend") return 1.63;
	if(pSetting == "_DistFar") return 60;
	if(pSetting == "_DistBlend") return 0.02;
	if(pSetting == "_FoamAmt") return -0.1;
	if(pSetting == "_FoamBlend") return 4.72;
	//set norm and spec parameters
	if(pSetting == "_Emissive") return 1;
	if(pSetting == "_BumpStrength") return 26.27;
	if(pSetting == "_SpecStrength") return 0;
	if(pSetting == "_Wetness") return 0;
	//set refraction parameters
	if(pSetting == "_RefrStrength") return 2;
	if(pSetting == "_RefrSpeed") return -0.1;
	//set animation speed parameter
	if(pSetting == "_AnimSpeed") return 1;
}

if (pSet == PRESET.deepDark){
	//collider set
	if(pSetting == "collider") return true;
	//set UVs
	if(pSetting == "_HeightMap") return Vector2(6,12);
	if(pSetting == "_HeightMap2") return Vector2(15,15);
	if(pSetting == "_FoamTex") return Vector2(10,10);
	//set Illumination Value
	if(pSetting == "_IlluminColor") return 0;
	//set colors
	if(pSetting == "_SpecColor") return Color(0.07006016,0.09349736,0.1268657,0.1098039);
	if(pSetting == "_SurfaceColor") return Color(0,0,0,0.1254902);
	if(pSetting == "_DepthColor") return Color(0.008854972,0.0145786,0.02238804,1);
	if(pSetting == "_EdgeColor") return Color(0.6567164,0.8415616,1,0);
	if(pSetting == "_DistColor") return Color(0.00852083,0.06347333,0.06716418,1);
	if(pSetting == "_FoamColor") return Color(0.6567164,0.6567164,0.6567164,0);
	if(pSetting == "_FogColor") return Color(0.6089572,0.7076123,0.7703075,0.05);
	if(pSetting == "_ReflColor") return Color(0.7164179,0.7164179,0.7164179,0.6588235);
	if(pSetting == "_ReflColor2") return Color(0.3214524,0.385265,0.3880597,0.1176471);
	if(pSetting == "_ReflColor3") return Color(0.56,0.674,0.749,0.52);
	//set fog and Depth parameters
	if(pSetting == "_ReflDist") return 50;
	if(pSetting == "_ReflBlend") return 0.005;
	if(pSetting == "_FogFar") return 1200;
	if(pSetting == "_FogAlpha") return 0.1;
	if(pSetting == "_DepthAmt") return 0.12;
	if(pSetting == "_EdgeAmt") return 2.06;
	if(pSetting == "_EdgeBlend") return 0.76;
	if(pSetting == "_DistFar") return 116.5;
	if(pSetting == "_DistBlend") return 0.008;
	if(pSetting == "_FoamAmt") return 0.4;
	if(pSetting == "_FoamBlend") return 2.98;
	//set norm and spec parameters
	if(pSetting == "_Emissive") return 2.5;
	if(pSetting == "_BumpStrength") return 1.07;
	if(pSetting == "_SpecStrength") return 0;
	if(pSetting == "_Wetness") return 7.6;
	//set refraction parameters
	if(pSetting == "_RefrStrength") return 4;
	if(pSetting == "_RefrSpeed") return 0.18;
	//set animation speed parameter
	if(pSetting == "_AnimSpeed") return 1;
}
if (pSet == PRESET.lavaSingle){
	//collider set
	if(pSetting == "collider") return true;
	//set UVs
	if(pSetting == "_HeightMap") return Vector2(1,2);
	if(pSetting == "_HeightMap2") return Vector2(10,10);
	if(pSetting == "_FoamTex") return Vector2(15,15);
	//set Illumination Value
	if(pSetting == "_IlluminColor") return 2;
	//set colors
	if(pSetting == "_SpecColor") return Color(0.8588235,0.5215687,0.2156863,0);
	if(pSetting == "_SurfaceColor") return Color(0.08208954,0,0,0.454902);
	if(pSetting == "_DepthColor") return Color(1,0.4151082,0,1);
	if(pSetting == "_EdgeColor") return Color(1,0.3986021,0,1);
	if(pSetting == "_DistColor") return Color(1,0,0,0.5333334);
	if(pSetting == "_FoamColor") return Color(0,0,0,1);
	if(pSetting == "_FogColor") return Color(0.5615616,0.6760732,0.7489667,0);
	if(pSetting == "_ReflColor") return Color(0.6716418,0.2395366,0,1);
	if(pSetting == "_ReflColor2") return Color(1,0.04195804,0,0.8156863);
	if(pSetting == "_ReflColor3") return Color(1,0.3356643,0,0.4039216);
	//set fog and Depth parameters
	if(pSetting == "_ReflDist") return 50;
	if(pSetting == "_ReflBlend") return 0.005;
	if(pSetting == "_FogFar") return 1700;
	if(pSetting == "_FogAlpha") return 0.1182;
	if(pSetting == "_DepthAmt") return 7.01;
	if(pSetting == "_EdgeAmt") return 0.09;
	if(pSetting == "_EdgeBlend") return 1.33;
	if(pSetting == "_DistFar") return 108;
	if(pSetting == "_DistBlend") return 0.0149;
	if(pSetting == "_FoamAmt") return -2.9;
	if(pSetting == "_FoamBlend") return 28.9;
	//set norm and spec parameters
	if(pSetting == "_Emissive") return 2.376;
	if(pSetting == "_BumpStrength") return 1.112;
	if(pSetting == "_SpecStrength") return 0.012;
	if(pSetting == "_Wetness") return 0.12;
	//set refraction parameters
	if(pSetting == "_RefrStrength") return 2.925;
	if(pSetting == "_RefrSpeed") return 0.1;
	//set animation speed parameter
	if(pSetting == "_AnimSpeed") return 0.4;
}

if (pSet == PRESET.murkyGreen){
	//collider set
	if(pSetting == "collider") return true;
	//set UVs
	if(pSetting == "_HeightMap") return Vector2(10,8);
	if(pSetting == "_HeightMap2") return Vector2(50,50);
	if(pSetting == "_FoamTex") return Vector2(20,20);
	//set Illumination Value
	if(pSetting == "_IlluminColor") return 0;
	//set colors
	if(pSetting == "_SpecColor") return Color(0.5019608,0.5019608,0.5019608,0.02745098);
	if(pSetting == "_SurfaceColor") return Color(1,1,1,0);
	if(pSetting == "_DepthColor") return Color(0.2186246,0.3432836,0.08453998,1);
	if(pSetting == "_EdgeColor") return Color(0.8392651,1,0.6716418,1);
	if(pSetting == "_DistColor") return Color(0.7241383,1,0,0.2941177);
	if(pSetting == "_FoamColor") return Color(0.5024208,0.5298507,0.2846959,0.3686275);
	if(pSetting == "_FogColor") return Color(0.5615616,0.6760732,0.7489667,0.05);
	if(pSetting == "_ReflColor") return Color(0.3059701,0.6214381,1,0.4745098);
	if(pSetting == "_ReflColor2") return Color(0.5373135,0.5373135,0.5373135,0.1686275);
	if(pSetting == "_ReflColor3") return Color(0.7089552,0.7089552,0.7089552,0.5215687);
	//set fog and Depth parameters
	if(pSetting == "_ReflDist") return 50;
	if(pSetting == "_ReflBlend") return 0.005;
	if(pSetting == "_FogFar") return 1200;
	if(pSetting == "_FogAlpha") return 0.1;
	if(pSetting == "_DepthAmt") return 0.07;
	if(pSetting == "_EdgeAmt") return 1.29;
	if(pSetting == "_EdgeBlend") return 0.59;
	if(pSetting == "_DistFar") return 43.8;
	if(pSetting == "_DistBlend") return 0.01;
	if(pSetting == "_FoamAmt") return 0.05;
	if(pSetting == "_FoamBlend") return 1.53;
	//set norm and spec parameters
	if(pSetting == "_Emissive") return 2.74;
	if(pSetting == "_BumpStrength") return 1;
	if(pSetting == "_SpecStrength") return 1.35;
	if(pSetting == "_Wetness") return 1.29;
	//set refraction parameters
	if(pSetting == "_RefrStrength") return 2;
	if(pSetting == "_RefrSpeed") return 0.18;
	//set animation speed parameter
	if(pSetting == "_AnimSpeed") return 0.7;
}


}