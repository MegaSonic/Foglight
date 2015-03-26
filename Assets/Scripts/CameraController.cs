using UnityEngine;
using System.Collections;

public class CameraController : MonoBehaviour {


	public float distance;
	public float height;
	public float runDistance;
	public float runHeight;
	public float lookDownHeight;
	public float lookDownDistance;
	public float lookUpHeight;
	public float lookUpDistance;
	public float manualRotateSpeed; // speed of joystick rotation
	public float moveSpeed;
	public float rotateSpeed; // speed of automatic rotation


	private Transform cam;
	private Transform target;

	// Use this for initialization
	void Awake () {
		cam = Camera.main.transform;
		target = this.transform;
	}
	
	// Update is called once per frame
	void Update () {

		
		
		//// rotate the camera around the player manually ////
		
		if (Mathf.Abs (Input.GetAxis ("CamHorizontal")) > 0.1f) {						
			cam.RotateAround (target.position, Vector3.up, Input.GetAxis ("CamHorizontal") * manualRotateSpeed);
			// rotate player to match camera rotation		
			// maybe we want to be able to see the front of it sometimes though?
			target.LookAt (cam.position);
			target.RotateAround(target.position, Vector3.up, 180f);
		}

		//// Rotate gradually to face the player ////	
		else
		{
			var targetRotation = Quaternion.LookRotation(target.position - cam.position);
			cam.rotation = Quaternion.Slerp(cam.rotation, targetRotation, rotateSpeed * Time.deltaTime);
		}

		//// Move gradually toward player ////

		// start by setting target position to player's
		Vector3 targetPosition = target.position;

		// adjust distance and height of target based upon whether player is running
		if (Input.GetButton ("Run")) 
		{
			targetPosition += target.forward * -runDistance;
			targetPosition.y += runHeight;
		}
		else
		{
			targetPosition += target.forward * -distance;
			targetPosition.y += height;
		}

		// make further adjustments based upon vertical camera joystick input

		// look up - move forward and down
		if (Input.GetAxis ("CamVertical") < -0.1f) 
		{	
			targetPosition.y += lookUpHeight * Input.GetAxis ("CamVertical");
			targetPosition += target.forward * -lookUpDistance * Input.GetAxis ("CamVertical");
			// rotate up a bit more
			//var upRotation = Quaternion.LookRotation(target.up, target.up);
			Vector3 adjTarget = target.position;
			adjTarget.y += lookUpHeight;
			var newTargetRotation = Quaternion.LookRotation(adjTarget - cam.position);
			cam.rotation = Quaternion.Slerp(cam.rotation, newTargetRotation, rotateSpeed * Time.deltaTime);

		}
		// look down - move back and up
		else if (Input.GetAxis ("CamVertical") > 0.1f) 
		{	
			targetPosition.y += lookDownHeight * Input.GetAxis ("CamVertical");
			targetPosition += target.forward * -lookDownDistance * Input.GetAxis ("CamVertical");

		}

		// do the actual moving
		cam.position = Vector3.Lerp (cam.position, targetPosition, moveSpeed * Time.deltaTime);

	}
}
