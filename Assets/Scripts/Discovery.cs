using UnityEngine;
using System.Collections;

public class Discovery : MonoBehaviour {

	private bool spent = false;

	private Vibration vibe;


	// Use this for initialization
	void Start () {
		vibe = GetComponentInChildren<Vibration> ();
	}


	void OnTriggerStay(Collider other){
		if (Input.GetButtonDown ("Interact") && !spent) {
			spent = true;
			vibe.KillVibration ();
		}
	}


	// Update is called once per frame
	void Update () {
	
	}
}
