using UnityEngine;
using System.Collections;

public class SpringFollow : MonoBehaviour {

	// The target we are following
	public Transform target;
	public float height;
	public float springyness;
	
	private Vector3 speed;

	// Use this for initialization
	void Start () {

	}
	
	// Update is called once per frame
	void Update () {
		//speed = Vector3.Lerp (speed, target.position-this.transform.position, springyness * Time.deltaTime);
		//this.transform.position += speed;
		Vector3 followLoc = target.position;
		followLoc.y += height;
		this.transform.position = followLoc;
	}
}
