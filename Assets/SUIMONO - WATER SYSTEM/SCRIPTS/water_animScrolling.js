#pragma strict

//PUBLIC VARIABLES
var flow_speed : Vector2 = Vector2(0.0015,0.0015);
var wave_speed : Vector2 = Vector2(0.0015,0.0015);
var foam_speed : Vector2 = Vector2(-0.02,-0.02);
var waterForce : Vector2 = Vector2(0.0,0.0);


//PRIVATE VARIABLES
private var animationSpeed : float = 1.0;
private var m_fFlowMapOffset0 : float = 0.0f;
private var m_fFlowMapOffset1 : float = 0.0f;
private var m_fFlowSpeed : float = 0.05f;
private var m_fCycle : float = 1.0f;
private var m_fWaveMapScale : float = 2.0f;

function Start () {
}




function Update () {

//get MASTER animation Speed
animationSpeed = renderer.material.GetFloat("_AnimSpeed");
animationSpeed=Mathf.Clamp(animationSpeed,0.0,1.0);

//set speed limits
wave_speed.x = Mathf.Clamp(wave_speed.x,-0.5,0.5);
wave_speed.y = Mathf.Clamp(wave_speed.y,-0.5,0.5);
flow_speed.x = Mathf.Clamp(flow_speed.x,-0.5,0.5);
flow_speed.y = Mathf.Clamp(flow_speed.y,-0.5,0.5);
foam_speed.x = Mathf.Clamp(foam_speed.x,-0.5,0.5);
foam_speed.y = Mathf.Clamp(foam_speed.y,-0.5,0.5);


//assign speed to shader
renderer.material.SetTextureOffset("_HeightMap",Vector2(flow_speed.x*Time.time*animationSpeed,flow_speed.y*Time.time*animationSpeed));
renderer.material.SetTextureOffset("_HeightMap2",Vector2(wave_speed.x*Time.time*animationSpeed,wave_speed.y*Time.time*animationSpeed));
renderer.material.SetTextureOffset("_FoamTex",Vector2(foam_speed.x*Time.time*animationSpeed,foam_speed.y*Time.time*animationSpeed));
renderer.material.SetTextureOffset("_FoamTex",Vector2(foam_speed.x*Time.time*animationSpeed,foam_speed.y*Time.time*animationSpeed));


}