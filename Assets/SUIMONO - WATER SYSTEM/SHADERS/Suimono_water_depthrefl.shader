// Upgrade NOTE: commented out 'float3 _WorldSpaceCameraPos', a built-in variable

Shader "Suimono/water_depthReflective" {

Properties {
	_MasterScale ("Master Scale", Float) = 1.0
	_IlluminColor ("Illumination", Float) = 0.0
	_SpecColor ("Specular Color", Color) = (0.5, 0.5, 0.5, 1)
	_SurfaceColor ("Surface Color", Color) = (0.25,0.25,0.5,1.0)
	_DepthColor ("Depth Color", Color) = (0.25,0.25,0.5,1.0)
	_EdgeColor ("Edge Color", Color) = (1,1,1,1)
	_DistColor ("Blend Color", Color) = (0.5, 0.5, 0.5, 1)
	_FoamColor ("Foam Color", Color) = (1,1,1,1)
	_FogColor ("Fog Color", Color) = (0.5, 0.5, 0.5, 1)
	_ReflColor ("Reflection Color", Color) = (1.0, 1.0, 1.0, 0.5)
	_ReflColor2 ("Reflection Base", Color) = (1.0, 1.0, 1.0, 0.5)
	_ReflColor3 ("Reflection Dynamic", Color) = (1.0, 1.0, 1.0, 0.5)
	
	_ReflDist ("Reflection Distance", Float) = 1000
	_ReflBlend ("Reflection Blend", Float) = 0.01
		
	_FogFar ("Fog Distance", Float) = 1000
	_FogAlpha ("Fog Intensity (0.0 - 1.0)", Float) = 0.3
	
	_DepthAmt ("Depth Amount", Float) = 0.1
		
	_EdgeAmt ("Edge Amount", Float) = 1.0
	_EdgeBlend ("Edge Blend", Float) = 1.0
	
	_DistFar ("BlendColor Distance", Float) = 60
	_DistBlend ("BlendColor Transition (0.0 - 0.05)", Float) = 0.02
	
	_FoamAmt ("Foam Amount", Float) = 1.0
	_FoamBlend ("Foam Blend", Float) = 1.0
	
	_Emissive ("Emissive Strength", Float) = 0.5
	_BumpStrength ("Normal Strength (0.0-1.0)", Float) = 0.5
	_SpecStrength ("Specular Strength", Float) = 0.7
	_Wetness ("Wetness", Float) = 0.0
	
	_RefrStrength ("Refraction Strength (0.0 - 25.0)", Float) = 25.0
    _RefrSpeed ("Refraction Speed (0.0 - 0.5)", Float) = 0.5
	_AnimSpeed ("Animation Speed (0.0 - 1.0)", Float) = 1.0
	    
	_HeightMap ("HeightMap (RGB)", 2D) = "black" {}
	_HeightMap2 ("HeightMap 2 (RGB)", 2D) = "black" {}
	_FoamTex ("Foam Texture (RGB)", 2D) = "black" {}
	_CubeTex ("Cubemap", CUBE) = "" {}
	_CubeTex2 ("Cubemap2", CUBE) = "" {}
	_ReflectionTex ("Reflection", 2D) = "" {}
	//_FlowMap ("Flow Map (RGB)", 2D) = "black" {}
	_Ramp ("Shading Ramp", 2D) = "black" {}
}





Subshader 
{ 
















//HEIGHT FOG
Tags { "RenderType"="Transparent" "Queue"= "Transparent-400"}
//Tags { "Queue"= "Background"}
Cull off
Name "HeightFogSS"
Blend SrcAlpha OneMinusSrcAlpha
ZWrite Off

CGPROGRAM
#pragma target 3.0
#pragma surface surf Lambert vertex:vert

struct Input {
	float2 uv_FoamTex;
	float4 pos;
	float4 viewInterpolator; 	
	float4 screenPos;	
	float4 grabPassPos;
};

void vert (inout appdata_full v, out Input o) {
	o.pos = mul(UNITY_MATRIX_MVP, v.vertex);
	#if UNITY_UV_STARTS_AT_TOP
		float scale = -1.0;
	#else
		float scale = 1.0;
	#endif

	o.screenPos = ComputeScreenPos(o.pos); 
	o.grabPassPos.xy = ( float2( o.pos.x, o.pos.y*scale ) + o.pos.w ) * 0.5;
	o.grabPassPos.zw = o.pos.zw;
		
}

float4 _DepthColor;
sampler2D _CameraDepthTexture;
float4 _InvFadeParemeter;
float _DepthAmt;

void surf (Input IN, inout SurfaceOutput o) {

	//CALCULATE DEPTH FOG
	float4 DepthFade = float4(1.0,_DepthAmt,0.0,0.0);
	float4 edgeBlendFactors = float4(0.0, 0.0, 0.0, 0.0);
	half depth = UNITY_SAMPLE_DEPTH(tex2Dproj(_CameraDepthTexture, UNITY_PROJ_COORD(IN.screenPos)));
	depth = LinearEyeDepth(depth);
	edgeBlendFactors = saturate(DepthFade * (depth-IN.screenPos.w));		
		
	float4 depthColor = (_DepthColor - (IN.viewInterpolator.w * DepthFade.w) * float4(0.15, 0.03, 0.01, 0.0));

	depthColor.a *= (edgeBlendFactors.y + saturate(IN.viewInterpolator.w));
	depthColor.a = edgeBlendFactors.x * depthColor.a;
	
	o.Albedo = depthColor.rgb;
	o.Alpha = depthColor.a;
			
}
ENDCG
























// SURFACE WATER RENDER (requires Shader Model 3.0)
Tags { "RenderType"="Transparent" "Queue"= "transparent-300"}
LOD 400
Cull off
ZWrite Off
Blend SrcAlpha OneMinusSrcAlpha

CGPROGRAM
#pragma target 3.0
#pragma surface surf Lambert

struct Input {
	float2 uv_HeightMap;
	float2 uv_HeightMap2;
};


sampler2D _HeightMap;
sampler2D _HeightMap2;

float _MasterScale = 1.0;
float4 _SurfaceColor;
float _BumpStrength;
float _IlluminColor;

void surf (Input IN, inout SurfaceOutput o) {
			//CALCULATE NORMALS
			o.Normal = UnpackNormal(tex2D(_HeightMap, float2(IN.uv_HeightMap.x*_MasterScale,IN.uv_HeightMap.y*_MasterScale)));
      		o.Normal *= UnpackNormal(tex2D(_HeightMap2, float2(IN.uv_HeightMap2.x*_MasterScale,IN.uv_HeightMap2.y*_MasterScale)));
      		o.Normal *= UnpackNormal(tex2D(_HeightMap2, float2(IN.uv_HeightMap.x*1.75*_MasterScale,IN.uv_HeightMap.y*1.75*_MasterScale)));
	  		
	  		float fullNormal = o.Normal;
			o.Normal *= _BumpStrength;
			        	
          	o.Albedo = _SurfaceColor.rgb;
			o.Alpha = _SurfaceColor.a;

          	o.Emission = o.Albedo.rgb * _IlluminColor;
			
}
ENDCG














//ADDITIONAL SURFACE PASS FOR DISTANCE FOG FAR
Tags { "RenderType"="Transparent" "Queue"= "Transparent-300"}
Cull off
Blend SrcAlpha OneMinusSrcAlpha
ZWrite Off
Fog {Mode Linear Range 0.0,[_FogFar] Color [_FogColor]} 

CGPROGRAM
#pragma surface surf BlinnPhong vertex:vert

struct Input {
	// float3 _WorldSpaceCameraPos;
	float4 pos;
};

float4 _DistColor;
float _DistFar;
float _DistBlend;
float _IlluminColor;

void vert (inout appdata_full v, out Input o) {
	o.pos = -mul(UNITY_MATRIX_MVP, v.vertex);
}

void surf (Input IN, inout SurfaceOutput o) {
	float fogCalc2 = ((1.0-((IN.pos.z+(_DistFar*1.0)))));
	o.Alpha = (fogCalc2 * _DistBlend * _DistColor.a);
    o.Albedo = _DistColor.rgb;
    if (o.Alpha < 0.0) o.Alpha = 0.0;
    if (o.Alpha > 1.0) o.Alpha = 1.0;

	o.Emission = o.Albedo.rgb * _IlluminColor;
	
}
ENDCG









//MIRROR REFLECTION
Tags { "RenderType"="Transparent" "Queue"= "Transparent-300"}
Cull off
Blend SrcAlpha OneMinusSrcAlpha
ZWrite Off

CGPROGRAM
#pragma target 3.0
#pragma surface surf BlinnPhong vertex:vert
#include "UnityCG.cginc"


struct Input {
	//float3 _WorldSpaceCameraPos;
    float4 pos;
    float4 ref;
    float3 viewDir;
};
     

void vert (inout appdata_full v, out Input o) {
	o.pos = -mul (UNITY_MATRIX_MVP, v.vertex);   
	o.viewDir.xzy = ObjSpaceViewDir(v.vertex);
	o.ref = ComputeScreenPos(o.pos);
}

float4 _ReflColor3;
float _DistFar;
float _DistBlend;
float _ReflDist;
float _ReflBlend;
//float _MasterScale;
//sampler2D _Ramp;
//sampler2D _HeightMap;
//sampler2D _HeightMap2;
//float _BumpStrength;
sampler2D _ReflectionTex;

void surf (Input IN, inout SurfaceOutput o) {
    //CALCULATE NORMALS
	//o.Normal = UnpackNormal(tex2D(_HeightMap, float2(IN.uv_HeightMap.x*_MasterScale,IN.uv_HeightMap.y*_MasterScale)));
	//o.Normal *= UnpackNormal(tex2D(_HeightMap2, float2(IN.uv_HeightMap2.x*_MasterScale,IN.uv_HeightMap2.y*_MasterScale)));
	//o.Normal *= UnpackNormal(tex2D(_HeightMap2, float2(IN.uv_HeightMap.x*1.75*_MasterScale,IN.uv_HeightMap.y*1.75*_MasterScale)));
	//o.Normal *= _BumpStrength; 
	
	o.Gloss = o.Normal*4.0;
	o.Specular = 1.0;
	
	float fogCalc2 = ((1.0-((IN.pos.z+(_ReflDist)))));
	float mask = (fogCalc2 * _ReflBlend);
    if (mask < 0.0) mask = 0.0;
    if (mask > 1.0) mask = 1.0;
	

    IN.viewDir = normalize(IN.viewDir);
	float4 uv1 = IN.ref; uv1.xy;
	//float4 uv1 = IN.ref; o.Normal;
	half4 refl = tex2Dproj( _ReflectionTex, UNITY_PROJ_COORD(uv1));  
    o.Albedo = refl.rgb*_ReflColor3.rgb*1.75;
    //o.Albedo *= (4.0*refl.a);
    //o.Alpha = (1.0-refl.a) * _ReflColor2.a;//1.0;//-(o.Normal.r+o.Normal.g);//0.2+o.Normal;//*_ReflColor2.a;//refl.a;
    o.Alpha = mask * _ReflColor3.a;
}
ENDCG













//EDGE FOAM
Tags { "RenderType"="Transparent" "Queue"= "Transparent-200"}
Cull off
Name "HeightFogSS"
Blend SrcAlpha OneMinusSrcAlpha
ZWrite Off

CGPROGRAM
#pragma target 3.0
#pragma surface surf Lambert vertex:vert

struct Input {
	float2 uv_FoamTex;
	float4 pos;
	float4 viewInterpolator; 	
	float4 screenPos;	
	float4 grabPassPos;
};

void vert (inout appdata_full v, out Input o) {

	o.pos = mul(UNITY_MATRIX_MVP, v.vertex);
	#if UNITY_UV_STARTS_AT_TOP
		float scale = -1.0;
	#else
		float scale = 1.0;
	#endif
	
	o.screenPos = ComputeScreenPos(o.pos); 
	o.grabPassPos.xy = ( float2( o.pos.x, o.pos.y*scale ) + o.pos.w ) * 0.5;
	o.grabPassPos.zw = o.pos.zw;
}

float _MasterScale = 1.0;
float4 _FoamColor;

sampler2D _FoamTex;
sampler2D _CameraDepthTexture;
float _FoamAmt;
float _FoamBlend;

void surf (Input IN, inout SurfaceOutput o) {

	float4 foamFade = float4(1.0,_FoamAmt,0.0,0.0);
	float4 edgeBlendFactors = float4(1.0, 0.0, 0.0, 0.0);
	half depth = UNITY_SAMPLE_DEPTH(tex2Dproj(_CameraDepthTexture, UNITY_PROJ_COORD(IN.screenPos)));
	depth = LinearEyeDepth(depth);
	edgeBlendFactors = saturate(foamFade * (depth-IN.screenPos.w));		
		
	float4 foamMask = (_FoamColor - (IN.viewInterpolator.w * foamFade.w) * float4(0.15, 0.03, 0.01, 0.0));

	foamMask.a = (edgeBlendFactors.y + saturate(IN.viewInterpolator.w));
	foamMask.a = 1.0-foamMask.a;
	foamMask.a *= _FoamBlend;
	if (foamMask.a > 1.0){
		foamMask.a=1.0;
	}
	if (foamMask.a < 0.0){
		foamMask.a=0.0;
	}
	
	half4 foamTexture = tex2D(_FoamTex, IN.uv_FoamTex);

	o.Albedo = _FoamColor.rgb;
	o.Alpha = (foamMask.a * _FoamColor.a) * foamTexture.r * foamTexture.a;
			
}
ENDCG












//ADDITIONAL SURFACE PASS CUBE REFLECTIONS (requires Shader Model 3.0)
Tags { "RenderType"="Transparent" "Queue"= "Transparent-300"}
Cull off
Blend SrcAlpha OneMinusSrcAlpha
ZWrite Off

CGPROGRAM
#pragma target 3.0
#pragma surface surf Lambert vertex:vert
//#pragma surface surf Ramp vertex:vert

struct Input {
	float2 uv_HeightMap;
	float2 uv_HeightMap2;
	float3 worldRefl;
	float4 pos;
	INTERNAL_DATA
};

sampler2D _Ramp;

sampler2D _HeightMap;
sampler2D _HeightMap2;
samplerCUBE _CubeTex;
samplerCUBE _CubeTex2;

float _MasterScale = 1.0;
float _FogFar;
float _Emissive;
float4 _ReflColor;
float4 _ReflColor2;
//float4 _ReflColor3;
float _BumpStrength;
float _Wetness;
float _IlluminColor;

   
      
void vert (inout appdata_full v, out Input o) {
	o.pos = -mul(UNITY_MATRIX_MVP, v.vertex);
}


void surf (Input IN, inout SurfaceOutput o) {
	//CALCULATE NORMALS
	o.Normal = UnpackNormal(tex2D(_HeightMap, float2(IN.uv_HeightMap.x*_MasterScale,IN.uv_HeightMap.y*_MasterScale)));
	o.Normal *= UnpackNormal(tex2D(_HeightMap2, float2(IN.uv_HeightMap2.x*_MasterScale,IN.uv_HeightMap2.y*_MasterScale)));
	o.Normal *= UnpackNormal(tex2D(_HeightMap2, float2(IN.uv_HeightMap.x*1.75*_MasterScale,IN.uv_HeightMap.y*1.75*_MasterScale)));
	o.Normal *= _BumpStrength;  		

	//Add Cubemap Reflections
	//float strengthCalc = ((((IN.pos.z+(_FogFar*0.75))*0.002)));
	half3 reflectionBase = texCUBE(_CubeTex, WorldReflectionVector (IN, o.Normal)).rgb; 
	half3 reflectionBase2 = texCUBE(_CubeTex2, WorldReflectionVector (IN, o.Normal)).rgb;
	//half3 reflectionBase3 = texCUBE(_CubeTex2, WorldReflectionVector (IN, o.Normal)).rgb;
	//if (_ReflColor.a > 0.0){
		reflectionBase *= ((_ReflColor.rgb));
		reflectionBase2 *= ((_ReflColor2.rgb));
		//reflectionBase3 *= ((_ReflColor3.rgb));
		
		float greyscale = o.Normal.z;//tex2D(_MainTex, i.uv).r
		
		//o.Albedo = ((reflectionBase * (_ReflColor.a*2.5)));
		//o.Albedo += ((reflectionBase2 * (_ReflColor.a*1.5))*0.25);
		//o.Alpha += ((reflectionBase * (_ReflColor.a*0.15))*strengthCalc);
		//o.Alpha += ((reflectionBase * (_ReflColor.a*0.5)));
		o.Albedo = (reflectionBase2); // base color
		o.Albedo += (reflectionBase * _ReflColor.a); //reflect overlay
		o.Albedo -= tex2D(_Ramp, float2(greyscale, 0.5)).b;
		o.Albedo += (half3(1.0,1.0,1.0)*tex2D(_Ramp, float2(greyscale, 0.5)).g*1.0);
		//o.Alpha = (reflectionBase * _ReflColor.a) + (reflectionBase2 * _ReflColor2.a);
		//if (strengthCalc < 0.0) strengthCalc = 0.0;
		//if (strengthCalc > 1.0) strengthCalc = 1.0;
		
		o.Gloss = tex2D(_Ramp, float2(greyscale, 0.5)).g;
		o.Specular = 1.0;
		
		
		o.Alpha = (_ReflColor.a * reflectionBase);
		o.Alpha += _ReflColor2.a * tex2D(_Ramp, float2(greyscale, 0.5)).r;
		o.Alpha += (tex2D(_Ramp, float2(greyscale, 0.5)).b*0.25);
		
		//o.Alpha += _ReflColor3.a * tex2D(_Ramp, float2(greyscale, 0.5)).b;
		
	//}	
			
	o.Albedo*=_Emissive;

	o.Emission = o.Albedo.rgb * _IlluminColor;
	
}
ENDCG










//EDGE COLOR
Tags { "RenderType"="Transparent" "Queue"= "Transparent-200"}
Cull off
//Name "HeightFogSS"
Blend SrcAlpha OneMinusSrcAlpha
ZWrite Off

CGPROGRAM
#pragma target 3.0
#pragma surface surf Lambert vertex:vert

struct Input {
	float4 pos;
	float4 viewInterpolator; 	
	float4 screenPos;	
	float4 grabPassPos;
};

void vert (inout appdata_full v, out Input o) {

	o.pos = mul(UNITY_MATRIX_MVP, v.vertex);
	#if UNITY_UV_STARTS_AT_TOP
		float scale = -1.0;
	#else
		float scale = 1.0;
	#endif

	o.screenPos = ComputeScreenPos(o.pos); 
	o.grabPassPos.xy = ( float2( o.pos.x, o.pos.y*scale ) + o.pos.w ) * 0.5;
	o.grabPassPos.zw = o.pos.zw;
}


float4 _EdgeColor;

sampler2D _CameraDepthTexture;
float _EdgeAmt;
float _EdgeBlend;

void surf (Input IN, inout SurfaceOutput o) {

	float4 edgeFade = float4(1.0,_EdgeAmt,0.0,0.0);
	float4 edgeBlendFactors = float4(1.0, 0.0, 0.0, 0.0);
	half depth = UNITY_SAMPLE_DEPTH(tex2Dproj(_CameraDepthTexture, UNITY_PROJ_COORD(IN.screenPos)));
	depth = LinearEyeDepth(depth);
	edgeBlendFactors = saturate(edgeFade * (depth-IN.screenPos.w));		
		
	float4 edgeMask = (_EdgeColor - (IN.viewInterpolator.w * edgeFade.w) * float4(0.15, 0.03, 0.01, 0.0));

	edgeMask.a = (edgeBlendFactors.y + saturate(IN.viewInterpolator.w));
	edgeMask.a = 1.0-edgeMask.a;
	edgeMask.a *= _EdgeBlend;
	if (edgeMask.a > 1.0){
		edgeMask.a=1.0;
	}
	if (edgeMask.a < 0.0){
		edgeMask.a=0.0;
	}
	
	o.Albedo = _EdgeColor.rgb;
	o.Alpha = (edgeMask.a * _EdgeColor.a);
			
}
ENDCG































//ADDITIONAL SURFACE PASS FOR SPECULAR HIGHLIGHTS (requires Shader Model 3.0)
Tags { "RenderType"="Transparent" "Queue"= "Transparent-300"}
Cull off
Blend SrcAlpha OneMinusSrcAlpha

CGPROGRAM
#pragma target 3.0
#pragma surface surf BlinnPhong

struct Input {
	float2 uv_HeightMap;
	float2 uv_HeightMap2;
};

sampler2D _HeightMap;
sampler2D _HeightMap2;
float _MasterScale;
float _SpecStrength;
float _Wetness;
float _IlluminColor;

void surf (Input IN, inout SurfaceOutput o) {
	o.Normal = UnpackNormal(tex2D(_HeightMap, float2(IN.uv_HeightMap.x*_MasterScale,IN.uv_HeightMap.y*_MasterScale)));
    o.Normal *= UnpackNormal(tex2D(_HeightMap2, float2(IN.uv_HeightMap2.x*_MasterScale,IN.uv_HeightMap2.y*_MasterScale)));
    o.Normal *= UnpackNormal(tex2D(_HeightMap2, float2(IN.uv_HeightMap.x*1.75*_MasterScale,IN.uv_HeightMap.y*1.75*_MasterScale)));
	o.Normal *= _SpecStrength;
	
	_Wetness = 0.45;
	o.Gloss = (1.0-o.Normal)*(_Wetness*1.0);
	o.Specular = 0.9+(normalize(o.Normal.g*2.0)*0.6)+(normalize(o.Normal.b*1.0)*0.2);
	o.Specular *= 0.01*(2.0+(normalize(o.Normal.g*2.0)*0.6)+(normalize(o.Normal.b*1.0)*0.2));

	o.Albedo = float3(0.5,0.5,0.5);
	o.Alpha = 0.0;
}
ENDCG









//ADDITIONAL SURFACE PASS FOR HOT SPECULARS (requires Shader Model 3.0)
Tags { "RenderType"="Transparent" "Queue"= "Transparent-300"}
Cull off
Blend SrcAlpha OneMinusSrcAlpha
ZWrite Off

CGPROGRAM
#pragma target 3.0
#pragma surface surf BlinnPhong

struct Input {
	float2 uv_HeightMap;
	float2 uv_HeightMap2;
};

sampler2D _HeightMap;
sampler2D _HeightMap2;
float _MasterScale;
float _SpecStrength;
float _Wetness;
float _IlluminColor;

void surf (Input IN, inout SurfaceOutput o) {

	_SpecStrength = 1.05;

	o.Normal = UnpackNormal(tex2D(_HeightMap, float2(IN.uv_HeightMap.x*_MasterScale,IN.uv_HeightMap.y*_MasterScale)));
    o.Normal *= UnpackNormal(tex2D(_HeightMap2, float2(IN.uv_HeightMap2.x*_MasterScale,IN.uv_HeightMap2.y*_MasterScale)));
    o.Normal *= UnpackNormal(tex2D(_HeightMap2, float2(IN.uv_HeightMap.x*1.75*_MasterScale,IN.uv_HeightMap.y*1.75*_MasterScale)));
	o.Normal *= _SpecStrength;

	o.Gloss = (1.0-o.Normal)*(_Wetness*1.0);
	o.Specular = 0.9+(normalize(o.Normal.g*2.0)*0.6)+(normalize(o.Normal.b*1.0)*0.2);

	o.Albedo = float3(0.5,0.5,0.5);
	o.Alpha = 0.0;
}
ENDCG









}
FallBack ""
}
