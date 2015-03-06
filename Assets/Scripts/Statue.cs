using UnityEngine;
using System.Collections;
using System.Collections.Generic;
using UnityEngine.UI;

public class Statue : MonoBehaviour {

	public float hopeAmt;
	public int level; // what square is this statue in?
	public List<string> dialog;


	private bool spent = false;

	private World world;
	private PlayerStats ps;
	private Canvas can;
	private Text dialogDisplay;

	// Use this for initialization
	void Start () {
		world = FindObjectOfType<World> ();
		ps = FindObjectOfType<PlayerStats> ();
		can = FindObjectOfType<Canvas> ();
		dialogDisplay = (Text) can.transform.Find ("DialogTest").GetComponent<Text>();

		// add this statue's hope to the hope counter
		world.AddHope (level, hopeAmt);

	}
	
	void OnTriggerStay(Collider other){
		//if (Input.GetKey ("Interact")){
			if (!spent) {
				spent = true;
				ps.AddHope(hopeAmt);
			}
		dialogDisplay.text = dialog [0];


		//}
	}

	// Update is called once per frame
	void Update () {
	
	}
}
