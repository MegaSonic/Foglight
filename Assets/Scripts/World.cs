using UnityEngine;
using System.Collections;

public class World : MonoBehaviour {

	public int amtOfSquares;

	[HideInInspector]
	public float[] availableHope;

	// Use this for initialization
	void Start () {
		availableHope = new float[amtOfSquares];
	}
	
	// Update is called once per frame
	void Update () {
	
	}
}
