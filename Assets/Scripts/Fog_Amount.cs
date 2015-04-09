using UnityEngine;
using System.Collections;

public class Fog_Amount : MonoBehaviour {

	public int sectionNumber;
	public float unlockHopeAmt;

	public float GetHopeAmt()
	{
		return unlockHopeAmt;
	}

	public void setSectionAndHope(int section, float hope)
	{
		sectionNumber = section;
		unlockHopeAmt = hope;
		this.GetComponent<ParticleSystemRenderer> ().sortingOrder += -4 * sectionNumber;

	}

	// Use this for initialization
	void Start () {
		this.GetComponent<ParticleSystemRenderer> ().sortingOrder += -4 * sectionNumber;
	}
}
