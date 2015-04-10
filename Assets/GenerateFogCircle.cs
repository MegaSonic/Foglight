using UnityEngine;
using System.Collections;

public class GenerateFogCircle : MonoBehaviour {

	public Transform fogCircle1;
	public Transform fogCircle2;
	public Transform fogCircle3;

	//public Transform basicFogCircle;
	public float radius = 40;
	public int sectionNumber;
	public float unlockHopeAmt;
	
	private Transform one;
	private Transform two;
	private Transform three;
	// Use this for initialization
	void Start () {
		//float circumference = 2f * Mathf.PI * radius;
		//int numWalls = Mathf.CeilToInt ((circumference / 30f));
		//float minRotation = 180f / numWalls;
		//
		//for (int i = 0; i < numWalls; i++) {
		//	Quaternion rotation = Quaternion.identity;
		//	rotation.eulerAngles = new Vector3(270, minRotation * i, 0);
		//	Vector3 location = new Vector3 (this.transform.position.x + ((radius - 7) * Mathf.Sin(minRotation * i)), this.transform.position.y + 7, this.transform.position.z + ((radius - 7) * Mathf.Cos(minRotation * i)));
		//	
		//	Instantiate(basicFogCircle, location, rotation);
		//}

		Quaternion rotation = Quaternion.identity;
		rotation.eulerAngles = new Vector3(270, 0, 0);

		one = GameObject.Instantiate (fogCircle1, this.transform.position, rotation) as Transform;
		two = GameObject.Instantiate (fogCircle2, this.transform.position, rotation) as Transform;
		three = GameObject.Instantiate (fogCircle3, this.transform.position, rotation) as Transform;

		one.transform.localScale = new Vector3 ((radius/40), (radius/40), 1f);
		two.transform.localScale = new Vector3 (((radius+5)/40), ((radius+5)/40), 1f);
		three.transform.localScale = new Vector3 (((radius+10)/40), ((radius+10)/40), 1f);

		ParticleSystem oneSys = one.GetComponent<ParticleSystem> ();
		ParticleSystem twoSys = two.GetComponent<ParticleSystem> ();
		ParticleSystem threeSys = three.GetComponent<ParticleSystem> ();

		oneSys.maxParticles = Mathf.CeilToInt (oneSys.maxParticles * (radius / 40));
		oneSys.emissionRate = Mathf.CeilToInt (oneSys.maxParticles * (radius / 40));
		twoSys.maxParticles = Mathf.CeilToInt (oneSys.maxParticles * (radius / 40));
		twoSys.emissionRate = Mathf.CeilToInt (oneSys.maxParticles * (radius / 40));
		threeSys.maxParticles = Mathf.CeilToInt (oneSys.maxParticles * (radius / 40));
		threeSys.emissionRate = Mathf.CeilToInt (oneSys.maxParticles * (radius / 40));

		one.GetComponent<Fog_Amount> ().setSectionAndHope (sectionNumber, unlockHopeAmt);
		two.GetComponent<Fog_Amount> ().setSectionAndHope (sectionNumber, unlockHopeAmt);
		three.GetComponent<Fog_Amount> ().setSectionAndHope (sectionNumber, unlockHopeAmt);

	}


	void OnDrawGizmos() {
		// collider.radius = radius;
		Gizmos.color = Color.red;
		Gizmos.matrix = transform.localToWorldMatrix;
		Gizmos.DrawWireSphere(Vector3.zero, radius);
	}
}
