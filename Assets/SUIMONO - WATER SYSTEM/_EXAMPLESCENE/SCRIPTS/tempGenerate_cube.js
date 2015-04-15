//Define variables
var generateObject : Transform;

private var parentobj : GameObject;


function Start () {

parentobj = GameObject.Find("BOXES");

}





		



										
																				
																																								
function Update(){


if (Input.GetButtonDown("Jump")){
	if (generateObject != null){
		var startPos : Vector3 = this.transform.position;
		startPos.y += 3.5;
		var generateObject = Instantiate(generateObject, startPos, Quaternion.identity);
		generateObject.transform.parent = parentobj.transform;
		generateObject.rigidbody.AddForce((this.transform.forward*10.0), ForceMode.Force);
	}
}
		
		
		

	
}


