using UnityEngine;
using System.Collections;

public class CameraController : MonoBehaviour {


	public float distance;
	public float speed;
	public float height;
	public float angularSmoothLag;
	public float angularMaxSpeed;
	public float clampHeadPositionScreenSpace;

	private Transform cam;
	private Transform target;

	private float angleVelocity = 0;

	// Use this for initialization
	void Awake () {
		cam = Camera.main.transform;
		target = this.transform;


	}
	
	// Update is called once per frame
	void Update () {

		// Calculate the current & target rotation angles
		float originalTargetAngle = target.eulerAngles.y;
		float currentAngle = cam.eulerAngles.y;

		float targetAngle = currentAngle;
		currentAngle = Mathf.SmoothDampAngle(currentAngle, targetAngle, ref angleVelocity, angularSmoothLag, angularMaxSpeed);
		var currentRotation = Quaternion.Euler (0, currentAngle, 0);

		//if (Input.GetAxis ("CamHorizontal")) {		}
		//if (Input.GetAxis ("CamVertical")) {	}

		// Set the position of the camera on the x-z plane to:
		// distance meters behind the target
		cam.position = target.position;
		cam.position += currentRotation * Vector3.back * distance;

		//cam.position = Vector3.Lerp(cam.position, new Vector3(target.position.x, cam.position.y, target.position.z-distance), speed * Time.deltaTime);	

		// Always look at the target	
		SetUpRotation(target.position);
	}

	void SetUpRotation (Vector3 centerPos)
	{
		// Now it's getting hairy. The devil is in the details here, the big issue is jumping of course.
		// * When jumping up and down we don't want to center the guy in screen space.
		//  This is important to give a feel for how high you jump and avoiding large camera movements.
		//   
		// * At the same time we dont want him to ever go out of screen and we want all rotations to be totally smooth.
		//
		// So here is what we will do:
		//
		// 1. We first find the rotation around the y axis. Thus he is always centered on the y-axis
		// 2. When grounded we make him be centered
		// 3. When jumping we keep the camera rotation but rotate the camera to get him back into view if his head is above some threshold
		// 4. When landing we smoothly interpolate towards centering him on screen
		Vector3 cameraPos = cam.position;
		Vector3 offsetToCenter = centerPos - cameraPos;
		
		// Generate base rotation only around y-axis
		var yRotation = Quaternion.LookRotation(new Vector3(offsetToCenter.x, 0, offsetToCenter.z));
		
		var relativeOffset = Vector3.forward * distance + Vector3.down * height;
		cam.rotation = yRotation * Quaternion.LookRotation(relativeOffset);
		
		// Calculate the projected center position and top position in world space
		var centerRay = cam.GetComponent<Camera>().ViewportPointToRay(new Vector3(0.5f, 0.5f, 1));
		var topRay = cam.GetComponent<Camera>().ViewportPointToRay(new Vector3(0.5f, clampHeadPositionScreenSpace, 1));
		
		var centerRayPos = centerRay.GetPoint(distance);
		var topRayPos = topRay.GetPoint(distance);
		
		var centerToTopAngle = Vector3.Angle(centerRay.direction, topRay.direction);
		
		var heightToAngle = centerToTopAngle / (centerRayPos.y - topRayPos.y);
		
		var extraLookAngle = heightToAngle * (centerRayPos.y - centerPos.y);
		if (extraLookAngle < centerToTopAngle)
		{
			extraLookAngle = 0;
		}
		else
		{
			extraLookAngle = extraLookAngle - centerToTopAngle;
			cam.rotation *= Quaternion.Euler(-extraLookAngle, 0, 0);
		}
	}
}
