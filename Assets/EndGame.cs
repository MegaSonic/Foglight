using UnityEngine;
using System.Collections;
using UnityEngine.UI;

public class EndGame : MonoBehaviour {
	
	private World world;
	private PlayerStats ps;
	private ParticleSystem nameFog;
	private ParticleSystem bodyFog;
	
	private Canvas can;
	private Text nameDisplay;
	private Text dialogDisplay;

	public Animator endGameAnimation;

	private bool endGame = false;

	// Use this for initialization
	void Start () {
		world = FindObjectOfType<World> ();
		ps = FindObjectOfType<PlayerStats> ();
		nameFog = GameObject.FindGameObjectWithTag("NameFog").GetComponent<ParticleSystem>();
		bodyFog = GameObject.FindGameObjectWithTag("BodyFog").GetComponent<ParticleSystem>();
		
		can = FindObjectOfType<Canvas> ();
		Text[] tmp = can.GetComponentsInChildren<Text> ();
		for (int i = 0; i<tmp.Length; i++) {
			if (tmp [i].name == "nameText")
				nameDisplay = tmp [i];
			if (tmp [i].name == "displayText")
				dialogDisplay = tmp [i];
		}
	}
	
	// Update is called once per frame
	void Update () {

	}

	void OnTriggerEnter(Collider other) {
		dialogDisplay.text = "... Activate the lighthouse?";
		if (!bodyFog.isPlaying)
			bodyFog.Play ();
	}
	
	void OnTriggerStay(Collider other) {
		if (Input.GetButtonDown ("Interact") && !endGame) {
			endGame = true;
			Debug.Log ("This should work!");
			endGameAnimation.Play("fadeToWhite");
			StartCoroutine(ReturnToTitle());
		}
	}

	IEnumerator ReturnToTitle() {
		yield return new WaitForSeconds (5);
		Application.LoadLevel (0);
	}

	void OnTriggerExit(Collider other){
		bodyFog.Stop ();
		dialogDisplay.text = "";
	}
}
