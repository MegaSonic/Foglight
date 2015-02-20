using UnityEngine;
using System.Collections;
using UnityEngine.UI;

public class StatsUI : MonoBehaviour {

	private Text t;
	private World world;
	private PlayerStats ps;

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
		float b = world.GetHope ();
		t.text = "HOPE: " + a + " / " + b;
	}
}
