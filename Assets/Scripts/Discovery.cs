using UnityEngine;
using System.Collections;
using UnityEngine.UI;

public class Discovery : MonoBehaviour {

	private bool spent = false;

	private Vibration vibe;

	public string name;
	public string text;
	public Animation animation;
	public float hopeAmt;
	public int level;

	private World world;
	private PlayerStats ps;
	private Canvas can;
	private Text nameDisplay;
	private Text dialogDisplay;

	// Use this for initialization
	void Start () {
		vibe = GetComponentInChildren<Vibration> ();

		world = FindObjectOfType<World> ();
		ps = FindObjectOfType<PlayerStats> ();
		
		can = FindObjectOfType<Canvas> ();
		Text[] tmp = can.GetComponentsInChildren<Text> ();
		for (int i = 0; i<tmp.Length; i++) {
			if (tmp[i].name == "nameText")
				nameDisplay = tmp[i];
			if (tmp[i].name == "displayText")
				dialogDisplay = tmp[i];
		}

		clearDialog ();
		world.AddHope (level, hopeAmt);
	}


	void OnTriggerStay(Collider other){
		if (Input.GetButtonDown ("Interact") && !spent) {
			spent = true;
			vibe.KillVibration ();
			ps.AddHope(hopeAmt);


			nameDisplay.text = name;
			dialogDisplay.text = text;

			animation.Play();
		}
	}

	void OnTriggerLeave(Collider coll) {
		if (animation.isPlaying) {
			animation.Stop();

		}
		clearDialog();
	}

	// clears the dialog box text
	void clearDialog(){
		nameDisplay.text = "";
		dialogDisplay.text = "";
	}


	// Update is called once per frame
	void Update () {
	
	}
}
