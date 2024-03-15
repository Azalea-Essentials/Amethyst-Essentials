import { Player, Vector3 } from "@minecraft/server";

type leaderboard = {
    title: string,
    objective: string,
    theme: string,
}
type leaderboardTheme = {
    id: string,
    name: string,
    colors: {
        titleText: string,
        number: string,
        defaultName: string,
        defaultRank: string,
        score: string,
    },
    pos: Vector3
}
type score = {
    id: string,
    score: number
}
type playerCache = {
    playerName: string,
    tags: string[],
    scores: score[]
}
function cyrb128(str) {
    let h1 = 1779033703, h2 = 3144134277,
        h3 = 1013904242, h4 = 2773480762;
    for (let i = 0, k; i < str.length; i++) {
        k = str.charCodeAt(i);
        h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
        h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
        h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
        h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
    }
    h1 = Math.imul(h3 ^ (h1 >>> 18), 597399067);
    h2 = Math.imul(h4 ^ (h2 >>> 22), 2869860233);
    h3 = Math.imul(h1 ^ (h3 >>> 17), 951274213);
    h4 = Math.imul(h2 ^ (h4 >>> 19), 2716044179);
    h1 ^= (h2 ^ h3 ^ h4), h2 ^= h1, h3 ^= h1, h4 ^= h1;
    return [h1>>>0, h2>>>0, h3>>>0, h4>>>0];
}
export function playerId(player: Player) {

}
class LeaderboardManager {
    leaderboards: leaderboard[];
    themes: leaderboardTheme[];
    constructor() {

    }
}