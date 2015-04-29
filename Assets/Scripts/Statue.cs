using UnityEngine;
using System.Collections;
using System.Collections.Generic;
using UnityEngine.UI;
using System.Threading;

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

	[HideInInspector]
	public bool hasBeenRead = false;
}

public class Statue : MonoBehaviour {

	public float hopeAmt;
	public int level; // what square is this statue in?
	public string statueName;
	public string promptText;
	public int afterMethodIndex;
	public List<Book> dialog;

	// variables to deal with the text write-on effect
	private float writeOnDelay = 0f;
	private float writeOnTimer = 0f;
	private int writeOnIndex = 0;
	private string writeOnTextBlock; // the full text block
	private bool writing = false;

	// variables to make a delay before write-on skip is allowed
	private float skipDelay = 0.25f;
	private float skipDelayTimer = 0f;
	private bool canSkip = false;

	// variables to make a delay between page turns
	private float readPageDelay = 0.5f;
	private float readPageDelayTimer = 0f;
	private bool canReadPage = true;

	// variables to make a delay between engagements
	private float engageDelay = 1f;
	private float engageDelayTimer = 0f;
	private bool canEngage = true;

	private bool spent = false;
	private bool looped = false;
	private int pageNum = -1;
	private int bookNum = 0;
	private bool engaged = false; // if the player is engaged in a dialog with statue

	private World world;
	private int ID;  // a unique ID number assigned by the world object

	//private ThirdPersonController_eli controller; // whatever it ends up being
	private GameObject player;

	private SpringFollow sf;
	private RotationControl rc;
	private PlayerStats ps;
	private Canvas can;
	private soundPlayer sound;
	private Text nameDisplay;
	private Text dialogDisplay;

	private ParticleSystem playerParticles;
	private Color playerColor;
	private float playerHeight;
	private float camDistance;
	private float camHeight;

	private ParticleSystem nameFog;
	private ParticleSystem bodyFog;

	private GameObject fx;

	private bool letterSpawned;

