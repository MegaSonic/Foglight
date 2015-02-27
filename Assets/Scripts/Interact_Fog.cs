using UnityEngine;
using System.Collections;

public class Interact_Fog : MonoBehaviour {

	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
	
	}

	void OnTriggerStay(Collider col)
	{
		// if you're touching fog and you press the "interact" key
		if(col.gameObject.tag=="fog" && Input.GetKeyDown("return"))
		{
			// make wall intangible
			Destroy(col.gameObject.transform.parent.gameObject.transform.FindChild("Collider").gameObject);
			// deactivate particle system
			col.gameObject.transform.parent.gameObject.particleSystem.enableEmission = false;
		}
			
	}
}
