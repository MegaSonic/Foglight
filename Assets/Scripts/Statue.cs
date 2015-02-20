using UnityEngine;
using System.Collections;

public class Statue : MonoBehaviour {

	public float hopeAmt;
	public int level; // what square is this statue in?

	private bool spent = false;

	private World world;
	private PlayerStats ps;

	// Use this for initialization
	void Start () {
		world = FindObjectOfType<World> ();
		ps = FindObjectOfType<PlayerStats> ();

		// add this statue's hope to the hope counter
		world.AddHope (level, hopeAmt);

	}
	
	void OnTriggerStay(Collider other){
		//if (Input.GetKey ("Interact")){
			if (!spent) {
				spent = true;
				ps.AddHope(hopeAmt);
			}
		//}
	}

	// Update is called once per frame
	void Update () {
	
	}
}
