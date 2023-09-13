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

// ------- TEST IDS: ---------
// Gaz id: 76561198818648238
// Nick id: 76561198129259594
// Mik id: 76561198037615241
// Ste id: 76561198157220342
// Dave id: 76561198188677214

export const useStatStore = defineStore('stats', {
    state: () => ({
        userSteamStats: [] as Array<{ user: Profile; stats: any; }>,
        currentSteamId: "",
    }),

    actions: {
        /**
         * Retrieve and store Steam statistics for a player with the specified Steam ID.
         * @param steamId - The Steam ID of the player for whom you want to retrieve and store statistics.
         * Populate the userSteamStats array with user profile and rust stats.
         */
        async getSteamStats(steamId: string): Promise<void> {
            try {
                // get player profile info
                const profile: Profile = await this.getPlayerInfo(steamId);
                const response = await axios
                    .get(`api/ISteamUserStats/GetUserStatsForGame/v0002/?appid=${RUST_APP_ID}&key=${API_KEY}&steamid=${steamId}`)

                // Create object for user profile and their stats.
                const statsObject: { user: Profile; stats: any; } = { user: profile, stats: response.data.playerstats.stats };
                this.userSteamStats.push(statsObject);

                // once array has been created, combine stats of Stones, Cloth, and wood.
                this.combineStats(this.userSteamStats, 'harvested_stones', 'harvest.stones', 'stones')
                this.combineStats(this.userSteamStats, 'harvested_wood', 'harvest.wood', 'wood')
                this.combineStats(this.userSteamStats, 'harvested_cloth', 'harvest.cloth', 'cloth')

                // debug print
                // console.log(this.userSteamStats)

            } catch (error) {
                console.error(error)
            }
        },

        /**
         * Retrieve the number of hours rust hours played for the user.
         * @param steamId - The steam64Id of the user.
         * @returns A promise that is stats from the user's account, populating the Profile interface alongside their rust hours.
         */
        async getPlayerInfo(steamId: string): Promise<Profile> {
            try {
                const playerHours = await this.getPlayerHours(steamId)

                const response = await axios
                    .get(`api/ISteamUser/GetPlayerSummaries/v0002/?key=${API_KEY}&steamids=${steamId}`)

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

        /**
         * Retrieve the number of hours rust hours played for the user.
         * @param steamId - The steam64Id of the user.
         * @returns A promise that is either the hours played, or null if they user does not own rust.
         */
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

        /**
         * Combines two specified stats into a new stat for each user in an array of user stats entries.
         * Used on Stones, Cloth, Wood etc.
         * @param steamStats - An array of user stats entries.
         * @param statOne - The name of the first stat to combine.
         * @param statTwo - The name of the second stat to combine.
         * @param newStat - The name of the new stat created by combining statOne and statTwo.
         */
        combineStats(steamStats: any, statOne: string, statTwo: string, newStat: string) {
            // Iterate through each user.stats in the array
            steamStats.forEach((item: any) => {
                // Find the indices of statOne and statTwo in the stats array of the current user
                const indexOne = item.stats.findIndex((stat: any) => stat.name === statOne);
                const indexTwo = item.stats.findIndex((stat: any) => stat.name === statTwo);

                // Check if both statOne and statTwo are found
                if (indexOne !== -1 && indexTwo !== -1) {

                    // Get the values of statOne and statTwo
                    const valueOne = item.stats[indexOne].value;
                    const valueTwo = item.stats[indexTwo].value;

                    // Calculate the combined value
                    const combinedValue = valueOne + valueTwo;

                    // Create a new stat with new name and combined value
                    const combinedStat = { name: newStat, value: combinedValue}

                    // Add combinedStat to the object at the index of statOne and remove statTwo from the array
                    item.stats.splice(indexOne, 1, combinedStat);
                    item.stats.splice(indexTwo, 1);
                }
            });
        },

        /**
         * Get a specific statistic value by key for a user at the specified index.
         * @param steamStats - user stats.
         * @param index - The index of the player.
         * @param key - The name of the statistic you would like.
         * @returns The value of the specified statistic.
         */
        getStatByKey(steamStats: any, index: number, key: string): number | undefined {
            // loop through stats array
            for (const stat of steamStats[index].stats) {
                // check the stat name and key match
                if (stat.name === key) {
                    return stat.value;
                }
            }

            return undefined
        },

        /**
         * Compare stats across all users based on the specified key returning the lowest or highest value.
         * @param key - The name of the stat to compare.
         * @param lowest - If true, find the lowest value; otherwise, find the highest value.
         * @returns The highest or lowest value of the specified stat among users.
         */
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

        /**
         * Remove a user.
         * @param index - The index of the user to remove.
         */
        removePlayer(index: number): void {
            // Check if index is within the array
            if (index >= 0 && index < this.userSteamStats.length) {
                // remove user at the specified index.
                this.userSteamStats.splice(index, 1)
            }
        },
    }
})