using UnityEngine;
using System.Collections;

public class Interact_Fog : MonoBehaviour {

	private PlayerStats ps;

	public float unlockHopeAmt;

	// Use this for initialization
	void Start () {
	
		ps = FindObjectOfType<PlayerStats> ();

	}
	
	// Update is called once per frame
	void Update () {
	
	}

	void OnTriggerStay(Collider col)
	{
		// if you're touching fog and you press the "interact" key
		if(col.gameObject.tag=="fog" && Input.GetButtonDown("Interact") && ps.GetHope() > unlockHopeAmt)
		{
			// make wall intangible
			Destroy(col.gameObject.transform.parent.gameObject.transform.FindChild("Collider").gameObject);
			// deactivate particle system
			col.gameObject.transform.parent.gameObject.GetComponent<ParticleSystem>().enableEmission = false;
		}
	}

}
