
scoreboard objectives add countdown dummy
scoreboard objectives add time dummy
scoreboard players add global time 1
scoreboard players set #countdown countdown 12000
scoreboard players set #timer countdown 12000
schedule function clear_lag:start_timer 20m
