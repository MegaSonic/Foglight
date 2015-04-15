#pragma strict

//PUBLIC VARIABLES
var inheritColor : boolean = true;

var wave_speed : Vector2 = Vector2(0.0015,0.0015);
var foam_speed : Vector2 = Vector2(-0.02,-0.02);


//PRIVATE VARIABLES
private var animationSpeed : float = 1.0;
private var systemSpeed : float = 1.0;
private var m_fFlowMapOffset0 : float = 0.0f;
private var m_fFlowMapOffset1 : float = 0.0f;
private var m_fFlowSpeed : float = 0.05f;
private var m_fCycle : float = 1.0f;
private var m_fWaveMapScale : float = 2.0f;

function Start () {
}



function Update () {

//get MASTER animation Speed
systemSpeed = transform.parent.GetComponent.<Renderer>().material.GetFloat("_AnimSpeed");
animationSpeed = GetComponent.<Renderer>().material.GetFloat("_AnimSpeed")*systemSpeed;
animationSpeed=Mathf.Clamp(animationSpeed,0.0,1.0);

//set speed limits
wave_speed.x = Mathf.Clamp(wave_speed.x,-0.5,0.5);
wave_speed.y = Mathf.Clamp(wave_speed.y,-0.5,0.5);
foam_speed.x = Mathf.Clamp(foam_speed.x,-0.5,0.5);
foam_speed.y = Mathf.Clamp(foam_speed.y,-0.5,0.5);


//assign speed to shader
GetComponent.<Renderer>().material.SetTextureOffset("_HeightMap",Vector2(wave_speed.x*Time.time*animationSpeed,wave_speed.y*Time.time*animationSpeed));

GetComponent.<Renderer>().material.SetTextureOffset("_WaveTex",Vector2(wave_speed.x*Time.time*animationSpeed,wave_speed.y*Time.time*animationSpeed));
GetComponent.<Renderer>().material.SetTextureOffset("_WaveTex",Vector2(wave_speed.x*Time.time*animationSpeed,wave_speed.y*Time.time*animationSpeed));

GetComponent.<Renderer>().material.SetTextureOffset("_FoamTex",Vector2(foam_speed.x*Time.time*animationSpeed,foam_speed.y*Time.time*animationSpeed));
GetComponent.<Renderer>().material.SetTextureOffset("_FoamTex",Vector2(foam_speed.x*Time.time*animationSpeed,foam_speed.y*Time.time*animationSpeed));



//AssignWaveColor
if (inheritColor){
	var wCol : Color = transform.parent.GetComponent.<Renderer>().material.GetColor("_SurfaceColor") * 1.2;
	wCol.a = 1.0;
	GetComponent.<Renderer>().material.SetColor("_WaveColor",wCol);
}

}