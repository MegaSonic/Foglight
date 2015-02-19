using UnityEngine;
using System.Collections;

public class Statue : MonoBehaviour {

	public float hopeAmt;
	public int square; // what square is this statue in?

	private World world;

	// Use this for initialization
	void Start () {
		world = FindObjectOfType<World> ();

		// add this statue's hope to the hope counter
		world.availableHope [square - 1] += hopeAmt;

	}
	
	// Update is called once per frame
	void Update () {
	
	}
}
