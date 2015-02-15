using UnityEngine;
using System.Collections;
using XInputDotNetPure;

[ExecuteInEditMode]
[RequireComponent (typeof (SphereCollider))]
public class Discovery : MonoBehaviour {

	public string name;
	public string description;
	public float radius;
	private SphereCollider collider;

	// Use this for initialization
	void Start () {
		collider = this.gameObject.GetComponent<SphereCollider>();
	}
	
	// Update is called once per frame
	void Update () {
		if (Application.isPlaying) {

		}
		else {
			collider.radius = radius;
		}
	}

	void OnDrawGizmos() {
		// collider.radius = radius;
		Gizmos.color = Color.blue;
		Gizmos.matrix = transform.localToWorldMatrix;
		Gizmos.DrawWireSphere(Vector3.zero, radius);
	}

	// the distance from the center of this discover object
	// to the given coordinates
	float Dist(float x, float z)
	{
		float xdist = x - this.gameObject.transform.position.x;
		float zdist = z - this.gameObject.transform.position.z;

		// warning: this is a costly computation
		return Mathf.Sqrt(xdist * xdist + zdist * zdist);
	}

	void OnTriggerExit(Collider other) {
		GamePad.SetVibration (0, 0, 0);
	}

	void OnTriggerEnter(Collider other) {
		Vector3.Distance (other.transform.position, this.transform.position);
	}

	void OnTriggerStay(Collider other)
	{
		float dist = Dist(other.transform.position.x, other.transform.position.z);
		float vibAmt = (radius - dist) / radius;
		GamePad.SetVibration (0, vibAmt, vibAmt);
	}
}
