import { world, Vector, Player, system, EnchantmentTypes } from "@minecraft/server";
import { ActionFormData, MessageFormData, ModalFormData } from "@minecraft/server-ui"
import { any, armor, bow, crossbow, fishingrod, sword, axe, pickaxe, hoe, shovel } from "../../../src/modules/enchantments.js";
import { set1, set2, set3, set4, set5, set6, set7, set8, set9, set10, rewardnames, keynames } from "../../../src/rewards.js";
let rewardsSet = [set1, set2, set3, set4, set5, set6, set7, set8, set9, set10]

class Enchantment {
  constructor(enchantmentId, level) {
    // Attempt to retrieve the enchantment type using the ID provided
    this.type = EnchantmentTypes.get(enchantmentId);

    // If the enchantment type wasn't found, throw an error
    if (!this.type) {
      throw new Error(`Enchantment ID "${enchantmentId}" is not valid.`);
    }

    // Clamp the provided level to be within the allowed range for this enchantment type
    this.level = Math.max(1, Math.min(level, this.type.maxLevel));
  }

  applyToItem(item) {
    // Check if the item supports enchantments
    if (!item.hasComponent("minecraft:enchantments")) {
      throw new Error("Item does not support enchantments.");
    }

    // Get the enchantments component from the item
    const enchantmentsComponent = item.getComponent("minecraft:enchantments");
    const enchantmentsData = enchantmentsComponent.data;

    // Construct the new enchantment object
    const enchantmentInstance = {
      type: this.type.id, // Use the ID of the enchantment type
      level: this.level
    };

    // Add the new enchantment to the list
    enchantmentsData.push(enchantmentInstance);

    // Update the item's enchantments component with the new list
    enchantmentsComponent.data = enchantmentsData;

    console.warn(`Enchantment ${this.type.id} applied at level ${this.level} to item.`);
  }

  getEnchantmentId() {
    return this.type.id;
  }

  getLevel() {
    return this.level;
  }
}




const translateType = {
  "sword": sword,
  "pickaxe": pickaxe,
  "axe": axe,
  "hoe": hoe,
  "shovel": shovel,
  "any": any,
  "armor": armor,
  "bow": bow,
  "crossbow": crossbow,
  "fishing rod": fishingrod,
  "fishing_rod": fishingrod,
  "fishingrod": fishingrod
}

const keys = new Map([
  ["azalea:key1", keynames.key1_name],
  ["azalea:key2", keynames.key2_name],
  ["azalea:key3", keynames.key3_name],
  ["azalea:key4", keynames.key4_name],
  ["azalea:key5", keynames.key5_name],
  ["azalea:key6", keynames.key6_name],
  ["azalea:key7", keynames.key7_name],
  ["azalea:key8", keynames.key8_name],
  ["azalea:key9", keynames.key9_name],
  ["azalea:key10", keynames.key10_name]
]);

try {
  system.events.beforeWatchdogTerminate.subscribe(eventData => eventData.cancel = true)
} catch (error) {
  system.beforeEvents.watchdogTerminate.subscribe((eventData) => {
    system.run(() => {
      eventData.cancel = true;
      console.warn(`WATCHDOG TRIED TO CRASH!!! = ${data.terminateReason}`);
    })
  });
}

