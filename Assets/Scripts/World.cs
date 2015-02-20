using UnityEngine;
using System.Collections;

public class World : MonoBehaviour {

	public int amtOfSquares;

	// we'll obvious do this differently
	public int unlockedLevels;

	[HideInInspector]
	private float[] availableHope;

	private bool ready;

	// Use this for initialization
	void Awake () {
		availableHope = new float[amtOfSquares];
	}

	// Adds given amt to given level's available hope
	public void AddHope (int level, float amt){
		availableHope[level-1] += amt;
	}

	// Returns the possible amount of hope available in given level
	public float GetHope (int level){
		return availableHope [level - 1];
	}

	// Returns the total possible amount of hope
	//   given currently unlocked levels
	public float GetHope () {
		float result = 0;
		for (int i = 0; i<unlockedLevels; i++) {
			result += GetHope (i+1);
		}
		return result;
	}

}
