using UnityEngine;
using System.Collections;
using UnityEngine.UI;

public class Interact_Fog : MonoBehaviour {

	private PlayerStats ps;

	public float unlockHopeAmt;
	public string promptTextGood = "Press X to push back the fog wall";
	public string promptTextBad = "You need to gather {0} more hope to get past this wall!";

	private Canvas can;
	private Text promptDisplay;
	private World w;

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
		if (col.gameObject.tag == "fog") {
			promptDisplay.text = "";
		}

	}

	void OnTriggerStay(Collider col)
	{
		// if you're touching fog and you press the "interact" key
		if(col.gameObject.tag=="fog")
		{
			unlockHopeAmt = int.Parse(col.gameObject.transform.parent.gameObject.tag);
			if (ps.GetHope () >= unlockHopeAmt)
			{
				// display good prompt
				promptDisplay.text = promptTextGood;

				if (Input.GetButtonDown("Interact"))
				{
					promptDisplay.text = "";
					w.UnlockLevel();

					// make wall intangible
					Destroy(col.gameObject.transform.parent.gameObject.transform.FindChild("Collider").gameObject);

					// deactivate all particle systems with the same tag
					var emittersInSection = GameObject.FindGameObjectsWithTag(col.gameObject.transform.parent.gameObject.tag);
					foreach (var emitter in emittersInSection)
					{
						var particleSystem = emitter.GetComponent<ParticleSystem>();
						particleSystem.enableEmission = false;

						ParticleSystem.Particle[] particles = new ParticleSystem.Particle[particleSystem.particleCount];
						int count = particleSystem.GetParticles(particles);
						for(int i = 0; i < count; i++)
						{

							particles[i].velocity = ((particles[i].position - gameObject.transform.position).normalized * 30);
						}
						particleSystem.SetParticles(particles, count);
					}

					// deactivate particle system
					//col.gameObject.transform.parent.gameObject.particleSystem.enableEmission = false;
					col.gameObject.transform.parent.gameObject.GetComponent<ParticleSystem>().enableEmission = false;


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