function showcaseItems(reward, total) {
  let choose = [];
  let lastItem = null;
  function shuffleArray(array) {
    let currentIndex = array.length;
    let temporaryValue;
    let randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }
  if (reward.length === 1) {
    let item = reward[0];
    for (let i = 0; i < total; i++) {
      choose.push(item);
    }
    return choose;
  }
  while (choose.length < total) {
    let shuffled = shuffleArray(reward);
    for (let item of shuffled) {
      if (choose.length >= total) {
        break;
      }
      if (item !== lastItem) {
        choose.push(item);
        lastItem = item;
      } else {
        let alternate = reward.filter((x) => x !== item);
        choose.push(alternate[0]);
        lastItem = alternate[0];
      }
    }
  }
  return choose;
}
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
function showcaseAnim(entity, set) {
  let chosearr = showcaseItems(set, 30)
  let totalnumber = chosearr.length
  let initialDelay = 2
  let delay = initialDelay
  let count = 0
  let number = 0
  system.run(function run() {
    if (count < delay) {
      count++
    } else if (count = delay) {
      count = 0
      number++
      let num = number - 1
      try {
        if (!chosearr[num].commands && chosearr[num].id) {
          let data = chosearr[num].data ? chosearr[num].data : 0
          entity.runCommandAsync(`replaceitem entity @s slot.weapon.mainhand 0 ${chosearr[num].id} 1 ${data}`)
          entity.nameTag = `${chosearr[num].name}`
          if (chosearr[num].hasEnchantment) {
            entity.runCommandAsync(`enchant @s unbreaking`)
          }
        } else {
          let data = chosearr[num].display.data ? chosearr[num].display.data : 0
          let id = chosearr[num].display.item ? chosearr[num].display.item : "minecraft:command_block"
          let name = chosearr[num].display.name ? chosearr[num].display.name : "???"
          entity.runCommandAsync(`replaceitem entity @s slot.weapon.mainhand 0 ${id} 1 ${data}`)
          entity.nameTag = `${name}`
          if (chosearr[num].display.foil) {
            entity.runCommandAsync(`enchant @s unbreaking`)
          }
        }
      } catch (error) {
        console.warn('!!! has errors in try catch')
      }
      entity.runCommandAsync(`playsound note.banjo @a ~~~`)
      num = 0
      let remaining = totalnumber - number
      if (remaining >= totalnumber * 2 / 3) {
        delay = initialDelay
      } else if (remaining >= totalnumber / 3) {
        delay = initialDelay * 1.5
      } else {
        delay = initialDelay * 3
      }
    }
    if (number >= totalnumber) return
    system.run(run)
  })
}
function giveReward(rollRewards, crateSource, crateType, playername) {
  rollRewards = shuffle(rollRewards);
  let totalWeight = 0
  for (let reward of rollRewards) {
    totalWeight += reward.chance
  }
  let randomWeight = Math.floor(Math.random() * totalWeight) + 1;
  for (let reward of rollRewards) {
    if (randomWeight <= reward.chance && randomWeight > 0) {
      let percentChance = (Math.round((1000 * (reward.chance / totalWeight)))) / 10
      if (!reward.commands && reward.id) {
        let amount = 1
        let data = reward.data || 0
        if (reward.amount) {
          if (Array.isArray(reward.amount)) {
            let minAmount = reward.amount[0];
            let maxAmount = reward.amount[1] || minAmount;
            if (minAmount > maxAmount) {
              [minAmount, maxAmount] = [maxAmount, minAmount];
            }
            amount = Math.floor(minAmount + Math.floor(Math.pow(Math.random(), 1.2) * (maxAmount - minAmount + 1)));
          } else {
            if (typeof reward.amount == `string`) {
              parseInt(reward.amount)
              if (isNaN(reward.amount)) { reward.amount = 1 }
              amount = reward.amount
            }
            else if (typeof reward.amount == `number`) {
              amount = reward.amount
            } else amount = 1
          }
        }
        crateSource.runCommandAsync(`replaceitem entity @s slot.inventory 0 ${reward.id} ${amount} ${data}`) //data
        const crateInv = crateSource.getComponent("inventory").container
        crateSource.runCommandAsync(`replaceitem entity @s slot.weapon.mainhand 0 ${reward.id} ${amount} ${data}`)//display
        system.runTimeout(() => {
          let itemStack = crateInv.getItem(0)
          crateInv.setItem(0, itemStack)
          let i = crateInv.getItem(0)
          i.nameTag = "§r§f" + reward.name + "§r"
          let lore = reward.lore || []
          i.setLore(lore)
          if (reward.hasEnchantment) {
            crateSource.runCommandAsync(`enchant @s unbreaking`)
            let enchantProperty = reward.hasEnchantment.enchantment
            let enchantAmount = reward.hasEnchantment.enchantAmount
            let enchantLevel = reward.hasEnchantment.level
            if (enchantProperty) {
              if (enchantAmount) {
                if (Array.isArray(enchantAmount)) {
                  let [min, max] = enchantAmount
                  enchantAmount = Math.floor(Math.random() * (max - min + 1)) + min
                } else {
                  if (typeof enchantAmount == `string`) {
                    enchantAmount = parseInt(enchantAmount)
                    if (isNaN(enchantAmount)) { enchantAmount = 1 }
                  } else if (typeof enchantAmount == `number`) {
                    enchantAmount = reward.hasEnchantment.enchantAmount
                  } else enchantAmount = 1
                }
              }
              let chosenEnchants = []
              if (Array.isArray(enchantProperty)) {
                for (let i = 0; i < enchantAmount; i++) {
                  let choose = enchantProperty[Math.floor(Math.random() * enchantProperty.length)]
                  chosenEnchants.push(choose)
                }
                for (let e = 0; e < chosenEnchants.length; e++) {
                  let maxEnchant = chosenEnchants[e][1]
                  if (enchantLevel) {
                    if (Array.isArray(enchantLevel)) {
                      let [min, max] = enchantLevel
                      if (max < maxEnchant) {
                        enchantLevel = Math.floor(Math.random() * (max - min + 1)) + min
                      }
                      if (max > maxEnchant) {
                        enchantLevel = Math.floor(Math.random() * (maxEnchant - min + 1)) + min
                      }
                    } else {
                      if (typeof enchantLevel == `string`) {
                        enchantLevel = parseInt(enchantLevel)
                        if (isNaN(enchantLevel)) { enchantLevel = 1 }
                      } else if (typeof enchantLevel == `number`) {
                        enchantLevel = reward.hasEnchantment.enchantLevel
                      } else enchantLevel = 1
                    }
                  }
                  if (!enchantLevel) { enchantLevel = 1 }
                  try {
                    let myEnchantment = new Enchantment(chosenEnchants[e][0], enchantLevel)
                    let a = i.getComponent(`enchantments`).enchantments
                    a.addEnchantment(myEnchantment)
                    i.getComponent(`enchantments`).enchantments = a
                  } catch (error) {
                    e = chosenEnchants.length
                  }
                }
              } else if (typeof enchantProperty == `string`) {
                try {
                  enchantProperty.toLowerCase() //checking for in the translateType
                  for (let i = 0; i < enchantAmount; i++) {
                    let choose = translateType[enchantProperty][Math.floor(Math.random() * enchantProperty.length)]
                    chosenEnchants.push(choose)
                  }
                  for (let e = 0; e < chosenEnchants.length; e++) {
                    let maxEnchant = chosenEnchants[e][1]
                    if (enchantLevel) {
                      if (Array.isArray(enchantLevel)) {
                        let [min, max] = enchantLevel
                        if (max < maxEnchant) {
                          enchantLevel = Math.floor(Math.random() * (max - min + 1)) + min
                        }
                        if (max > maxEnchant) {
                          enchantLevel = Math.floor(Math.random() * (maxEnchant - min + 1)) + min
                        }
                      } else {
                        if (typeof enchantLevel == `string`) {
                          enchantLevel = parseInt(enchantLevel)
                          if (isNaN(enchantLevel)) { enchantLevel = 1 }
                        } else if (typeof enchantLevel == `number`) {
                          enchantLevel = enchantLevel
                        } else enchantLevel = 1
                      }
                    }
                    if (!enchantLevel) { enchantLevel = 1 }
                    try {
                      let myEnchantment = new Enchantment(chosenEnchants[e][0], enchantLevel)
                      let a = i.getComponent(`enchantments`).enchantments
                      a.addEnchantment(myEnchantment)
                      i.getComponent(`enchantments`).enchantments = a
                    } catch (error) {
                      e = chosenEnchants.length
                    }
                  }
                } catch (error) {
                  switch (enchantProperty.toLowerCase()) {
                    case "aqua affinity":
                    case "aqua_affinity":
                    case "aquaaffinity":
                      chosenEnchants.push(any[0])
                      break;
                    case "bane of arthropods":
                    case "bane ofarthropods":
                    case "baneofarthropods":
                    case "bane_of_arthropods":
                    case "bane_ofarthropods":
                    case "baneof_arthropods":
                      chosenEnchants.push(any[1])
                      break;
                    case "blast protection":
                    case "blast_protection":
                    case "blastprotection":
                      chosenEnchants.push(any[2])
                      break;
                    case "channeling":
                      chosenEnchants.push(any[3])
                      break;
                    case "depth strider":
                    case "depth_strider":
                    case "depthstrider":
                      chosenEnchants.push(any[4])
                    case "efficiency":
                      chosenEnchants.push(any[5])
                      break;
                    case "feather falling":
                    case "feather_falling":
                    case "featherfalling":
                      chosenEnchants.push(any[6])
                    case "fire aspect":
                    case "fire_aspect":
                    case "fireaspect":
                      chosenEnchants.push(any[7])
                      break;
                    case "fire protection":
                    case "fire_protection":
                    case "fireprotection":
                      chosenEnchants.push(any[8])
                    case "flame":
                      chosenEnchants.push(any[9])
                      break;
                    case "fortune":
                      chosenEnchants.push(any[10])
                      break;
                    case "frost walker":
                    case "frost_walker":
                    case "frostwalker":
                      chosenEnchants.push(any[11])
                      break;
                    case "impaling":
                      chosenEnchants.push(any[12])
                      break;
                    case "infinity":
                      chosenEnchants.push(any[13])
                      break;
                    case "knockback":
                      chosenEnchants.push(any[14])
                      break;
                    case "looting":
                      chosenEnchants.push(any[15])
                      break;
                    case "loyalty":
                      chosenEnchants.push(any[16])
                      break;
                    case "luck of the sea":
                    case "luck of thesea":
                    case "luck ofthesea":
                    case "luckofthesea":
                    case "luck_of_the_sea":
                    case "luck_of_thesea":
                    case "luck_ofthesea":
                    case "luck_ofthe_sea":
                    case "luckof_the_sea":
                    case "luckof_thesea":
                      chosenEnchants.push(any[17])
                    case "lure":
                      chosenEnchants.push(any[18])
                      break;
                    case "mending":
                      chosenEnchants.push(any[19])
                      break;
                    case "multi shot":
                    case "multi_shot":
                    case "multishot":
                      chosenEnchants.push(any[20])
                      break;
                    case "piercing":
                      chosenEnchants.push(any[21])
                      break;
                    case "power":
                      chosenEnchants.push(any[22])
                      break;
                    case "projectile protection":
                    case "projectileprotection":
                    case "projectile_protection":
                      chosenEnchants.push(any[23])
                      break;
                    case "protection":
                      chosenEnchants.push(any[24])
                      break;
                    case "punch":
                      chosenEnchants.push(any[25])
                      break;
                    case "quick charge":
                    case "quick_charge":
                    case "quickcharge":
                      chosenEnchants.push(any[26])
                      break;
                    case "respiration":
                      chosenEnchants.push(any[27])
                      break;
                    case "riptide":
                      chosenEnchants.push(any[28])
                      break;
                    case "sharpness":
                      chosenEnchants.push(any[29])
                      break;
                    case "silk touch":
                    case "silk_touch":
                    case "silktouch":
                      chosenEnchants.push(any[30])
                      break;
                    case "smite":
                      chosenEnchants.push(any[31])
                      break;
                    case "soul speed":
                    case "soul_speed":
                    case "soulspeed":
                      chosenEnchants.push(any[32])
                      break;
                    case "sweeping edge":
                    case "sweeping_edge":
                    case "sweepingedge":
                      chosenEnchants.push(any[33])
                      break;
                    case "thorns":
                      chosenEnchants.push(any[34])
                      break;
                    case "unbreaking":
                      chosenEnchants.push(any[35])
                      break;
                    default:
                      break;
                  }
                  let maxEnchant
                  try { maxEnchant = chosenEnchants[0][1] }
                  catch { maxEnchant = 1 }
                  if (enchantLevel) {
                    if (Array.isArray(enchantLevel)) {
                      let [min, max] = enchantLevel
                      if (max < maxEnchant) {
                        enchantLevel = Math.floor(Math.random() * (max - min + 1)) + min
                      }
                      if (max > maxEnchant) {
                        enchantLevel = Math.floor(Math.random() * (maxEnchant - min + 1)) + min
                      }
                    } else {
                      if (typeof enchantLevel == `string`) {
                        enchantLevel = parseInt(enchantLevel)
                        if (isNaN(enchantLevel)) { enchantLevel = 1 }
                      } else if (typeof enchantLevel == `number`) {
                        enchantLevel = reward.hasEnchantment.enchantLevel
                      } else enchantLevel = 1
                    }
                  }
                  if (!enchantLevel) { enchantLevel = 1 }
                  try {
                    let myEnchantment = new Enchantment(chosenEnchants[0][0], enchantLevel)
                    let a = i.getComponent(`enchantments`).enchantments
                    a.addEnchantment(myEnchantment)
                    i.getComponent(`enchantments`).enchantments = a
                  } catch (error) {
                  }

                }
              } else {
                enchantProperty = any
                for (let i = 0; i < enchantAmount; i++) {
                  let choose = enchantProperty[Math.floor(Math.random() * enchantProperty.length)]
                  chosenEnchants.push(choose)
                }
                for (let e = 0; e < chosenEnchants.length; e++) {
                  let maxEnchant = chosenEnchants[e][1]
                  if (enchantLevel) {
                    if (Array.isArray(enchantLevel)) {
                      let [min, max] = enchantLevel
                      if (max < maxEnchant) {
                        enchantLevel = Math.floor(Math.random() * (max - min + 1)) + min
                      }
                      if (max > maxEnchant) {
                        enchantLevel = Math.floor(Math.random() * (maxEnchant - min + 1)) + min
                      }
                    } else {
                      if (typeof enchantLevel == `string`) {
                        enchantLevel = parseInt(enchantLevel)
                        if (isNaN(enchantLevel)) { enchantLevel = 1 }
                      } else if (typeof enchantLevel == `number`) {
                        enchantLevel = reward.hasEnchantment.enchantLevel
                      } else enchantLevel = 1
                    }
                  }
                  if (!enchantLevel) { enchantLevel = 1 }
                  try {
                    let myEnchantment = new Enchantment(chosenEnchants[e][0], enchantLevel)
                    let a = i.getComponent(`enchantments`).enchantments
                    a.addEnchantment(myEnchantment)
                    i.getComponent(`enchantments`).enchantments = a
                  } catch (error) {
                    e = chosenEnchants.length
                  }
                }
              }
            }
          }
          crateSource.nameTag = `§6${amount}§rx §e${reward.name}§r`
          crateSource.runCommandAsync(`particle minecraft:totem_particle ~~1.2~`)
          crateInv.setItem(0, i)
          let r = system.runTimeout(() => { //reset every 10 mins if player not found
            crateSource.runCommandAsync(`playsound random.pop2 @a ~~1.5~`)
            crateSource.runCommandAsync(`particle minecraft:dragon_destroy_block ~~1.5~`)
            crateSource.runCommandAsync(`replaceitem entity @s slot.inventory 0 air`)
            crateSource.triggerEvent(`azalea:event2.5`);
            system.clearRun(z)
          }, 12000)
          let z = system.runInterval(() => {
            for (let player of world.getPlayers({ name: playername })) { //way2 - check player
              crateSource.dimension.spawnItem(i, player.location)
              player.runCommandAsync(`tellraw @a[name=!"${player.name}"] {"rawtext":[{"text":" §f${player.name}§7 got a §e${reward.name}§r§7! from §f${crateType}§r§7!"}]}`)
              player.sendMessage(` Congratulations! You got §6${amount}§rx §e${reward.name}§r from ${crateType}!!! §7(Chance: §f${percentChance} %%§7)§r`)
              system.runTimeout(
                () => {
                  crateSource.runCommandAsync(`playsound random.pop2 @a ~~1.5~`)
                  crateSource.runCommandAsync(`particle minecraft:dragon_destroy_block ~~1.5~`)
                  crateSource.runCommandAsync(`replaceitem entity @s slot.inventory 0 air`)
                  crateSource.triggerEvent(`azalea:event2.5`);
                }, //reset Crate
                70
              )
              system.clearRun(z)
              system.clearRun(r)
            } // if not found, auto iterate again
          }, 10)
        }, 1)
      }
      else {
        let name = reward.display.name || `Reward`
        let message = reward.display.message || `Congratulations! You got §e${name}§r from ${crateType}!!! §7(Chance: §f${percentChance} %%§7)`
        let item = reward.display.item || `minecraft:command_block`
        let data = reward.display.data || 0
        let enchant = (reward.display.foil || false)
        let commands = reward.commands
        crateSource.nameTag = `§f${name}§r`
        crateSource.runCommandAsync(`replaceitem entity @s slot.weapon.mainhand 0 ${item} 1 ${data}`)
        crateSource.runCommandAsync(`particle minecraft:totem_particle ~~1.2~`)
        if (enchant) { crateSource.runCommandAsync(`enchant @s unbreaking`) }
        let reset = system.runTimeout(() => { //reset every 10 mins if player not found
          crateSource.runCommandAsync(`playsound random.pop2 @a ~~1.5~`)
          crateSource.runCommandAsync(`particle minecraft:dragon_destroy_block ~~1.5~`)
          crateSource.triggerEvent(`azalea:event2.5`);
          system.clearRun(z)
        }, 12000)
        let z = system.runInterval(() => {
          for (let player of world.getPlayers({ name: playername })) { //way2 - check player
            try {
              if (Array.isArray(commands)) {
                for (const cmd of commands) {
                  player.runCommandAsync(cmd)
                }
              }
              if (typeof commands == `string`) { player.runCommandAsync(commands) }
              player.runCommandAsync(`tellraw @a[name=!"${player.name}"] {"rawtext":[{"text":" §f${player.name}§7 got a reward from §f${crateType}§r§7!"}]}`)
              player.sendMessage(` ${message}§r`)
            } catch (error) { //fail safe
              player.sendMessage(` §7There's a problem with the command reward.§r`)
            }
            system.runTimeout(
              () => {
                crateSource.runCommandAsync(`playsound random.pop2 @a ~~1.5~`)
                crateSource.runCommandAsync(`particle minecraft:dragon_destroy_block ~~1.5~`)
                crateSource.triggerEvent(`azalea:event2.5`);
              }, //reset Crate
              70
            )
            system.clearRun(z)
            system.clearRun(reset)
          } // if not found, auto iterate again
        }, 10)
      }
    }
    randomWeight -= reward.chance
  }
}
function getCrateType(entity, prefix) {
  return entity.getTags().find(e => e.startsWith(prefix)).substring(prefix.length)
}
function retag(crate) {
  crate.removeTag(`reward:0`)
  crate.removeTag(`reward:1`)
  crate.removeTag(`reward:2`)
  crate.removeTag(`reward:3`)
  crate.removeTag(`reward:4`)
  crate.removeTag(`reward:5`)
  crate.removeTag(`reward:6`)
  crate.removeTag(`reward:7`)
  crate.removeTag(`reward:8`)
  crate.removeTag(`reward:9`)
}

