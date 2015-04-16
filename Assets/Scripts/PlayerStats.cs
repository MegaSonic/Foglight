using UnityEngine;
using System.Collections;
using System.Collections.Generic;

public class PlayerStats : MonoBehaviour {

	private float collectedHope;
	private HashSet<string> unlockedFlags;
	
	// Use this for initialization
	void Start () {
		collectedHope = 0;
		unlockedFlags = new HashSet<string> ();
	}

	// Adds given hope amount to player
	public void AddHope(float amt){
		collectedHope += amt;
	}

	public float GetHope(){
		return collectedHope;
	}

	public bool flagUnlocked(string flag){
		return unlockedFlags.Contains (flag);
	}

	public void unlockFlag(string flag){
		unlockedFlags.Add (flag);
	}

	// super secret developer key for adding hope
	void Update()
	{
		if (Input.GetKeyDown("9") && Input.GetKeyDown (";"))
		{
			AddHope (1f);
		}
	}

}
