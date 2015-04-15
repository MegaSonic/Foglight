Shader "Suimono/water_wave_overlay" {

Properties {
	_MasterScale ("Master Scale", Float) = 1.0
	_IlluminColor ("Illumination", Float) = 0.0

	_FoamColor ("Foam Color", Color) = (1,1,1,1)
	_CrestColor ("Crest Color", Color) = (1,1,1,1)
	_WaveColor ("Wave Color", Color) = (1,1,1,1)

	_AnimSpeed ("Animation Speed (0.0 - 1.0)", Float) = 1.0
	    
	_WaveTex ("Wave Texture (RGB)", 2D) = "black" {}
	_FoamTex ("Foam Texture (RGB)", 2D) = "black" {}
	_FlowMap ("Flow Map (RGB)", 2D) = "black" {}
	_FlowScale ("Flowmap Scale", Range(0.0,3.0)) = 0.0
	_FlowOverlay ("Flowmap Debug", Range(0.0,1.0)) = 0.0

    _NoiseMap  ("NoiseMap (RGB)", 2D) = "white" {}
}









SubShader
{







//CALCULATE FLOWMAP NORMAL
Tags { "RenderType"="Transparent" "Queue"= "Transparent-101"} //+900
Blend SrcAlpha OneMinusSrcAlpha
//Blend DstColor Zero
Cull Off
Fog{Mode Off}

CGPROGRAM
#pragma target 3.0
#pragma surface surf BlinnPhong vertex:vert

struct Input{
	float2 uv_FoamTex;
	float2 uv_WaveTex;
	
	float2 uv_FlowMap;
	float2 uv_NoiseMap;
	float4 pos;
    float4 proj : TEXCOORD;
};


void vert (inout appdata_full v, out Input o) {
    o.pos = mul(UNITY_MATRIX_MVP, v.vertex);

	#if UNITY_UV_STARTS_AT_TOP
		float scale = -1.0;
	#else
		float scale = 1.0;
	#endif
	o.proj.xy = (float2(o.pos.x, o.pos.y*scale) + o.pos.w) * 0.5;
	o.proj.zw = o.pos.zw;
	o.proj.z +=63;

	  
}

sampler2D _FoamTex;
sampler2D _WaveTex;

float4 _FoamColor;
float4 _CrestColor;
float4 _WaveColor;

sampler2D _FlowMap;
sampler2D _NoiseMap;

float _MasterScale;
float _FlowScale;
float _FlowOverlay;
float _SpecStrength;

float halfCycle;
float   flowMapOffset0;
float   flowMapOffset1;
float fWaveScale = 1.0f;
float3 fWaveSpeed; 
float _Wetness;

void surf(Input IN, inout SurfaceOutput o){

 	half4 getflowmap = tex2D(_FlowMap,IN.uv_FlowMap);// * 2.0f - 1.0f;
 	

 	float2 flowmap = float2(getflowmap.r,getflowmap.g) * 2.0f - 1.0f;
    float cycleOffset = tex2D( _NoiseMap, IN.uv_NoiseMap).r;
    float phase0 = cycleOffset * 1.0 + flowMapOffset0;
    float phase1 = cycleOffset * 1.0 + flowMapOffset1;

	flowmap.x = lerp(0.0,flowmap.x,_FlowScale);
	flowmap.y = lerp(0.0,flowmap.y,_FlowScale);
	phase0 = lerp(1.0,phase0,_FlowScale);
	phase1 = lerp(phase0,phase1,_FlowScale);

    float f = ( abs( halfCycle - flowMapOffset0 ) / halfCycle );


	half4 waveTex0 = tex2D(_WaveTex, float2(IN.uv_WaveTex.x, IN.uv_WaveTex.y) + flowmap * phase0);
	half4 waveTex1 = tex2D(_WaveTex, float2(IN.uv_WaveTex.x, IN.uv_WaveTex.y) + flowmap * phase1);
	half4 waveTex = lerp( waveTex0, waveTex1, f );
	
	half4 foamTex = tex2D(_FoamTex, IN.uv_FoamTex);

	float crestFactr = (getflowmap.r + getflowmap.g)*0.35;
	float foamFactr = (getflowmap.r + getflowmap.g)*0.5;
	half4 rColor = (_WaveColor * waveTex.b);
	rColor += (_FoamColor * waveTex.r * foamFactr);
	rColor += (_CrestColor * waveTex.g * crestFactr);
	rColor = lerp(rColor,_CrestColor,(getflowmap.r + getflowmap.g *0.25));
	
	o.Albedo = rColor;
	
	o.Alpha = (getflowmap.g + getflowmap.r);
	o.Alpha *= ((waveTex.b*_WaveColor.a) + (waveTex.r*_FoamColor.a* foamFactr) + (waveTex.g*_CrestColor.a*crestFactr));
	o.Alpha *= foamTex.r;
	if (o.Alpha > 1.3) o.Alpha = 0.8;

	
	o.Gloss = 0.0;
	o.Specular = 0.0;
	
	o.Albedo += (getflowmap.rgb*_FlowOverlay);
	o.Alpha += _FlowOverlay*0.5;


}
ENDCG






}
FallBack "Specular"
}