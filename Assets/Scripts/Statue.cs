using UnityEngine;
using System.Collections;
using System.Collections.Generic;
using UnityEngine.UI;

[System.Serializable]
public class Page{
	public string pageText;
	public bool loop;
}


public class Statue : MonoBehaviour {

	public float hopeAmt;
	public int level; // what square is this statue in?
	public string statueName;
	public string promptText;
	public List<Page> dialog;
	
	private bool spent = false;
	private bool looped = false;
	private int page = -1;

	private World world;
	private PlayerStats ps;
	private Canvas can;
	private Text nameDisplay;
	private Text dialogDisplay;
	private Discovery disc;

	// Use this for initialization
	void Start () {
		world = FindObjectOfType<World> ();
		ps = FindObjectOfType<PlayerStats> ();
		disc = GetComponentInChildren<Discovery> ();

		can = FindObjectOfType<Canvas> ();
		Text[] tmp = can.GetComponentsInChildren<Text> ();
		for (int i = 0; i<tmp.Length; i++) {
			if (tmp[i].name == "nameText")
				nameDisplay = tmp[i];
			if (tmp[i].name == "displayText")
				dialogDisplay = tmp[i];
		}

		// I'm doing this here out of convenience, but it's not necessarily the best place for it
		clearDialog ();

		// add this statue's hope to the global hope counter
		world.AddHope (level, hopeAmt);

	}

	public bool IsSpent(){
		return spent;
	}

	void clearDialog(){
		nameDisplay.text = "";
		dialogDisplay.text = "";
	}

	void displayNextPage(){
		// don't crash if there's no dialogue
		if (dialog.Count == 0)
			return;

		page++;
		if (page >= dialog.Count) {
			page = 0;
			looped = true;
		}

		if (!looped)
			dialogDisplay.text = dialog [page].pageText;
		else {
			if (dialog [page].loop)
				dialogDisplay.text = dialog [page].pageText;
			else
				displayNextPage();
		}

	}

	void OnTriggerEnter(Collider other){
		dialogDisplay.text = promptText;
		nameDisplay.text = statueName;
	}

	void OnTriggerExit(Collider other){
		clearDialog ();
		looped = false;
	}

	void OnTriggerStay(Collider other){
		if (Input.GetButtonDown ("Interact")){
			if (!spent) {
				spent = true;
				ps.AddHope(hopeAmt);
				disc.KillVibration();
			}
			displayNextPage();
		}
	}

	// Update is called once per frame
	void Update () {
	
	}
}
