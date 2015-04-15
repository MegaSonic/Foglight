
var alwaysEmitRipples : boolean = false;
var maxEmission = 5000;
var playSounds : boolean = true;
var maxVolume = 1.0;
var maxSounds = 10;
var defaultSplashSound : AudioClip[];
var soundObject : Transform;


//var splashPrefab1 : Transform;
//var splashPrefab2Med : Transform;
//var splashRingsPrefab1 : Transform;
//var splashdirtPrefab1 : Transform;
//var splashdropsPrefab1 : Transform;

private var isinwater : boolean = false;
private var atDepth : float = 0.0;

private var splash_rings : Transform;
private var splash_small : Transform;
private var splash_med : Transform;
private var splash_dirt : Transform;
private var splash_drops : Transform;

private var isPlayingTimer = 0.0;

private var setvolumetarget = 0.65;
private var setvolume = 0.65;

private var ringsSystem : ParticleSystem;
private var ringsParticles : ParticleSystem.Particle[];
private var ringsParticlesNum : int = 1;

private var ringFoamSystem : ParticleSystem;
private var ringFoamParticles : ParticleSystem.Particle[];
private var ringFoamParticlesNum : int = 1;

private var splashSystem : ParticleSystem;
private var splashParticles : ParticleSystem.Particle[];
private var splashParticlesNum : int = 1;

private var splashDropSystem : ParticleSystem;
private var splashDropParticles : ParticleSystem.Particle[];
private var splashDropParticlesNum : int = 1;


private var sndparentobj : GameObject;
private var sndObjects = new Array();
private var currentSound = 0;

function Start(){

sndparentobj = GameObject.Find("_sound_effects");
ringsSystem = GameObject.Find("splash_rings_normal_prefab").gameObject.GetComponent(ParticleSystem);
ringFoamSystem = GameObject.Find("splash_ringsFoam_prefab").gameObject.GetComponent(ParticleSystem);
splashSystem = GameObject.Find("splash_prefab").gameObject.GetComponent(ParticleSystem);
splashDropSystem = GameObject.Find("splash_droplets_prefab").gameObject.GetComponent(ParticleSystem);


for (var sx=1; sx <= (maxSounds); sx++){
	var soundObjectPrefab = Instantiate(soundObject, transform.position, transform.rotation);
	soundObjectPrefab.transform.parent = sndparentobj.transform;
	sndObjects.Add(soundObjectPrefab);
}
		
		
}









function AddEffect(addMode : String, effectPos : Vector3, addRate : int, addSize : float, addRot : float){

var px = 0;

if (addMode == "rings"){
	ringsSystem.Emit(addRate);
	//get particles
	ringsParticles = new ParticleSystem.Particle[ringsSystem.particleCount];
	ringsSystem.GetParticles(ringsParticles);
	//set particles
	for (px = (ringsSystem.particleCount-addRate); px < ringsSystem.particleCount; px++){
			//set position
			ringsParticles[px].position.x = effectPos.x;
			ringsParticles[px].position.y = effectPos.y;
			ringsParticles[px].position.z = effectPos.z;
			//set variables
			ringsParticles[px].size = addSize;
			ringsParticles[px].rotation = addRot;
	}
	ringsSystem.SetParticles(ringsParticles,ringsParticles.length);
	ringsSystem.Play();
}


if (addMode == "ringfoam"){
	ringFoamSystem.Emit(addRate);
	//get particles
	ringFoamParticles = new ParticleSystem.Particle[ringFoamSystem.particleCount];
	ringFoamSystem.GetParticles(ringFoamParticles);
	//set particles
	for (px = (ringFoamSystem.particleCount-addRate); px < ringFoamSystem.particleCount; px++){
			//set position
			ringFoamParticles[px].position.x = effectPos.x;
			ringFoamParticles[px].position.y = effectPos.y;
			ringFoamParticles[px].position.z = effectPos.z;
			//set variables
			ringFoamParticles[px].size = addSize;
			ringFoamParticles[px].rotation = addRot;
	}
	ringFoamSystem.SetParticles(ringFoamParticles,ringFoamParticles.length);
	ringFoamSystem.Play();
}




if (addMode == "splash"){
	splashSystem.Emit(addRate);
	//get particles
	splashParticles = new ParticleSystem.Particle[splashSystem.particleCount];
	splashSystem.GetParticles(splashParticles);
	//set particles
	for (px = (splashSystem.particleCount-addRate); px < splashSystem.particleCount; px++){
			//set position
			splashParticles[px].position.x = effectPos.x;
			splashParticles[px].position.y = effectPos.y;
			splashParticles[px].position.z = effectPos.z;
	}
	splashSystem.SetParticles(splashParticles,splashParticles.length);
	splashSystem.Play();
}



if (addMode == "splashDrop"){
	splashDropSystem.Emit(addRate);
	//get particles
	splashDropParticles = new ParticleSystem.Particle[splashDropSystem.particleCount];
	splashDropSystem.GetParticles(splashDropParticles);
	//set particles
	for (px = (splashDropSystem.particleCount-addRate); px < splashDropSystem.particleCount; px++){
			//set position
			splashDropParticles[px].position.x = effectPos.x;
			splashDropParticles[px].position.y = effectPos.y;
			splashDropParticles[px].position.z = effectPos.z;
	}
	splashDropSystem.SetParticles(splashDropParticles,splashDropParticles.length);
	splashDropSystem.Play();
}


}








function AddSound(sndMode : String, soundPos : Vector3, sndVelocity:Vector3){


	var setstep : AudioClip;
	
	var setpitch = 1.0;
	var waitTime = 0.4;
	var setvolume = 1.0;
	
	if (playSounds){
	if (defaultSplashSound.length >= 1 ){
		//calculate random sound when applicable)
		setstep = defaultSplashSound[Random.Range(0,defaultSplashSound.length-1)];
		//if (splashSound != null) setstep = splashSound;
		
		waitTime = 0.4;
		setpitch = Random.Range(1.0,1.5);
		setvolume = 0.2;
		
		if (Mathf.Abs(sndVelocity.z) >= setvolume) setvolume = Mathf.Abs(sndVelocity.z);
		if (setvolume > maxVolume) setvolume = maxVolume;
		setvolume = maxVolume;
		
		//var useSound : AudioSource = sndObjects[currentSound];
		//useSound.transform = soundPos;
		if (!sndObjects[currentSound].GetComponent("AudioSource").isPlaying){
			sndObjects[currentSound].transform.position = soundPos;
			sndObjects[currentSound].GetComponent("AudioSource").volume = setvolume;
			sndObjects[currentSound].GetComponent("AudioSource").pitch = setpitch;
			sndObjects[currentSound].GetComponent("AudioSource").minDistance = 4.0;
			sndObjects[currentSound].GetComponent("AudioSource").maxDistance = 20.0;
			sndObjects[currentSound].GetComponent("AudioSource").clip = setstep;
			sndObjects[currentSound].GetComponent("AudioSource").loop = false;
			sndObjects[currentSound].GetComponent("AudioSource").Play();
			//sndObjects[currentSound].GetComponent("AudioSource").PlayOneShot(setstep);
		}
		currentSound += 1;
		if (currentSound >= (maxSounds-1)) currentSound = 0;
		
		
	}
	}





}