system.runInterval(() => {
  for (const player of world.getPlayers({ tags: ['hk'] })) {
    const inv = player.getComponent("minecraft:inventory").container;
    for (let i = 0; i < inv.size; i++) {
      const item = inv.getItem(i);
      const keyName = keys.get(item?.typeId);
      if (keyName && item.nameTag != `§r§f${keyName}§r`) {
        item.nameTag = `§r§f${keyName}§r`;
        inv.setItem(i, item);
      }
    }
  }
}, 20);

world.afterEvents.itemUseOn.subscribe(create => {
  let player = create.source
  if (player instanceof Player) {
    const item = player.getComponent('minecraft:inventory').container.getItem(player.selectedSlot);
    if (item?.typeId == 'azalea:crate_spawn_egg') {
      player.addTag(`wp`)
    }
  }
})

world.afterEvents.entityHitEntity.subscribe((crate) => {
  let player = crate.entity
  let crateName
  if (crate.hitEntity?.typeId === `azalea:crate` && player instanceof Player) {
    if (!crate.hitEntity.hasTag(`named`) && !crate.hitEntity.hasTag(`noname`)) return
    if (crate.hitEntity.hasTag(`noname`)) {
      crateName = "Crate"
    }
    if (crate.hitEntity.hasTag(`named`)) {
      crateName = getCrateType(crate.hitEntity, `cname:`)
    }
    if (!player.isSneaking) {
      let reward = getCrateType(crate.hitEntity, `reward:`)
      let parse = parseInt(reward)
      let arr = rewardsSet[parse]
      let list =
        arr.map(reward => {
          let totalWeight = 0;
          for (let reward of arr) {
            totalWeight += reward.chance;
          }
          let percentChance = (Math.round((1000 * (reward.chance / totalWeight)))) / 10;

          return { name: (reward.name || reward.display.name), percentChance };
        })
          .sort((a, b) => b.percentChance - a.percentChance)
          .map(reward => `  §e${reward.percentChance}§f%% §7:§r ${reward.name} `)
          .join('\n\n');
      let showReward = new ActionFormData()
      let text
      if (arr.length >= 1) {
        text = `\n           ||  §lITEM CHANCES:§r  ||§r\n\n` + list + `\n `
      } else {
        text = `\n           ||  §lITEM CHANCES:§r  ||§r\n\n  §cNO REWARDS LISTED§r\n `
      }
      showReward.title(`${crateName} §rRewards`)
      showReward.body(text)
      showReward.button(`Okay`)
      showReward.show(player)
    }
    if (player.isSneaking && player.hasTag(`admin`)) {
      player.runCommandAsync(`playsound note.cow_bell @s ~~~ 1 3`)
      let kill = new MessageFormData()
      kill.title(`Remove Crate ${crateName}`)
      kill.body(`\nAre you sure you want to remove this crate? This action cannot be undone.\n\n`)
      kill.button2(`§4§lDELETE§r`)
      kill.button1(`Cancel`)
      kill.show(player).then(r => {
        if (r.canceled) return
        if (r.selection === 0) {
          player.runCommandAsync(`playsound note.bit @s ~~~ 1 3`)
          return;
        };
        crate.hitEntity.triggerEvent(`azalea:kill`)
        player.runCommandAsync(`playsound note.guitar @s ~~~ 1 3`)
        player.runCommandAsync(`title @s actionbar Crate removed Succesfully`)
      }).catch(e => {
        console.error(e, e.stack);
      });
    }
  }
})


