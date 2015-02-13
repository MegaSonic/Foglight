using UnityEngine;
using System.Collections;

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

	void OnTriggerEnter(Collider other) {
		Vector3.Distance (other.transform.position, this.transform.position);
	}
}
