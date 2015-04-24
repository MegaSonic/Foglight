using UnityEngine;
using System.Collections;
using UnityEngine.UI;

public class StatsUI : MonoBehaviour {

	private Text t;
	private World world;
	private PlayerStats ps;
	public Animation ani;

	private bool aniIsPlaying = false;

	// Use this for initialization
	void Start () {
		t = GetComponent<Text> ();
		world = FindObjectOfType<World> ();
		ps = FindObjectOfType<PlayerStats> ();
		t.text = "hello";
	}
	
	// Update is called once per frame
	void Update () {
		float a = ps.GetHope ();
		if (world.fogCircles[world.fogIndex] != null && a >= world.fogCircles[world.fogIndex].unlockHopeAmt && ani.isPlaying == false) {
			Animate ();
		}
		float b = world.GetHope ();
		t.text = a.ToString();
	}

	public void Animate() {
		ani.Play ();
	}
}
