using UnityEngine;
using System.Collections;
using UnityEngine.UI;

public class Interact_Fog : MonoBehaviour {

	private PlayerStats ps;

	public string promptTextGood = "Press A to push back the fog wall";
	public string promptTextBad = "You need to gather {0} more hope to get past this wall!";

	private Canvas can;
	private Text promptDisplay;
	private World w;
	private float unlockHopeAmt;

	private bool unlock = false;

	// Use this for initialization
	void Start () {	
		ps = FindObjectOfType<PlayerStats> ();

		w = FindObjectOfType<World> ();

		can = FindObjectOfType<Canvas> ();
		Text[] tmp = can.GetComponentsInChildren<Text> ();
		for (int i = 0; i<tmp.Length; i++) {
			if (tmp[i].name == "displayText"){
				promptDisplay = tmp[i];
				break;
			}
		}
	}
	
	// Update is called once per frame
	void Update () {
	
	}
	

	void OnTriggerExit(Collider col)
	{
		unlock = false;
		if (col.gameObject.tag == "fog") {
			promptDisplay.text = "";
		}

	}

	void OnTriggerEnter(Collider col)
	{
		unlock = true;
		if (col.gameObject.tag == "fog")
			unlockHopeAmt = col.transform.parent.gameObject.GetComponent<Fog_Amount> ().GetHopeAmt();
	
	}


	void OnTriggerStay(Collider col)
	{
		// if you're touching fog and you press the "interact" key
		if(col.gameObject.tag=="fog")
		{
			//unlockHopeAmt = int.Parse(col.gameObject.transform.parent.gameObject.tag);
			if (ps.GetHope () >= unlockHopeAmt)
			{
				// display good prompt
				promptDisplay.text = promptTextGood;

				if (Input.GetButtonUp("Interact"))
				{
					promptDisplay.text = "";
					w.UnlockLevel();
					if (unlock) {
						w.UnlockNextCircle();
						unlock = false;
					}

					// deactivate all particle systems with the same section
					var emittersInSection = GameObject.FindGameObjectsWithTag("fogMaker");
					foreach (var emitter in emittersInSection)
					{
						//if(emitter.GetComponent<Fog_Amount>().sectionNumber == col.transform.parent.gameObject.GetComponent<Fog_Amount>().sectionNumber)
						//{
							foreach (Transform child in emitter.transform){
								Destroy(child.gameObject);
							}
							
							var particleSystem = emitter.GetComponent<ParticleSystem>();
							particleSystem.enableEmission = false;
							
							ParticleSystem.Particle[] particles = new ParticleSystem.Particle[particleSystem.particleCount];
							int count = particleSystem.GetParticles(particles);
							for(int i = 0; i < count; i++)
							{
								
								particles[i].velocity = ((particles[i].position - gameObject.transform.position).normalized * 30);
							}
							particleSystem.SetParticles(particles, count);
						//}

					}


				}
			}
			else
			{
				// display bad prompt
				promptDisplay.text = string.Format (promptTextBad, unlockHopeAmt - ps.GetHope());

			}
		}
	}

}
