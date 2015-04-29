using UnityEngine;
using System.Collections;
using UnityEngine.UI;

//PLAYER SOUND
public class soundPlayer : MonoBehaviour {

	private PlayerStats ps;

	//MOVEMENT SOUNDS
	private AudioSource moveSoundSource; //plays when moving
	private AudioSource repSoundSource1; //repeats when moving
	private AudioSource repSoundSource2;
	private bool repAlternator = true;


	//INTERACTION SOUNDS
	private AudioSource fogInteractSoundSource; //plays when you interact w/ fog
	private AudioSource statueInteractSoundSource; //plays when you interact w/ statues

	//?
	private AudioSource hopeSoundSource; //plays when you have hope & are next to fog
	private AudioSource noHopeSoundSource; //plays when you don't have hope & are next to fog

	private AudioSource ambientSoundSource;
	private AudioSource ambientBackupSource;

	private areaLightScript playerLight;
	private bool soundFunctionGo = false;

	//(for moveRepSoundSource)
	public int moveRepSoundDelay;
	public int stillRepSoundDelay;
	public int runRepSoundDelay;
	private int currRepSoundDelay;
	private int repSoundTime;

	private float movePitch;
	private float movePInc;
	private float moveVol;
	private float moveVInc;

	void Awake () {
		AudioSource[] allSources = GetComponents<AudioSource>();
		moveSoundSource = allSources [0];
		repSoundSource1 = allSources [1];
		repSoundSource2 = allSources [2];
		//noHopeSoundSource = allSources [3];
		hopeSoundSource = allSources [3];
		fogInteractSoundSource = allSources [4];
		statueInteractSoundSource = allSources [5];
		ambientSoundSource = allSources [6];
		ambientBackupSource = allSources [7];

		playerLight = FindObjectOfType<areaLightScript> ();
		
	}
	// Use this for initialization
	void Start () {	

		repSoundTime = stillRepSoundDelay;
				
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

		//REPEATING SOUND after delay time: every so often (moveRepSoundDelay) a sound will play
		if (repSoundTime <= 0) {
			if (repAlternator == true)
			{
				repSoundSource1.Play();
				repAlternator = false;
			}
			else { 
				repSoundSource2.Play();
				repAlternator = true;
			}
			repSoundTime = currRepSoundDelay;
			playerLight.StartCoroutine(playerLight.lightBurst());
		} else {
			repSoundTime -= 10 * Time.deltaTime;
		}

		//MOVEMENT!
		//if you're moving
		if (Input.GetAxis ("Horizontal") > 0 || Input.GetAxis ("Horizontal") < 0 || Input.GetAxis ("Vertical") > 0 || Input.GetAxis ("Vertical") < 0) {
			//repeating sound is set to repeat at movement speed rhythm
			currRepSoundDelay = moveRepSoundDelay;
			repSoundSource1.volume = 0.395f;
			repSoundSource2.volume = 0.395f;
			//play movement sound
			if( moveSoundSource.isPlaying.Equals(false)){
				moveSoundSource.Play ();
			}
			else{
				if (!soundFunctionGo)
				{
					moveVol = 1f;
					moveVInc = .5f;
					movePitch = .77f;
					movePInc = .1f;
					//FadeVolume(moveSoundSource,.8f,.3f);
					//moveSoundSource.pitch = .77f;
				}
			}
		
		} else {
			//repeating sound is set to repeat at movement speed rhythm
			currRepSoundDelay = stillRepSoundDelay;
			repSoundSource1.volume = 0.147f;
			repSoundSource2.volume = 0.147f;

			//fade down movement sound & change pitch
			if( moveSoundSource.isPlaying.Equals(true)){
				if (!soundFunctionGo)
				{
					moveVol = .18f;
					moveVInc = .44f;
					movePitch = .76f;
					movePInc = .1f;
					//FadeVolume(moveSoundSource,.28f,.14f);
					//moveSoundSource.pitch = .76f;
				}
			}
		}
		FadePitch (moveSoundSource,movePitch,movePInc);
		FadeVolume (moveSoundSource,moveVol,moveVInc);
	}
	/*
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
*/
	public void PlayAddHope(){
		soundFunctionGo = true;
		moveSoundSource.pitch = .9f;
		hopeSoundSource.Play ();
		//movePitch = .9f;
		//movePInc = 1f;
		//movePitch = .99f;
		//movePInc = .01f;
		//FadePitch (moveSoundSource, .8f, .1f);
		soundFunctionGo = false;
	}

	public void PlayFogPush(){
		soundFunctionGo = true;
		fogInteractSoundSource.Play ();
		soundFunctionGo = false;
	}

	public void PlayStatueInteractSound(){
		statueInteractSoundSource.Play ();
	}

	public void FadeVolume(AudioSource track, float vol, float increment)
	{
		float trackVol = track.volume;
		if(track.volume != vol)
		{				
			if (trackVol < (vol - increment * Time.deltaTime))
			{ 
				trackVol += increment * Time.deltaTime;
			} 
			else if (track.volume > (vol + increment * Time.deltaTime))
			{ 
				trackVol -= increment * Time.deltaTime;
			} 
			else
			{ 
				trackVol = vol;
			}
			track.volume = trackVol;
		}
	}

	public void FadePitch(AudioSource track, float pitch, float increment)
	{
		float trackPitch = track.pitch;
		if(track.pitch != pitch)
		{				
			if (trackPitch < (pitch - increment * Time.deltaTime))
			{ 
				trackPitch += increment * Time.deltaTime;
			} 
			else if (track.pitch > (pitch + increment * Time.deltaTime))
			{ 
				trackPitch -= increment * Time.deltaTime;
			} 
			else
			{ 
				trackPitch = pitch;
			}
			track.pitch = trackPitch;
		}
	}

	public void PlaySpawnObject(){

	}

}
