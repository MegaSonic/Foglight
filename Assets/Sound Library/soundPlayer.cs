using UnityEngine;
using System.Collections;
using UnityEngine.UI;

//PLAYER SOUND
public class soundPlayer : MonoBehaviour {

	private PlayerStats ps;
	public float unlockHopeAmt;

	//MOVEMENT SOUNDS
	private AudioSource moveSoundSource; //plays when moving
	private AudioSource moveRepSoundSource; //repeats when moving

	//INTERACTION SOUNDS
	private AudioSource fogInteractSoundSource; //plays when you interact w/ fog
	private AudioSource objectInteractSoundSource; //plays when you interact w/ object

	//?
	private AudioSource hopeSoundSource; //plays when you have hope & are next to fog
	private AudioSource noHopeSoundSource; //plays when you don't have hope & are next to fog
	
	//(for moveRepSoundSource)
	public int moveRepSoundDelay;
	private int moveRepSoundTime;
	
	void Awake () {
		AudioSource[] allSources = GetComponents<AudioSource>();
		moveSoundSource = allSources [0];
		moveRepSoundSource = allSources [1];
		noHopeSoundSource = allSources [2];
		hopeSoundSource = allSources [3];
		fogInteractSoundSource = allSources [4];
		objectInteractSoundSource = allSources [5];

	}
	// Use this for initialization
	void Start () {	

		moveRepSoundTime = 0;
				
		ps = FindObjectOfType<PlayerStats> ();

	}
	
	// Update is called once per frame
	void Update () 
	{

		//if not colliding with fog wall, stop fog wall sounds
		/*if (col.gameObject.tag != "fog") {
			if (noHopeSoundSource.isPlaying.Equals (true)) {
				noHopeSoundSource.Stop ();
			}
			if (hopeSoundSource.isPlaying.Equals (true)) {
				hopeSoundSource.Stop ();
			}
		}*/
				
		//if you're moving
		if (Input.GetAxis ("Horizontal") > 0 || Input.GetAxis ("Horizontal") < 0 || Input.GetAxis ("Vertical") > 0 || Input.GetAxis ("Vertical") < 0) {

			//play movement sound
			if( moveSoundSource.isPlaying.Equals(false)){
				moveSoundSource.Play ();
			}		

			//repeating sound after delay time: every so often (moveRepSoundDelay) a sound will play
			if (moveRepSoundTime <= 0) {
				moveRepSoundSource.Play();
				//moveRepSoundSource.PlayOneShot (moveRepSound, 1F);
				moveRepSoundTime = moveRepSoundDelay;
			} else {
				moveRepSoundTime--;
			}
		} else {
			//pause movement sound
			if( moveSoundSource.isPlaying.Equals(true)){
				moveSoundSource.Pause ();
			}
			moveRepSoundTime = 0;
		}

	}

	void OnTriggerStay(Collider col)
	{
		// if you collide w/ fog...
		if (col.gameObject.tag == "fog") {
			//...and have enough hope...
			if (ps.GetHope () > unlockHopeAmt) {
				// play have hope sound
				if (hopeSoundSource.isPlaying.Equals (false)) {
					hopeSoundSource.Play ();
				}		
				// display good prompt
				//promptDisplay.text = promptTextGood;

				//...and you press the "interact" key...
				if (Input.GetButtonDown ("Interact")) {
					//play fog interact sound
					if (fogInteractSoundSource.isPlaying.Equals (false)) {
						fogInteractSoundSource.Play ();
					}
					if (hopeSoundSource.isPlaying.Equals (true)) {
						hopeSoundSource.Pause ();
					}
				}
			} else { //...if you don't have enough hope...
				if (noHopeSoundSource.isPlaying.Equals (false)) {
					noHopeSoundSource.Play ();
				}
			}
		}
	}

	public void PlayAddHope(){


	}

	public void PlaySpawnObject(){

	}

}