world.beforeEvents.dataDrivenEntityTriggerEvent.subscribe((target) => {
  let entity = target.entity
  let event = target.id
  system.run(() => {
  if (entity.typeId == 'azalea:crate' && event == 'azalea:event2') {
    entity.runCommandAsync(`replaceitem entity @s slot.weapon.offhand 0 air`)
    entity.runCommandAsync(`replaceitem entity @s slot.weapon.mainhand 0 air`)
    let crateName = getCrateType(entity, `cname:`)
    let getReward = getCrateType(entity, `reward:`)
    let playername = getCrateType(entity, `opener:`)
    let parse = parseInt(getReward)
    let reward = rewardsSet[parse]
    entity.removeTag(`opener:${playername}`)
    entity.nameTag = ""
    giveReward(reward, entity, crateName, playername)
  }
  if (entity.typeId == 'azalea:crate' && event == 'azalea:notkey') {
    let key = getCrateType(entity, `key`)
    let keyparse = parseInt(key)
    let keyopener = ``
    switch (keyparse) {
      case 1:
        keyopener = keynames.key1_name
        break;
      case 2:
        keyopener = keynames.key2_name
        break;
      case 3:
        keyopener = keynames.key3_name
        break;
      case 4:
        keyopener = keynames.key4_name
        break;
      case 5:
        keyopener = keynames.key5_name
        break;
      case 6:
        keyopener = keynames.key6_name
        break;
      case 7:
        keyopener = keynames.key7_name
        break;
      case 8:
        keyopener = keynames.key8_name
        break;
      case 9:
        keyopener = keynames.key9_name
        break;
      case 10:
        keyopener = keynames.key10_name
        break;
    }
    for (let player of world.getAllPlayers()) {
      if (player.hasTag(`notkey`)) {
        player.removeTag(`notkey`)
        player.runCommandAsync(`title @s actionbar You need to use ${keyopener}`)
      }
    }
  }
  if (entity.typeId == 'azalea:crate' && event == 'azalea:event1' && entity.getComponent(`variant`).value == 2) {
    let getReward = getCrateType(entity, `reward:`)
    let reward = rewardsSet[parseInt(getReward)]
    entity.triggerEvent(`azalea:showcasename`)
    showcaseAnim(entity, reward)
  }
  if (entity.typeId == 'azalea:crate' && event == 'azalea:event2.5') {
    entity.nameTag = ""
  }
  if (entity.typeId == 'azalea:crate' && event == 'azalea:event3' && !entity.hasTag("hasitem") && !entity.hasTag("idle")) {
    let crateName = getCrateType(entity, `cname:`)
    let subName = getCrateType(entity, `csname:`)
    entity.nameTag = `${crateName}§r\n${subName}`
    let delay = 4
    let cur = 0
    system.run(function run() {
      if (cur < delay) {
        cur++
        system.run(run)
      } else if (entity) {
        entity.triggerEvent(`azalea:refresh`)
        entity.addTag(`idle`)
      }
    })
  }
  if (entity.typeId == 'azalea:crate' && event == 'azalea:openevent') {
    let cratename = getCrateType(entity, `cname:`)
    entity.nameTag = ""
    system.runTimeout(() => {
      for (let player of world.getPlayers({ tags: ['opener'] })) {
        entity.addTag(`opener:${player.name}`)
        player.runCommandAsync(`tag @s remove opener`)
        world.sendMessage(` §o§f${player.name}§7 is opening a §r§o${cratename}§r§o§7!§r`)
        break
      }
    }, 1)
  }
})
})

