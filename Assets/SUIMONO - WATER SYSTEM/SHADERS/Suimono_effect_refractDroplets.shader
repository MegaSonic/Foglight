Shader "Suimono/effect_refractDroplets" {
Properties {
	_MaskMap ("MaskMap", 2D) = "black" {}
	_HeightMap ("HeightMap (RGB)", 2D) = "black" {}
	_DepthColor ("Depth Color", Color) = (0.5, 0.5, 0.5, 1)
    //_WaterDepth ("Depth", range (0,20)) = 5.0
    _Strength ("Refraction Strength", range (0,150)) = 25.0
    _EffectSpeed ("Water Speed", Range (0, 0.5)) = 0.5
	_EffectSpeed2 ("Water Speed", Range (0, 0.5)) = 0.37
	_useAlpha ("Mask Strength", Range (0.0, 1.0)) = 0.0
}



SubShader {



		
        
        
        


 //GRAB COLOR BUFFER IMAGE
        GrabPass {
        	"_waterTex1"
        	Tags {"Queue"= "Transparent+9" "IgnoreProjector"="True"}
            Name "ScreenGrab"
        }
        
        

		
        //RENDER REFRACTION
        Pass{
       		//Tags {"Queue"= "10000" "IgnoreProjector"="True"}
			//Tags {"Queue"= "Transparent+600" "IgnoreProjector"="True"}
			Tags {"Queue"= "Transparent+10" "IgnoreProjector"="True"}
			Cull Off
            Name "DropDistortion"
            //Blend Off
            Blend SrcAlpha OneMinusSrcAlpha
            ZWrite Off
            //Lighting On
            //ZTest Always
            
             //Offset -1,-100000
             
            CGPROGRAM
            	#pragma target 3.0
                #pragma vertex vert
                #pragma fragment frag
                #pragma fragmentoption ARB_precision_hint_fastest
                #include "UnityCG.cginc"

                struct v2f {
                    float4 pos          : POSITION;
                    float4 uvgrab       : TEXCOORD0;
                    float2 uv           : TEXCOORD1;
                    float4 screenPos    : TEXCOORD2;
                };

                v2f vert (appdata_full v)
                {
                    v2f o;
                    o.pos = mul(UNITY_MATRIX_MVP, v.vertex);   
                    #if UNITY_UV_STARTS_AT_TOP
                    float scale = -1.0;
                    #else
                    float scale = 1.0;
                    #endif
                    o.uvgrab.xy = (float2(o.pos.x, o.pos.y * scale) + o.pos.w) * 0.5;
                    o.uvgrab.zw = o.pos.zw;
                    o.uv = v.texcoord.xy;
                    return o;
                }

                sampler2D _HeightMap;
                sampler2D _MaskMap;
                float _EffectSpeed, _EffectSpeed2, _Strength;
                //sampler2D _GrabTexture;
                sampler2D _waterTex1;
                float4 _GrabTexture_TexelSize;

                half4 frag( v2f i ) : COLOR
                {

                    float2 effectUVs = i.uv;
                    //effectUVs.y += _Time;// * _EffectSpeed;
                    float3 normal1 = UnpackNormal(tex2D(_HeightMap, effectUVs));
                    effectUVs = i.uv;
                    //effectUVs.x *= -1;
                    //effectUVs.y += 0.3 + _Time;// * _EffectSpeed2;
                    float3 normal2 = UnpackNormal(tex2D(_HeightMap, effectUVs));
                    half3 MTex = tex2D(_MaskMap, effectUVs);
                    
                    normal2 *= float3(-10, -10, 0.5); //1,1,0.75

                    float3 combinedNormal = normalize(normal1 * normal2);

                    float2 offset = combinedNormal.xy * _Strength * _GrabTexture_TexelSize.xy * 1.25;  //5
                    i.uvgrab.xy = (offset * i.uvgrab.z) + i.uvgrab.xy;
                    half3 FCol = half3(tex2Dproj(_waterTex1, UNITY_PROJ_COORD(i.uvgrab)).rgb);
                    return half4(FCol*1.04,MTex.r*1.5);

                }
            ENDCG
        }

        
        
        
        
        
        
        
// TOP EFFECT RENDER 
Tags {"Queue"= "Transparent+650" "IgnoreProjector"="True"}
Cull Off
ZWrite Off
Blend SrcAlpha OneMinusSrcAlpha
Lighting Off

CGPROGRAM
#pragma surface surf Lambert

sampler2D _HeightMap;

struct Input {
	float2 uv_HeightMap;
};


void surf (Input IN, inout SurfaceOutput o) {
	o.Gloss = 0.0;
	o.Specular = 0.0;
	o.Albedo = float3(0.0,0.0,0.0);
	o.Alpha = 0.0;
}
ENDCG


      
                

}

FallBack ""
}
