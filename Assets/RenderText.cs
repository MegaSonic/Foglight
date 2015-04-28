using UnityEngine;
using System.Collections;
using UnityEngine.UI;

public class RenderText : MonoBehaviour {
	public string textToDisplay;
	
	private World world;
	private PlayerStats ps;
	private ParticleSystem nameFog;
	private ParticleSystem bodyFog;
	
	private Canvas can;
	private Text nameDisplay;
	private Text dialogDisplay;


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
		dialogDisplay.text = textToDisplay;
		if (!bodyFog.isPlaying)
			bodyFog.Play ();
	}

	void OnTriggerExit(Collider other){
		bodyFog.Stop ();
		dialogDisplay.text = "";
	}
}
