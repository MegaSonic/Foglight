//Define variables
var buoyancyFactor = 1.0;
var buoyancyOffset = 0.0;
var underwaterMass = 1.0;
var underwaterDrag = 4.0;
var underwaterADrag = 1.0;
var keepAwake : boolean = false;

//Define private variables
private var underwaterLevel = 0.0;
private var origMass = 0.0;
private var origDrag = 0.0;
private var origADrag = 0.0;

private var waterForce : Vector2 = Vector2(0.0,0.0);
static var isUnderwater : boolean = false;





function Start () {
	origMass = this.rigidbody.mass;
	origDrag = this.rigidbody.drag;
	origADrag = this.rigidbody.angularDrag;

}




																		
																																																						
																																								
function Update(){


if (keepAwake){
	if (this.rigidbody.IsSleeping == true){
		this.rigidbody.WakeUp();
		this.rigidbody.AddForce(-Vector3.up*2.0,ForceMode.Force);
		this.rigidbody.useGravity = true;
	}
}


//Check for underwater
	isUnderwater = false;
	var layer : int = 4;
	var layermask : int = 1 << layer;
	var hit : RaycastHit;
	var testpos : Vector3 = Vector3(this.transform.position.x,this.transform.position.y+5000.0,this.transform.position.z);
	if (Physics.Raycast (testpos, -Vector3.up, hit,10000,layermask)) {
		if (hit.transform.gameObject.layer==4){ //hits object on water layer	
			underwaterLevel = hit.transform.position.y + buoyancyOffset;
				if (this.transform.position.y < (underwaterLevel)) {
					isUnderwater = true;
				}
			if (hit.transform.gameObject.GetComponent(water_animScrolling) != null){
				waterForce = hit.transform.gameObject.GetComponent(water_animScrolling).waterForce;
			}
		}
	}
		
		
		
		
		

	if (this.rigidbody.mass < 0.1) this.rigidbody.mass = 0.1;
	
	if (isUnderwater){
		
		if (buoyancyFactor > 0.0){
			this.rigidbody.useGravity = false;
			this.rigidbody.AddForce((Vector3.up*buoyancyFactor),ForceMode.Acceleration);
		}
		this.rigidbody.mass = underwaterMass;
		this.rigidbody.drag = underwaterDrag;
		this.rigidbody.angularDrag = underwaterADrag;
		
		//apply water force if applicable
		if (waterForce.x != 0.0 || waterForce.y != 0.0){
			waterForce.x = Random.Range(waterForce.x,(waterForce.x*0.75));
			waterForce.y = Random.Range(waterForce.y,(waterForce.y*0.75));
			this.rigidbody.AddForce(Vector3(waterForce.x,0.0,waterForce.y),ForceMode.Force);
		}
		

	} else {
		this.rigidbody.useGravity = true;
		
		this.rigidbody.mass = origMass;
		this.rigidbody.drag = origDrag;
		this.rigidbody.angularDrag = origADrag;

		
	}
	
}