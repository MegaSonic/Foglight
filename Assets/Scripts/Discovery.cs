﻿using UnityEngine;
using System.Collections;
using UnityEngine.UI;

public class Discovery : MonoBehaviour {

	private bool spent = false;

	private Vibration vibe;

	public string name;
	public string text;
	public Sprite image;
	public float hopeAmt;
	public int level;

	private World world;
	private PlayerStats ps;
	private Canvas can;
	private Text nameDisplay;
	private Text dialogDisplay;
	private Image imageDisplay;


	// Use this for initialization
	void Start () {
		vibe = GetComponentInChildren<Vibration> ();

		world = FindObjectOfType<World> ();
		ps = FindObjectOfType<PlayerStats> ();
		

		can = FindObjectOfType<Canvas> ();
		Text[] tmp = can.GetComponentsInChildren<Text> ();
		imageDisplay = can.GetComponentInChildren<Image>();
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
			vibe.spent = true;
			ps.AddHope(hopeAmt);

			nameDisplay.text = name;
			dialogDisplay.text = text;
			imageDisplay.sprite = image;
			imageDisplay.enabled = true;
		}
	}

	void OnTriggerExit(Collider coll) {
		imageDisplay.enabled = false;
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
