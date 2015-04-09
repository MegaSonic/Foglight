using UnityEngine;
using System.Collections;

public class RotationControl : MonoBehaviour {

	public float distance;
	public float height;
	public float runDistance;
	public float runHeight;
	public float lookDownHeight;
	public float lookUpHeight;
	public float manualRotateSpeed; // speed of joystick rotation

	private Transform target;
	private SmoothFollow_eli camScript;
	
	// Use this for initialization
	void Awake () {
		target = this.transform;
		camScript = Camera.main.GetComponent<SmoothFollow_eli>();

		camScript.distance = distance;
		camScript.height = height;

	}
	
	// Update is called once per frame
	void Update () {

		//// rotate the player manually ////
		float camH = Input.GetAxis ("CamHorizontal");
		float camV = Input.GetAxis ("CamVertical");
		float H = Input.GetAxis ("Horizontal");

		if (Mathf.Abs (camH) > 0.1f || Mathf.Abs (H) > 0.1f) {						

			target.RotateAround(target.position, Vector3.up, (camH+H) * manualRotateSpeed);
		}
		
		//// Alter the script on the camera ////

		// adjust distance and height of target based upon whether player is running
		if (Input.GetButton ("Run")) 
		{
			camScript.distance = runDistance;
			camScript.height = runHeight;
		}
		else
		{
			camScript.distance = distance;
			camScript.height = height;
		}
		
		// make further adjustments based upon vertical camera joystick input
		
		// look up - move forward and down
		if (camV < -0.1f) 
		{	
			camScript.height += lookUpHeight * camV;
		}
		// look down - move back and up
		else if (camV > 0.1f) 
		{	
			camScript.height += lookDownHeight * camV;
		}
	}
}
