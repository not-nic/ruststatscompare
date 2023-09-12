import { defineStore } from "pinia";
import axios from "axios";

const API_KEY: string = import.meta.env.VITE_API_KEY;
const RUST_APP_ID: string = "252490";

export interface Profile {
    steamId: string | null,
    name: string | null,
    dateCreated: string | null,
    avatarUrl: string | null,
    hours: number | null,
}

// Gaz id: 76561198818648238
// Nick id: 76561198129259594
// Mik id: 76561198037615241
// Ste id: 76561198157220342

export const useStatStore = defineStore('stats', {
    state: () => ({
        userSteamStats: [] as Array<{ user: Profile; stats: any; }>,
        currentSteamId: "",
    }),

    actions: {
        async getSteamStats(steamId: string): Promise<void> {
            try {
                // get player profile info
                const profile: Profile = await this.getPlayerInfo(steamId);
                const response = await axios
                    .get(`api/ISteamUserStats/GetUserStatsForGame/v0002/?appid=${RUST_APP_ID}&key=${API_KEY}&steamid=${steamId}`)

                // Create object for user profile and their stats.
                const statsObject: { user: Profile; stats: any; } = { user: profile, stats: response.data.playerstats.stats };
                this.userSteamStats.push(statsObject);
            } catch (error) {
                console.error(error)
            }
        },

        async getPlayerInfo(steamId: string): Promise<Profile> {
            try {
                const playerHours = await this.getPlayerHours(steamId)

                const response = await axios
                    .get(`api/ISteamUser/GetPlayerSummaries/v0002/?key=${API_KEY}&steamids=${steamId}`)

                // debug print
                // console.log(response.data.response.players[0].personaname)

                let player = response.data.response.players[0];

                // return steam profile stats
                return {
                    steamId: player.steamid,
                    name: player.personaname,
                    dateCreated: new Date(player.timecreated * 1000).toDateString(),
                    avatarUrl: player.avatarfull,
                    hours: playerHours
                }

            } catch (error) {
                console.error(error)
                return null as Profile
            }
        },

        async getPlayerHours(steamId: string): Promise<number | null> {
            try {
                const response = await axios
                    .get(`api/IPlayerService/GetOwnedGames/v0001/?key=${API_KEY}&steamid=${steamId}&format=json`)
                let games = response.data.response.games;

                // Iterate over games, until rust is found
                for (let game of games) {
                    if (game.appid == RUST_APP_ID) {
                        return game.playtime_forever / 60
                    }
                }

                // Return null if the user does not own rust.
                return null;
            } catch (error) {
                console.error(error)
                return null
            }
        },

        getStatByKey(steamStats: any, index: number, key: string): number | undefined {
            // loop through stats array
            for (const stat of steamStats[index].stats) {
                // check the stat name and key match
                if (stat.name === key) {
                    // return value
                    return stat.value;
                }
            }

            return undefined
        },

        compareStats(key: string, lowest: boolean = false): number {
            return this.userSteamStats.reduce((value, user) => {
                const userStat = user.stats.find(stat => stat.name === key);

                if (userStat) {
                    // check if looking for lowest stat
                    if (lowest) {
                        // Check if user value is smaller than the current lowest value.
                        if (userStat.value < value) {
                            return userStat.value;
                        }
                    } else {
                        // Check if user value is larger than the current highest value.
                        if (userStat.value > value) {
                            return userStat.value;
                        }
                    }
                }

                // value is not larger/smaller, so the highest/smallest value remains unchanged.
                return value;
            }, lowest ? Number.MAX_SAFE_INTEGER : Number.MIN_SAFE_INTEGER); // use MAX & MIN safe integer to ensure stat value is smaller.
        },
        removePlayer(index: number): void {
            if (index >= 0 && index < this.userSteamStats.length) {
                this.userSteamStats.splice(index, 1)
            }
        },
    }
})