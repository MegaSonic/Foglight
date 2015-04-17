using UnityEngine;
using System.Collections;
using System.Collections.Generic;

public class World : MonoBehaviour {

	public int amtOfSquares;

	private int unlockedLevels = 1;
	private float[] availableHope;
	private GenerateFogCircle[] fogCircles;
	private int fogIndex;

	//private bool ready;

	// Use this for initialization
	void Awake () {
		availableHope = new float[amtOfSquares];

	}

	void Start() {
		fogCircles = new GenerateFogCircle[10];
		fogIndex = 0;
		GenerateFogCircle[] circles = FindObjectsOfType(typeof(GenerateFogCircle)) as GenerateFogCircle[];

		foreach (GenerateFogCircle circle in circles) {
			fogCircles[fogIndex] = circle;
			fogIndex++;
			if (circle.sectionNumber > 0) {
				circle.gameObject.SetActive(false);
			}
		}

		fogIndex = 0;
	}

	public void UnlockLevel()
	{
		unlockedLevels++;
	}

	// Adds given amt to given level's available hope
	public void AddHope (int level, float amt){
		// availableHope[level-1] += amt; // use this if the level numbering starts with 1
		availableHope[level] += amt; // use this if the level numbering starts with 0
	}

	// Returns the possible amount of hope available in given level
	public float GetHope (int level){
		//return availableHope [level - 1]; // use this if the level numbering starts with 1
		return availableHope [level]; // use this if the level numbering starts with 0
	}

	// Returns the total possible amount of hope
	//   given currently unlocked levels
	public float GetHope () {
		float result = 0;
		for (int i = 0; i<unlockedLevels; i++) {
			//result += GetHope (i + 1); // use this if the level numbering starts with 1
			result += GetHope (i); // use this if the level numbering starts with 0
		}
		return result;
	}


	public void UnlockNextCircle() {
		fogIndex++;
		if (fogCircles[fogIndex] != null)
			fogCircles[fogIndex].gameObject.SetActive(true);

	}

}
