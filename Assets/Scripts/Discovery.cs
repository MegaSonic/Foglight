using UnityEngine;
using System.Collections;
using UnityEngine.UI;

public class Discovery : MonoBehaviour {

	private bool spent = false;

	private Vibration vibe;

	public string dName;
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

	private ParticleSystem nameFog;
	private ParticleSystem bodyFog;

	// Use this for initialization
	void Start () {
		vibe = GetComponentInChildren<Vibration> ();

		world = FindObjectOfType<World> ();
		ps = FindObjectOfType<PlayerStats> ();
		
		playerParticles = GameObject.FindGameObjectWithTag("Particle").GetComponent<ParticleSystem>();
		playerColor = playerParticles.startColor;

		nameFog = GameObject.FindGameObjectWithTag("NameFog").GetComponent<ParticleSystem>();
		bodyFog = GameObject.FindGameObjectWithTag("BodyFog").GetComponent<ParticleSystem>();

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

	void DisplayPainting(){
		nameDisplay.text = dName;
		dialogDisplay.text = text;
		imageDisplay.sprite = image;
		imageDisplay.enabled = true;
		nameFog.Play();
		bodyFog.Play();
		canDisplay = false;
		displayDelayTimer = 0f;
		isVisible = true;
	}

	void HidePainting(){
		imageDisplay.enabled = false;
		nameFog.Stop();
		bodyFog.Stop();
		clearDialog();
		canDisplay = false;
		displayDelayTimer = 0f;
		isVisible = false;
	}


	void OnTriggerEnter(Collider other) {
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
				DisplayPainting();

			}
			else {
				HidePainting();
			}
		}
	}

	void OnTriggerExit(Collider coll) {
		playerParticles.startColor = playerColor;
		HidePainting ();
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
