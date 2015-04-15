Shader "Suimono/caustic_projection" {
   Properties {
   	  _Color ("Main Color", Color) = (1,1,1,1)
      _ShadowTex ("Project Texture", 2D) = "" {}
      _FalloffTex ("FallOff Mask", 2D) = "" { TexGen ObjectLinear }
   }
   Subshader {
      Pass {
         ZWrite off
         Fog {Mode Off}
         ColorMask RGB

         Blend DstColor One

         SetTexture [_ShadowTex] {
        	constantColor [_Color]
            combine constant lerp(texture) previous
         }
         SetTexture [_ShadowTex] {
        	constantColor [_Color]
            combine constant lerp(texture) previous
         }
         SetTexture [_ShadowTex] {
        	constantColor [_Color]
            combine constant lerp(texture) previous
         }
         SetTexture [_FalloffTex] {
            constantColor (0,0,0,0)
            combine previous lerp (texture) constant
            Matrix [_ProjectorClip]
         }
      }
   }
}