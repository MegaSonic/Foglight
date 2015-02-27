using UnityEngine;
using System.Collections;

public class Interact_Fog : MonoBehaviour {

	private PlayerStats ps;

	public float unlockHopeAmt;

	// Use this for initialization
	void Start () {
	
		ps = GetComponent<PlayerStats> ();

	}
	
	// Update is called once per frame
	void Update () {
	
	}

	void OnTriggerStay(Collider col)
	{
		// if you're touching fog and you press the "interact" key
		if(col.gameObject.tag=="fog" && Input.GetKeyDown("return") && ps.GetHope() > unlockHopeAmt)
		{
			// make wall intangible
			Destroy(col.gameObject.transform.parent.gameObject.transform.FindChild("Collider").gameObject);
			// deactivate particle system
			col.gameObject.transform.parent.gameObject.particleSystem.enableEmission = false;
		}
			
	}

}
