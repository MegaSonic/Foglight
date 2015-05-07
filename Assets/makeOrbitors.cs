using UnityEngine;
using System.Collections;

public class makeOrbitors : MonoBehaviour {

	public int NumOrbits;
	public Transform center;
	public float distanceMin;
	public float distanceMax;
	public float speedMin;
	public float speedMax;
	
	private Vector3 randDirection;
	private Vector3 oldRandDir;
	private float randDistance;
	private float randSpeed;
	private int n;
	
	// Use this for initialization
	void Start () {
		if (this.transform.parent != null) {
			for (int i = 0; i<NumOrbits-1; ++i) {
				Instantiate(this);
			}
		}
		if (NumOrbits < 1) {
			Destroy(this.transform.gameObject);
		}
		this.transform.SetParent (center);
		randDirection = Random.onUnitSphere;
		oldRandDir = randDirection;
		randDistance = Random.Range (distanceMin, distanceMax);
		randSpeed = Random.Range (speedMin, speedMax);
		this.transform.position = this.transform.parent.transform.position+(Random.onUnitSphere * randDistance);
	}
	
	// Update is called once per frame
	void Update () {
		n++;
		if(n >= 100) {
			randDirection = Random.onUnitSphere;
			n = 0;
		}
		oldRandDir = Vector3.Lerp (oldRandDir, randDirection, 1 * Time.deltaTime);
		
		this.transform.RotateAround (this.transform.parent.transform.position, oldRandDir, randSpeed * Time.deltaTime);
	}
}
