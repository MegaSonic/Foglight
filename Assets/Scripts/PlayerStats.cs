using UnityEngine;
using System.Collections;

public class PlayerStats : MonoBehaviour {

	private float collectedHope;
	
	// Use this for initialization
	void Start () {
		collectedHope = 0;
	}

	// Adds given hope amount to player
	public void AddHope(float amt){
		collectedHope += amt;
	}

	public float GetHope(){
		return collectedHope;
	}
}