let random = 0
const crateNames = [`§l§eAzalea Crate§r`, `§l§fCommon Crate§r`, `§l§eRare Crate§r`, `§l§6Epic Crate§r`, `§l§bLegendary Crate§r`, `§l§dMythical Crate§r`]
world.afterEvents.entitySpawn.subscribe(({ entity }) => {
  if (entity.typeId == "azalea:crate" && !entity.hasTag("named") && !entity.hasTag("noname")) {
    let player = world.getAllPlayers().find(player => player.hasTag(`wp`))
    if (player) {
      player.runCommandAsync(`playsound note.cow_bell @s ~~~ 1`)
      const loot = [rewardnames.set1_name, rewardnames.set2_name, rewardnames.set3_name, rewardnames.set4_name, rewardnames.set5_name, rewardnames.set6_name, rewardnames.set7_name, rewardnames.set8_name, rewardnames.set9_name, rewardnames.set10_name]
      const skin = ["Normal Chest", "Ender Chest", "Custom Crates"]
      const animation = ["Quick", "Vortex", "Showcase"]
      const halo = ["No Halo", "Flame", "Blue Flame", "Happy Green", "Snow", "Enchant Characters"]
      let setup = new ModalFormData()
      setup.title(`§lCrate Setup§r`)
      setup.textField('\nCrate Name', `write crate name here`, `${crateNames[random]}`)
      setup.textField('\nCrate Sub-Name', `write crate sub-name here`, `§r§7[Use Key to Open]§r`)
      setup.dropdown('Loot Table', loot) //tag
      setup.show(player).then(r => {
        if (r.canceled) {
          entity.triggerEvent(`azalea:kill`)
          player.sendMessage(` §cCrate Creation Canceled§r`)
          return
        };
        let [cratename,subname,rewardtable] = r.formValues;
        if (cratename.length > 0) {
          entity.nameTag = `${cratename}§r\n${subname}`
          entity.addTag(`named`)
          entity.addTag(`cname:${cratename}`)
          entity.addTag(`csname:${subname}`)
        } else {
          entity.nameTag = `???\n${subname}`
          entity.addTag(`noname`)
        }
        let arr
        switch (rewardtable) {
          case 0:
            retag(entity)
            entity.addTag(`reward:0`);
            arr = rewardsSet[0]
            break;
          case 1:
            retag(entity)
            entity.addTag(`reward:1`);
            arr = rewardsSet[1]
            break;
          case 2:
            retag(entity)
            entity.addTag(`reward:2`);
            arr = rewardsSet[2]
            break;
          case 3:
            retag(entity)
            entity.addTag(`reward:3`);
            arr = rewardsSet[3]
            break;
          case 4:
            retag(entity)
            entity.addTag(`reward:4`);
            arr = rewardsSet[4]
            break;
          case 5:
            retag(entity)
            entity.addTag(`reward:5`);
            break;
          case 6:
            retag(entity)
            entity.addTag(`reward:6`);
            arr = rewardsSet[6]
            break;
          case 7:
            retag(entity)
            entity.addTag(`reward:7`);
            arr = rewardsSet[7]
            break;
          case 8:
            retag(entity)
            entity.addTag(`reward:8`);
            arr = rewardsSet[8]
            break;
          case 9:
            retag(entity)
            entity.addTag(`reward:9`);
            arr = rewardsSet[10]
            break;
          default:
            retag(entity)
            entity.addTag(`reward:0`);
            arr = rewardsSet[0]
            break;
        }
        let display = new ModalFormData()
        display.title(`§l${cratename} Display§r`)
        display.dropdown('\nCrate Skin', skin) //skin id component
        display.dropdown('Animation', animation) //variant component
        display.dropdown('Halo Particle', halo) //property int
        display.show(player).then(d => {
          if (d.canceled) {
            entity.triggerEvent(`azalea:kill`)
            player.sendMessage(` §cCrate Creation Canceled§r`)
            return
          }
          let [crateskin, animation, particle] = d.formValues
          switch (crateskin) {
            case 0:
              entity.triggerEvent(`azalea:skin0`)
              break;
            case 1:
              entity.triggerEvent(`azalea:skin1`)
              break;
            case 2:
              entity.triggerEvent(`azalea:skin2`)
              break;
            default:
              break;
          }
          switch (animation) {
            case 0:
              entity.triggerEvent(`azalea:animation0`)
              break;
            case 1:
              entity.triggerEvent(`azalea:animation1`)
              break;
            case 2:
              entity.triggerEvent(`azalea:animation2`)
              break;
            default:
              entity.triggerEvent(`azalea:animation0`)
              break;
          }
          switch (particle) {
            case 0:
              entity.triggerEvent(`azalea:halo0`)
              break;
            case 1:
              entity.triggerEvent(`azalea:halo1`)
              break;
            case 2:
              entity.triggerEvent(`azalea:halo2`)
              break;
            case 3:
              entity.triggerEvent(`azalea:halo3`)
              break;
            case 4:
              entity.triggerEvent(`azalea:halo4`)
              break;
            case 5:
              entity.triggerEvent(`azalea:halo5`)
              break;
            default:
              entity.triggerEvent(`azalea:halo0`)
              break;
          }
          let key = new ActionFormData()
          key.title(`§l${cratename} Key§r`)
          key.body("Choose Key for this Crate")
          key.button(keynames.key1_name, "textures/keys/1")
          key.button(keynames.key2_name, "textures/keys/2")
          key.button(keynames.key3_name, "textures/keys/3")
          key.button(keynames.key4_name, "textures/keys/4")
          key.button(keynames.key5_name, "textures/keys/5")
          key.button(keynames.key6_name, "textures/keys/6")
          key.button(keynames.key7_name, "textures/keys/7")
          key.button(keynames.key8_name, "textures/keys/8")
          key.button(keynames.key9_name, "textures/keys/9")
          key.button(keynames.key10_name, "textures/keys/10")
          key.show(player).then(k => {
            if (k.canceled) {
              entity.triggerEvent(`azalea:kill`)
              player.sendMessage(` §cCrate Creation Canceled§r`)
              return
            }
            entity.triggerEvent(`azalea:clearkey`)
            switch (k.selection) {
              case 0:
                entity.runCommandAsync(`tag @s add key1`)
                break;
              case 1:
                entity.runCommandAsync(`tag @s add key2`);
                break;
              case 2:
                entity.runCommandAsync(`tag @s add key3`);
                break;
              case 3:
                entity.runCommandAsync(`tag @s add key4`);
                break;
              case 4:
                entity.runCommandAsync(`tag @s add key5`);
                break;
              case 5:
                entity.runCommandAsync(`tag @s add key6`);
                break;
              case 6:
                entity.runCommandAsync(`tag @s add key7`);
                break;
              case 7:
                entity.runCommandAsync(`tag @s add key8`);
                break;
              case 8:
                entity.runCommandAsync(`tag @s add key9`);
                break;
              case 9:
                entity.runCommandAsync(`tag @s add key10`);
                break;
            }
            entity.triggerEvent(`azalea:interact`);
          })

          if (arr.length >= 1) {
            player.sendMessage(` §eCrate is now configured\n§7Crate Name§r: ${cratename}`)
          } else { player.sendMessage(` §eCrate is now configured\n§7Crate Name§r: ${cratename}\n §cNO REWARDS LISTED§r`) }
        }
        )
      }
      ).catch(e => {
        console.error(e, e.stack);
      });
      if (random <= 5) { random++ }
      if (random > 5) { random = 0 }
      player.removeTag(`wp`)
    }
  }
});











