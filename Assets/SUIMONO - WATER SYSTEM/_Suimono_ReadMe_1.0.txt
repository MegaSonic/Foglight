---------------------------------------------------
SUIMONO: CUSTOMIZABLE WATER SYSTEM
        Copyright ©2012 Tanuki Digital
                         Version 1.0
---------------------------------------------------

Thank you for supporting SUIMONO!
if you have any questions, comments, or requests for new features
please visit the Tanuki Digital Forums and post your feedback:

http://tanukidigital.com/suimono/forum/
http://tanukidigital.com/forum/

For complete documentation please go to:
http://tanukidigital.com/suimono/documentation/


-----------------
 QUICK GUIDE
-----------------
This is just a quick-start guide to get you up and running with SUIMONO right away.
Complete documentation can be found on the suimono documentation site here:
http://tanukidigital.com/suimono/documentation/


-----------------
INSTALLATION
-----------------
I. IMPORT SUIMONO BASE FILES INTO YOUR PROJECT
--
If you've bought Suimono from the Unity Asset Store, then it should automatically import Suimono into your project folder.  All the files for Suimono are contained in the "Suimono - Water System" folder.  If you've downloaded Suimono from the TanukiDigital website, or you want to import it into a new project, simply go to: "Assets -> Import Package -> Custom Package..." in the Unity Menu.  Then select the  "Suimono_watersystem_v1.unitypackage" file.  This will open an import dialog box, simply click the import and all the Suimono files will be imported into your project list.  If you do buy it from the asset store, I recommend exporting a copy of suimono as a unitypackage to your Hard Drive for safe keeping.


II. ADD THE SUIMONO MODULES TO YOUR SCENE
--
1. drag the "Water_Module" prefab located in the "/PREFABS" folder into your scene list.
2. If it isn't set already, make sure to set the Water_Module's position in the transform settings to 0,0,0
3. drag and drop the "Water_Surface" prefab on top of the "Water_Module" so it becomes a child object of "Water_Module".

That's it!  you can now position "Water_Surface" anywhere in your scene that you like, and even rename both "Water_Module" and "Water_Surface" if you'd rather have a different name.  If you have multiple water surfaces in your scene you can simply drag more "Water_Surface" prefabs onto the "Water_Module" gameobject in your scene.


-------------------
HOW IT WORKS
-------------------
Suimono is made up of modules, in the form of prefabs, and scripts which you can attach to those modules for additional functionality.  The base installation is described above.  At the minimum you need a "Water_Module" prefab in your scene, and at least one "Water_Surface" prefab as a child of that object.  You can add as many water_surfaces as you like, and even stack them on top of each other with different settings for great effects.  However you should only ever have one "Water_Module" object in your scene at once.

These two base modules render the water and handle the quality settings. All other functions (such as underwater effects, caustics, waves, splash and ripples etc.) are handled by attaching different scripts to these game objects.  By default, all the relevant scripts come already attached to each game object, however if you want to customize the functionality of your water, or if you simply don't need certain functionality, then you can remove the relevant scripts from each game object.  all the function scripts for Suimono can be found in the /SCRIPTS folder.

There are three types of scripts in Suimono and each type effects a gameobject type:  any script with "waterModule" in the title should only be attached to "Water_Module"; any script starting with "water_" should only be attached to a "Water_Surface" object; and any script starting with "object_" should be attached to objects that you want to interact with the water surface.

By default any object with both a rigidbody and a collider will automatically interact with the water surface.  But if you want to either add buoyancy to a specific object, or if you want to tweak the interaction settings on a per-object basis, you would attach these object scripts.

----------------------
QUALITY SETTINGS
----------------------
Currently Suimono can be set to run either to Unity Pro specs or to Unity "Indie" specs.  To change between these simply select your version in the "Unity Version State" pulldown of the WaterModule_quality script in the Water_Module prefab.  This will change the settings for all of the Water_Surface objects in your scene.

You can also set specific settings that you want your water_surface objects to have, such as refraction and depth calculations.  When these are set in the Water_Module object then all water surfaces will inherit these settings.  Hoever you can also attach the "water_quality" script to any Water_Surface object to override the master settings on a per-object basis.

Please note however that the Unity Version setting can not be overridden per object, so if you set the Water_Module to be Unity "Indie" then it will force all water objects to comply. 



----------------------
VERSION HISTORY
----------------------
ver.1.0 - Initial Release!







