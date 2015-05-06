using UnityEngine;
using System.Collections;

public class areaLightScript : MonoBehaviour {
	Light player;
	public float regularIntensity;
	public float burstIntensity;
	public float pushIntensity;
	public float hopeIntensity;
	private float changeToIntensity;
	private float increment;
	private bool function_run;
	private bool alternator;

	void Awake() {
		player = GetComponent<Light>();
	}
	// Use this for initialization
	void Start () {
		player.intensity = regularIntensity;
		changeToIntensity = regularIntensity;
		increment = .32f;
	}
	
	// Update is called once per frame
	void Update () {
		/*if (function_run == false) {
			if (alternator == true)
			{
				changeToIntensity = player.intensity + 1f;
			}
			else {
				changeToIntensity = player.intensity - 1f;
			}
		}*/
		fadeLight ();
	}

	public IEnumerator lightBurst()
	{
		function_run = true;
		player.intensity = burstIntensity;
		changeToIntensity = burstIntensity;
		yield return new WaitForSeconds (.4f); 
		increment = .8f;
		changeToIntensity = regularIntensity;
	} 

	public IEnumerator lightPush()
	{
		player.intensity = pushIntensity;
		changeToIntensity = pushIntensity;
		yield return new WaitForSeconds (.7f); 
		increment = .2f;
		changeToIntensity = regularIntensity;
	} 

	public IEnumerable lightHope()
	{
		increment = .32f;
		changeToIntensity = hopeIntensity;
		yield return new WaitForSeconds (1f);
		increment = .5f;
		changeToIntensity = regularIntensity;
	}
	
	void fadeLight()
	{
		float currIntensity = player.intensity;

		if (player.intensity != changeToIntensity)
		{				
			if (currIntensity < (changeToIntensity - increment * Time.deltaTime))
			{ 
				currIntensity += increment * Time.deltaTime;
			} 
			else if (currIntensity > (changeToIntensity + increment * Time.deltaTime))
			{ 
				currIntensity -= increment * Time.deltaTime;
			} 
			else
			{ 
				player.intensity = changeToIntensity;
				if (function_run)
					function_run = false;
			}
			player.intensity = currIntensity;
		}
	}
}
