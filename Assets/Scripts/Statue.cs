using UnityEngine;
using System.Collections;
using System.Collections.Generic;
using UnityEngine.UI;

[System.Serializable]
public class Page{
	public string pageText;
	public bool loop;
}

[System.Serializable]
public class Book{
	public string needsFlag;
	public string givesFlag;
	public List<Page> pages;
}

public class Statue : MonoBehaviour {

	public float hopeAmt;
	public int level; // what square is this statue in?
	public string statueName;
	public string promptText;
	public List<Book> dialog;

	private bool spent = false;
	private bool looped = false;
	private int pageNum = -1;
	private int bookNum = 0;

	private World world;
	private PlayerStats ps;
	private Canvas can;
	private Text nameDisplay;
	private Text dialogDisplay;

	private ParticleSystem playerParticles;

	private ParticleSystem nameFog;
	private ParticleSystem bodyFog;

	// Use this for initialization
	void Start () {
		world = FindObjectOfType<World> ();
		ps = FindObjectOfType<PlayerStats> ();
		nameFog = GameObject.FindGameObjectWithTag("NameFog").GetComponent<ParticleSystem>();
		bodyFog = GameObject.FindGameObjectWithTag("BodyFog").GetComponent<ParticleSystem>();



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

	// clears the dialog box text
	void clearDialog(){
		nameDisplay.text = "";
		dialogDisplay.text = "";
		if (nameFog.isPlaying) {
			nameFog.Stop();
		}
		if (bodyFog.isPlaying) {
			bodyFog.Stop ();
		}
	}

	// looks for the newest unlocked book, and sets it as the default
	void openNewestBook() {
		// don't crash if there's no book
		// and don't do any work if there's only one book
		if (dialog.Count == 0 || dialog.Count < 2)
			return;

		for (int i = 0; i<dialog.Count; i++) {
			if (string.IsNullOrEmpty(dialog[i].needsFlag))
				bookNum = i;
			else if(ps.flagUnlocked(dialog[i].needsFlag))
				bookNum = i;
		}
	}

	void displayNextPage(){
		// don't crash if there's no dialogue
		if (dialog.Count == 0 || dialog[bookNum].pages.Count == 0)
			return;

		pageNum++;
		if (pageNum >= dialog[bookNum].pages.Count) {
			// we've finished the book
			pageNum = 0;
			looped = true;

			// unlock the flag for the player (if there is one)
			if (!string.IsNullOrEmpty(dialog[bookNum].givesFlag))
			{
				ps.unlockFlag(dialog[bookNum].givesFlag);
			}
		}

		if (!looped)
			dialogDisplay.text = dialog[bookNum].pages[pageNum].pageText;
		else {
			if (dialog[bookNum].pages[pageNum].loop)
				dialogDisplay.text = dialog[bookNum].pages[pageNum].pageText;
			else
				displayNextPage();
		}

	}

	void OnTriggerEnter(Collider other){
		dialogDisplay.text = promptText;
		nameDisplay.text = statueName;
		openNewestBook ();

		/*
		foreach (Particle p in playerParticles) {
			p.color = Color.green;
		}
		*/
	}

	void OnTriggerExit(Collider other){
		clearDialog ();	
	}

	void OnTriggerStay(Collider other){
		if (Input.GetButtonDown ("Interact")){
			if (!spent) {
				spent = true;
				ps.AddHope(hopeAmt);
			}
			if (statueName != "") {
				nameFog.Play();
			}
			bodyFog.Play ();
			displayNextPage();
		}
	}

	// Update is called once per frame
	void Update () {
	
	}
}
