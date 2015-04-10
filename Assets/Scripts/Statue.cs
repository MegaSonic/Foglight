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
	public int afterMethodIndex;
	public List<Book> dialog;

	// variables to deal with the text write-on effect
	private float writeOnSpeed = 0.01f;
	private float writeOnTimer = 0f;
	private int writeOnIndex = 0;
	private string writeOnTemp;
	private bool writing = false;

	// variables to make a delay before write-on skip is allowed
	private float skipDelay = 0.25f;
	private float skipDelayTimer = 0f;
	private bool canSkip = false;

	// variables to make a delay between page turns
	private float readPageDelay = 0.5f;
	private float readPageDelayTimer = 0f;
	private bool canReadPage = true;

	private bool spent = false;
	private bool looped = false;
	private int pageNum = -1;
	private int bookNum = 0;

	private World world;
	private SpringFollow sf;
	private RotationControl rc;
	private PlayerStats ps;
	private Canvas can;
	private Text nameDisplay;
	private Text dialogDisplay;

	private ParticleSystem playerParticles;
	private Color playerColor;
	private float playerHeight;
	private float camDistance;
	private float camHeight;

	private ParticleSystem nameFog;
	private ParticleSystem bodyFog;

	void Awake() {
		playerParticles = GameObject.FindGameObjectWithTag("Particle").GetComponent<ParticleSystem>();

		sf = GameObject.FindGameObjectWithTag ("Player").transform.parent.gameObject.GetComponentInChildren<SpringFollow> ();
		rc = GameObject.FindGameObjectWithTag ("Player").transform.parent.gameObject.GetComponentInChildren<RotationControl> ();

		world = FindObjectOfType<World> ();
		ps = FindObjectOfType<PlayerStats> ();
		nameFog = GameObject.FindGameObjectWithTag("NameFog").GetComponent<ParticleSystem>();
		bodyFog = GameObject.FindGameObjectWithTag("BodyFog").GetComponent<ParticleSystem>();
		

		// Temp Camera Stuff
		playerColor = playerParticles.startColor;
		playerHeight = sf.height;
		camDistance = rc.distance;
		camHeight = rc.height;

	}

	// Use this for initialization
	void Start () {

		// add this statue's hope to the global hope counter
		world.AddHope (level, hopeAmt);

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

		dialogDisplay.text = "";
		canReadPage = false;

		// deal with the pages, delegate, and flags

		pageNum++;
		if (pageNum >= dialog[bookNum].pages.Count) {
			// we've finished the book

			// fire the delegate if there is one
			switch(afterMethodIndex){
			case (0):
				break;
			case (1):
				// testMethod();
				break;

				// etc
			}

			pageNum = 0;
			looped = true;

			// unlock the flag for the player (if there is one)
			if (!string.IsNullOrEmpty(dialog[bookNum].givesFlag))
			{
				ps.unlockFlag(dialog[bookNum].givesFlag);
			}
		}

		// initiate the displaying

		if (!looped) {
			writing = true;
			canSkip = false;
			skipDelayTimer = 0f;
			writeOnTemp = dialog[bookNum].pages[pageNum].pageText;
			writeOnIndex = 0;
			//dialogDisplay.text = dialog[bookNum].pages[pageNum].pageText;
		}			
		else {
			if (dialog[bookNum].pages[pageNum].loop){
				writing = true;
				canSkip = false;
				skipDelayTimer = 0f;
				writeOnTemp = dialog[bookNum].pages[pageNum].pageText;
				writeOnIndex = 0;
				//dialogDisplay.text = dialog[bookNum].pages[pageNum].pageText;
			}
			else
				displayNextPage();
		}

	}

	void OnTriggerEnter(Collider other){

		dialogDisplay.text = promptText;
		nameDisplay.text = statueName;
		openNewestBook ();

		// Temp Camera Stuff
		sf.height = 0;
		rc.distance = 6f;
		rc.height = 1.5f;
	}

	void OnTriggerExit(Collider other){
		playerParticles.startColor = playerColor;

		// Temp Camera Stuff
		sf.height = playerHeight;
		rc.distance = camDistance;
		rc.height = camHeight;

		clearDialog ();	
	}

	void OnTriggerStay(Collider other){
		playerParticles.startColor = Color.green;


		/*ParticleSystem.Particle[] particles = new ParticleSystem.Particle[playerParticles.particleCount];
		int count = playerParticles.GetParticles(particles);
		for(int i = 0; i < count; i++)
		{
			
			particles[i].color = Color.green;
		}
		playerParticles.SetParticles(particles, count);

*/
		if (Input.GetButtonDown ("Interact")){
			if (!spent) {
				spent = true;
				ps.AddHope(hopeAmt);
			}
			if (statueName != "") {
				nameFog.Play();
			}
			bodyFog.Play ();
			if (canReadPage)
				displayNextPage();

			// let the player skip the write-on effect
			else if (writing && canSkip)
			{
				writing = false;
				dialogDisplay.text = writeOnTemp;
				// start the delay timer
				readPageDelayTimer = readPageDelay;
				canReadPage = false;

			}

		}
	}

	// Update is called once per frame
	void Update () {
	
		// write-on text
		if (writing) {
			writeOnTimer += Time.deltaTime;

			// update skip delay timer
			if (!canSkip){
				skipDelayTimer += Time.deltaTime;
				if (skipDelayTimer > skipDelay)
					canSkip = true;
			}

			if (writeOnTimer > writeOnSpeed)
			{
				writeOnTimer = 0f;
				dialogDisplay.text += writeOnTemp[writeOnIndex];

				writeOnIndex ++;
				if (writeOnIndex >= writeOnTemp.Length)
				{
					// the text is finished writing-on

					writing = false;
					canReadPage = true;
				}
			}


		}

		// update page delay timer
		else if (readPageDelayTimer > 0f) {
			readPageDelayTimer -= Time.deltaTime;
		} else {
			canReadPage = true;
		}

	}
}
