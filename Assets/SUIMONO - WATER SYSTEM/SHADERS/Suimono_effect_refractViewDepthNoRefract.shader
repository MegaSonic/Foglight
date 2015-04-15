Shader "Suimono/effect_refractionViewDepthNoRefract" {
Properties {
	_HeightMap ("HeightMap (RGB)", 2D) = "black" {}
	_DepthColor ("Depth Color", Color) = (0.5, 0.5, 0.5, 1)
    _DepthAmt ("Depth Amount", range (0.001,0.03)) = 0.012
    _Strength ("Refraction Strength", range (0,25)) = 25.0
    _EffectSpeed ("Effect Speed 1", Range (0, 0.5)) = 0.5
	_EffectSpeed2 ("Effect Speed 2", Range (0, 0.5)) = 0.37
}



SubShader {



	
		
		
		//RENDER DEPTH
        Pass{
			Tags {"Queue"= "Transparent+596" "IgnoreProjector"="True"} //+595
			Cull off
			Blend SrcAlpha OneMinusSrcAlpha
			Cull Off
            Name "ScreenDistortion"

            ZWrite Off
             
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
                    //float4 proj 		: TEXCOORD3;
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
                    
					o.uvgrab.z +=63;
					COMPUTE_EYEDEPTH(o.uvgrab.z);
	
                    return o;
                }
                
				sampler2D _ScreenTex6;
				sampler2D _CameraDepthTexture;
                sampler2D _HeightMap;
                float _EffectSpeed, _EffectSpeed2, _Strength;
                sampler2D _ScreenTex5;
                float4 _GrabTexture_TexelSize;
				float4 _DepthColor;
				float _DepthAmt;
				
                half4 frag( v2f i ) : COLOR
                {

                   // float2 effectUVs = i.uv;
                    //effectUVs.y += _Time * _EffectSpeed;
                    //float3 normal1 = UnpackNormal(tex2D(_HeightMap, effectUVs));
                   // effectUVs = i.uv;
                    //effectUVs.x *= -1;
                    //effectUVs.y += 0.3 + _Time * _EffectSpeed2;
                   // float3 normal2 = UnpackNormal(tex2D(_HeightMap, effectUVs));
                   // normal2 *= float3(-10, -10, 0.5); //1,1,0.75
					
                    //float3 combinedNormal = normalize(normal1 * normal2);

                   // float2 offset = combinedNormal.xy * _Strength * _GrabTexture_TexelSize.xy;  //5
                    //i.uvgrab.xy = ((offset * i.uvgrab.z) + i.uvgrab.xy)*1.0;
                    
                    
                    //float4 depthPass = tex2Dproj(_ScreenTex6, UNITY_PROJ_COORD(i.uvgrab));
					float depth = tex2Dproj(_CameraDepthTexture, UNITY_PROJ_COORD(i.uvgrab)).r;
					depth = LinearEyeDepth(depth)*_DepthAmt;
					if (depth > 1.0){
						depth = 1.0;
					}
					if (depth < 0.0){
						depth = 0.0;
					}
	
	
					//half4 tex = half4(tex2Dproj(_ScreenTex6, UNITY_PROJ_COORD(i.uvgrab)).rgb, 1.0);
					//tex.rgb = _DepthColor.rgb;
					//half3 tex = lerp(half3(1.0,1.0,1.0), _DepthColor.rgb, 0.0);
					//tex *= 1.5 * _DepthColor.a;
					//if (tex.r < 0.1) tex.r=0.1;
					//if (tex.g < 0.1) tex.g=0.1;
					//if (tex.b < 0.1) tex.b=0.1;
					half3 tex = _DepthColor.rgb;
					float cAlpha = depth * 0.65;//depth * 0.5;
					
					half4 rCol = half4(tex,cAlpha);
                    return rCol;
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
