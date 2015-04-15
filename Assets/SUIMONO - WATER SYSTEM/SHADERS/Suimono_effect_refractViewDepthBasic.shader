Shader "Suimono/effect_refractionViewDepthBasic" {
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
                };

                v2f vert (appdata_full v)
                {
                    v2f o;
                    o.pos = mul(UNITY_MATRIX_MVP, v.vertex);   
	
                    return o;
                }
                
				float4 _DepthColor;
				
                half4 frag( v2f i ) : COLOR
                {

					half4 tex = _DepthColor;
					tex.a *= 1.0;
					
					if (tex.a > 0.75) tex.a = 0.75;
								
                    return tex;
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
