using UnityEngine;
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

	private ParticleSystem playerParticles;
	private Color playerColor;

	// display timer variables
	private float displayDelay = 0.5f;
	private float displayDelayTimer = 0f;
	private bool canDisplay = true;

	private bool isVisible = false;

	// Use this for initialization
	void Start () {
		vibe = GetComponentInChildren<Vibration> ();

		world = FindObjectOfType<World> ();
		ps = FindObjectOfType<PlayerStats> ();
		
		playerParticles = GameObject.FindGameObjectWithTag("Particle").GetComponent<ParticleSystem>();
		playerColor = playerParticles.startColor;

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

	void OnTriggerEntry(Collider other) {
		playerParticles.startColor = Color.green;
	}

	void OnTriggerStay(Collider other){
		if (Input.GetButtonDown ("Interact")) {

			if (!canDisplay)
				return;

			if (!isVisible) {
				vibe.KillVibration ();
				if (!spent) {
					spent = true;
					vibe.spent = true;
					ps.AddHope(hopeAmt);
				}
				nameDisplay.text = name;
				dialogDisplay.text = text;
				imageDisplay.sprite = image;
				imageDisplay.enabled = true;
				isVisible = true;
			}
			else {
				imageDisplay.enabled = false;
				playerParticles.startColor = playerColor;
				isVisible = false;
				clearDialog();
				canDisplay = false;
				displayDelayTimer = 0f;
			}
		}
	}

	void OnTriggerExit(Collider coll) {
		playerParticles.startColor = playerColor;
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
		if (!canDisplay) {
			displayDelayTimer += Time.deltaTime;
			if (displayDelayTimer >= displayDelay){
				canDisplay = true;
			}
		}
	}
}
