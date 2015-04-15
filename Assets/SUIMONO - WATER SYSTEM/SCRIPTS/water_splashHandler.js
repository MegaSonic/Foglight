
//PUBLIC VARIABLES
var splashIsOn : boolean = true;
var UpdateSpeed : float = 0.5;
var rippleSensitivity : float = 0.0;
var splashSensitivity :float = 0.2;


//PRIVATE VARIABLES
private var isinwater : boolean = false;
private var atDepth : float = 0.0;

private var splash_rings : Transform;
private var splash_small : Transform;
private var splash_med : Transform;
private var splash_dirt : Transform;
private var splash_drops : Transform;

private var isPlayingTimer = 0.0;

private var playerObject : Transform;

private var setvolumetarget = 0.65;
private var setvolume = 0.65;

private var ringsTime = 0.0;

private var objectRingsTime = new Array();
private var CurrentColliders = new Array();
private var soundskip = 0;

function Start(){
}



function Update(){

//advance default rings timer
ringsTime += Time.deltaTime;

//populate & advance custom ringsTimer
for (var cx = 0; cx < CurrentColliders.length; cx++){
	objectRingsTime[cx] += Time.deltaTime;
}

if (splashIsOn){
	CallCollisionFunction();
}

}






function CallCollisionFunction(){
	//var hitVeloc : float = 0.0;// : Vector3 = Vector3(0.0,0.0,0.0);
	
	for (cx = 0; cx < CurrentColliders.length; cx++){
		var ckSpeed = UpdateSpeed;
		if (CurrentColliders[cx] == null){
			CurrentColliders.RemoveAt(cx);
		} else {
		
			//get optional parameters
			var alwaysEmit : boolean = false;
			var addSize : float = 0.17;
			var addRot : float = Random.Range(0.0,359.0);
			
			var hitVeloc = CurrentColliders[cx].gameObject.rigidbody.velocity;
			
			//calculate rotation
			if (Mathf.Abs(hitVeloc.x) >= rippleSensitivity || Mathf.Abs(hitVeloc.z) >= rippleSensitivity){
				var tempPointer : GameObject;
				var tempDetector : GameObject;
				tempPointer = new GameObject ("tempPointer");
				tempDetector = new GameObject ("tempDetector");
					
				tempPointer.transform.position = CurrentColliders[cx].transform.position + (CurrentColliders[cx].transform.rigidbody.velocity*10.0);
				tempDetector.transform.position = CurrentColliders[cx].transform.position;
				tempDetector.transform.LookAt(tempPointer.transform.position);
				addRot = tempDetector.transform.eulerAngles.y+40.0;
				if (Mathf.Abs(hitVeloc.x) > 2.4 || Mathf.Abs(hitVeloc.z) > 2.4){
					//ckSpeed = UpdateSpeed*0.5;
				}
				
				gameObject.Destroy(tempPointer);
				gameObject.Destroy(tempDetector);
			}
				
				
			if (CurrentColliders[cx].gameObject.GetComponent(object_splashEffects) != null){
				ckSpeed = CurrentColliders[cx].gameObject.GetComponent(object_splashEffects).splashRingsTimer;
				addSize = CurrentColliders[cx].gameObject.GetComponent(object_splashEffects).splashRingsSize;
				if (CurrentColliders[cx].gameObject.GetComponent(object_splashEffects).splashRingsRotation != 0.0){
					addRot = CurrentColliders[cx].gameObject.GetComponent(object_splashEffects).splashRingsRotation;
				}
				if (CurrentColliders[cx].gameObject.GetComponent(object_splashEffects).alwaysEmitRipples || transform.parent.gameObject.GetComponent(waterModule_splashEffects).alwaysEmitRipples){
					alwaysEmit = true;
				}
				
			}
			if (objectRingsTime[cx] > ckSpeed){
				objectRingsTime[cx] = 0.0;
				var checkColl : Collider = CurrentColliders[cx];
				var collsetpos : Vector3 = checkColl.transform.position;
				collsetpos.y = this.transform.position.y+0.01;
				
				var sizeScale : float = CurrentColliders[cx].gameObject.transform.localScale.x;
				

				//init splash ring effect
				if (Mathf.Abs(hitVeloc.x) >= rippleSensitivity || Mathf.Abs(hitVeloc.z ) >= rippleSensitivity){
					transform.parent.gameObject.GetComponent(waterModule_splashEffects).AddEffect("rings",collsetpos,1,addSize*sizeScale,addRot);
				} else {
					if (alwaysEmit){
					transform.parent.gameObject.GetComponent(waterModule_splashEffects).AddEffect("rings",collsetpos,1,addSize*sizeScale,addRot);
					}
				}
				
				//check for movement and init splash effects
				if (Mathf.Abs(hitVeloc.x) >= splashSensitivity || Mathf.Abs(hitVeloc.z) >= splashSensitivity){
					transform.parent.gameObject.GetComponent(waterModule_splashEffects).AddEffect("ringfoam",collsetpos,1,addSize*(sizeScale*0.5),addRot);
					transform.parent.gameObject.GetComponent(waterModule_splashEffects).AddEffect("splash",collsetpos,10,addSize*sizeScale,addRot);
					transform.parent.gameObject.GetComponent(waterModule_splashEffects).AddEffect("splashDrop",collsetpos,40,addSize,0.0);
				
				//add sound
						transform.parent.gameObject.GetComponent(waterModule_splashEffects).AddSound("splash",collsetpos,hitVeloc);
				}

			}
		}
	}
	
}





function OnTriggerEnter(other : Collider) {

	CurrentColliders.Add(other);
	objectRingsTime.Add(0.0);
			
					
}

function OnTriggerStay  (other : Collider) {
	isinwater = true;
	atDepth = this.gameObject.transform.position.y - other.gameObject.transform.position.y ;
}

function OnTriggerExit  (other : Collider) {
	CurrentColliders.Remove(other);	
}














