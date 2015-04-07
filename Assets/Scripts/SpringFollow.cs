using UnityEngine;
using System.Collections;

public class SpringFollow : MonoBehaviour {

	// The target we are following
	public Transform target;
	public float height;
	public float heightDamping;
	public float springyness;

	
	private Vector3 speed;
	private float targetHeight;
	private float originalHeight;

	// Use this for initialization
	void Start () {
		targetHeight = height;
	}
	
	// Update is called once per frame
	void Update () {
		//speed = Vector3.Lerp (speed, target.position-this.transform.position, springyness * Time.deltaTime);
		//this.transform.position += speed;

		targetHeight = Mathf.Lerp (targetHeight, height, heightDamping * Time.deltaTime);

		Vector3 followLoc = target.position;
		followLoc.y += targetHeight;
		this.transform.position = followLoc;
	}
}
