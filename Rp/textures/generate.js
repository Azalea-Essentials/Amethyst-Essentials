const fs = require('fs');
const itemTexture = JSON.parse(fs.readFileSync('item_texture.json').toString())
let bindableTemplate = `{
	"format_version": "1.16.100",
	"minecraft:item": {
		"description": {
			"identifier": "azalea:bindable_{NAME}",
            "category": "equipment"
        },
		"components": {
            "minecraft:creative_category": {
                "parent": "itemGroup.name.goatHorn"
            },
			"minecraft:display_name": {
                "value": "§cBindable {NAME}"
            },
			"minecraft:max_stack_size": 1,
			"minecraft:icon": {
				"texture": "{NAME}_bindable"
			}
		}
	}
}`;

fs.readdir('./azalea_icons/icontextures',(err,files)=>{
    for(const file of files) {
        if(fs.existsSync(`C:\\Users\\TRASH\\Downloads\\vXFGWFp\\${file}`)) {
        // delete itemTexture.texture_data[file.split('.')[0]]
        itemTexture.texture_data[file.split('.')[0]+"_bindable"] = {
            "textures": "textures/azalea_icons/icontextures/"+file.split('.')[0]
        }
        fs.writeFile(`C:\\Users\\TRASH\\AppData\\Local\\Packages\\Microsoft.MinecraftUWP_8wekyb3d8bbwe\\LocalState\\games\\com.mojang\\development_behavior_packs\\Azalea-Recontinued\\items\\bindable_${file.split('.')[0]}.json`, bindableTemplate.replace(/\{NAME\}/g, file.split('.')[0]), err=>{})

        }
    }
    fs.writeFile("item_texture.json", JSON.stringify(itemTexture, null, 2), err=>{

    })
})