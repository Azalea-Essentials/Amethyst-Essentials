execute as @a[scores={#timer=10}] run say Clearing lag in 10s!
execute as @a[scores={#timer=5}] run say Clearing lag in 5s!
execute as @a[scores={#timer=4}] run say Clearing lag in 4s!
execute as @a[scores={#timer=3}] run say Clearing lag in 3s!
execute as @a[scores={#timer=2}] run say Clearing lag in 2s!
execute as @a[scores={#timer=1}] run say Clearing lag in 1s!
execute as @a[scores={#timer=0}] run say Clearing lag!
execute as @a[scores={#timer=0}] run kill @e[type=item]
scoreboard players reset @a[scores={#timer=0}] #timer
scoreboard players set #countdown countdown 12000
schedule function clear_lag:start_timer 20m