	void Awake() {
		playerParticles = GameObject.FindGameObjectWithTag("Particle").GetComponent<ParticleSystem>();

		world = FindObjectOfType<World> ();
		ps = FindObjectOfType<PlayerStats> ();
		nameFog = GameObject.FindGameObjectWithTag("NameFog").GetComponent<ParticleSystem>();
		bodyFog = GameObject.FindGameObjectWithTag("BodyFog").GetComponent<ParticleSystem>();
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

		ID = world.registerStatue ();

		sound = FindObjectOfType<soundPlayer> ();
		fx = transform.FindChild ("Statue FX").gameObject;

		//controller = (ThirdPersonController_eli)gameObject.GetComponent ("ThirdPersonController_eli");
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

	// activates particle fx
	void activateFX(){
		if (fx == null)
			return;
		fx.SetActive(true);
	}

	// deactivates particle fx
	void deactivateFX(){
		if (fx == null)
			return;
		fx.SetActive(false);
	}

	// returns true if there is an unread, unlocked book
	bool isUnreadUnlockedBook() {
		for (int i=0; i<dialog.Count; i++) {
			if (!dialog[i].hasBeenRead && ps.flagUnlocked(dialog[i].needsFlag))
				return true;
		}
		return false;
	}

	// looks for the newest unlocked book that hasn't been read yet, and sets it as the default
	// if all books have been read, sets the last unlocked book as the default
	void openNewestBook() {
		// don't crash if there's no book
		// and don't do any work if there's only one book
		if (dialog.Count == 0 || dialog.Count < 2)
			return;

		for (int i = 0; i<dialog.Count; i++) {

			// iterate through each book
			// stop at the first book that hasn't been read and is not locked

			// return upon the first unread book that either doesn't need to be unlocked
			// or is unlocked
			if ((!dialog[i].hasBeenRead && string.IsNullOrEmpty(dialog[i].needsFlag))
			    || (!dialog[i].hasBeenRead && ps.flagUnlocked(dialog[i].needsFlag)))
			{
				bookNum = i;
				return;
			}

			// if there isn't an unread book, get the most recent available one
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

		if (pageNum == dialog [bookNum].pages.Count - 1) {
			// we're on the last page

			// give the hope to the player
			if (!spent) {
				spent = true;
				ps.AddHope(hopeAmt);
				sound.PlayAddHope();
			}

			deactivateFX();
			
			// fire the delegate if there is one
			switch(afterMethodIndex){
			case (0):
				break;
			case (1):
				spawnLetter();
				break;
			case (2):
				endGame ();
				break;
				
				// etc
			}

			// unlock the flag for the player (if there is one)
			if (!string.IsNullOrEmpty(dialog[bookNum].givesFlag))
			{
				ps.unlockFlag(dialog[bookNum].givesFlag);
				if (!isUnreadUnlockedBook())
					world.setNewDialog();
			}
		}

		else if (pageNum >= dialog[bookNum].pages.Count) {
			// we've finished the book

			dialog[bookNum].hasBeenRead = true;
			pageNum = -1;

			int oldBookNum = bookNum;
			openNewestBook();

			// if there are more books to read, do that
			if (oldBookNum != bookNum)
			{
				displayNextPage();
				return;
			}

			// otherwise release player

			looped = true;
			engaged = false;
			//controller.Unfreeze();
			player.SendMessage("Unfreeze");
			rc.Unfreeze();
			print ("UNFREEZE");

			// start engagement timer
			canEngage = false;
			engageDelayTimer = 0f;

			canSkip = false;
			clearDialog();
			writing = false;


			return;
		}

		// initiate the displaying

		if (!looped) {
			writing = true;
			canSkip = false;
			skipDelayTimer = 0f;
			writeOnTextBlock = dialog[bookNum].pages[pageNum].pageText;
			writeOnIndex = 0;
			//dialogDisplay.text = dialog[bookNum].pages[pageNum].pageText;
		}			
		else {
			if (dialog[bookNum].pages[pageNum].loop){
				writing = true;
				canSkip = false;
				skipDelayTimer = 0f;
				writeOnTextBlock = dialog[bookNum].pages[pageNum].pageText;
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

		sf = GameObject.FindGameObjectWithTag ("Player").transform.parent.gameObject.GetComponentInChildren<SpringFollow> ();
		rc = GameObject.FindGameObjectWithTag ("Player").transform.parent.gameObject.GetComponentInChildren<RotationControl> ();
		playerColor = playerParticles.startColor;
		playerHeight = sf.height;
		camDistance = rc.distance;
		camHeight = rc.height;

		player = other.gameObject;

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
		writing = false;
	}

	void OnTriggerStay(Collider other){
		playerParticles.startColor = Color.green;

		if (Input.GetButtonDown ("Interact")){

			if (!canEngage)
				return;

			if (!engaged){
				engaged = true;
				//controller.Freeze();
				player.SendMessage("Freeze");
				rc.Freeze();
				print ("FREEZE");
				sound.PlayStatueInteractSound();
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
				dialogDisplay.text = writeOnTextBlock;
				// start the delay timer
				readPageDelayTimer = readPageDelay;
				canReadPage = false;
			}
		}
	}

	// Update is called once per frame
	void Update () {

		// check to see if there is newly unlocked dialog
		if (world.isNewDialog ()) {
			world.acknowledgeNewDialog(ID);

			if (isUnreadUnlockedBook()){
			    activateFX();	
				looped = false;
			}
		}

	
		// write-on text
		if (writing) {
			writeOnTimer += Time.deltaTime;

			// update skip delay timer
			if (!canSkip){
				skipDelayTimer += Time.deltaTime;
				if (skipDelayTimer > skipDelay)
					canSkip = true;
			}
				
			if (writeOnTimer > writeOnDelay)
			{
				writeOnTimer = 0f;
				dialogDisplay.text += writeOnTextBlock[writeOnIndex];

				writeOnIndex++;
				if (writeOnIndex >= writeOnTextBlock.Length)
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

		// update engage delay timer
		if (!canEngage) {
			engageDelayTimer += Time.deltaTime;
			if (engageDelayTimer >= engageDelay)
			{
				canEngage = true;
			}
		}
	}

	void spawnLetter ()
	{
		if (!letterSpawned) {
			letterSpawned = true;
			GameObject go = Instantiate (Resources.Load ("LetterPrefab")) as GameObject;
			sound.PlaySpawnObject ();
		}
	}

	void endGame() 
	{

	}
}
