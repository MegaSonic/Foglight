using UnityEngine;
using System.Collections;

public class CameraController : MonoBehaviour {


	public float distance;
	public float height;
	public float manualRotateSpeed; // speed of joystick rotation
	public float moveSpeed;
	public float rotateSpeed; // speed of automatic rotation


	private Transform cam;
	private Transform target;

	private bool inputLastPressed = false; // true when movement input was more recent than rotation input


	// Use this for initialization
	void Awake () {
		cam = Camera.main.transform;
		target = this.transform;
	}
	
	// Update is called once per frame
	void Update () {

		// rotate the camera around the player
		if (Mathf.Abs (Input.GetAxis ("CamHorizontal")) > 0.1f) {						
			inputLastPressed = false;
			cam.RotateAround (target.position, Vector3.up, Input.GetAxis ("CamHorizontal") * manualRotateSpeed);
		}
		//if (Input.GetAxis ("CamVertical")) {	}


		// set bool and rotate player to match camera rotation
		else if (Mathf.Abs (Input.GetAxis ("Horizontal")) > 0.1f ||
				 Mathf.Abs (Input.GetAxis ("Vertical")) > 0.1f) {
			inputLastPressed = true;
			target.rotation = cam.rotation;
		}

		// smoothly move camera behind player
		if (inputLastPressed) {
			var targetRotation = Quaternion.LookRotation(target.position - cam.position);
			cam.rotation = Quaternion.Slerp(cam.rotation, targetRotation, rotateSpeed * Time.deltaTime);

			Vector3 targetPosition = target.forward * -distance;
			targetPosition.x += target.position.x;
			targetPosition.z += target.position.z;
			targetPosition.y = height;

			cam.position = Vector3.Lerp (cam.position, targetPosition, moveSpeed * Time.deltaTime);
			//cam.position = Vector3.Lerp (cam.position, new Vector3 (target.position.x, cam.position.y, target.position.z - distance), speed * Time.deltaTime);	
		}
	}
}
