import { defineStore } from "pinia";
import axios from "axios";

const API_KEY: string = import.meta.env.VITE_STEAM_API_KEY;
const RUST_APP_ID: string = "252490";

export interface Profile {
    steamId: string,
    name: string,
    dateCreated: string,
    avatarUrl: string,
    hours: number,
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
         * @param steamInput - An input of either a steam profile link or 64ID to get stats for that player.
         * Populate the userSteamStats array with user profile and rust stats.
         */
        async getSteamStats(steamInput: string): Promise<void> {
            try {

                const steamId = await this.getSteamId(steamInput)

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
                this.combineStats(this.userSteamStats, 'bullet_hit_corpse', 'bullet_hit_playercorpse', 'corpses')

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
                // return empty profile.
                return {
                    steamId: '',
                    name: '',
                    dateCreated: '',
                    avatarUrl: '',
                    hours: 0,
                };
            }
        },

        /**
         * Retrieve the number of hours rust hours played for the user.
         * @param steamId - The steam64Id of the user.
         * @returns A promise that is either the hours played, or null if they user does not own rust.
         */
        async getPlayerHours(steamId: string): Promise<number> {
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

                // Return 0 if the player does not own rust.
                return 0;
            } catch (error) {
                console.error(error)
                return 0
            }
        },

        /**
         * Get a steam64ID from a steam vanity URL.
         * @param vanityUrl - user vanity url e.g. id/GawZ
         * @returns String containing the 64ID.
         */
        async getIdFromVanityURL(vanityUrl: string): Promise<string> {
            try {
                const response = await axios
                    .get(`/api/ISteamUser/ResolveVanityURL/v0001/?key=${API_KEY}&vanityurl=${vanityUrl}`)
                return response.data.response.steamid;
            } catch (error) {
                console.error(error)
                return ""
            }
        },

        /**
         * Gets a Steam ID from various input formats.
         * @param steamInput - The input string that can be a Steam ID, vanity URL, or profile URL.
         * @returns A Promise that resolves to a Steam ID as a string.
         */
        async getSteamId(steamInput: string): Promise<string> {
            let steamId: string = steamInput;

            // check if the url contains '/id', if yes extract the vanity url and get the steamId.
            if (steamInput.includes("id/")) {
                const vanityUrl = steamInput.split("id/")[1].split('/')[0];
                steamId = await this.getIdFromVanityURL(vanityUrl);

            // check if the url contains '/profiles', if yes extract the 64 ID and set the steamId.
            } else if (steamInput.includes("profiles/")) {
                steamId = steamInput.split("profiles/")[1].split('/')[0];

            // If the number is a numeric string, assume it's a valid 64ID.
            } else if (!isNaN(parseInt(steamInput, 10))) {
                steamId = steamInput;
            }

            return steamId;
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
        getStatByKey(steamStats: any, index: number, key: string): number {
            // loop through stats array
            for (const stat of steamStats[index].stats) {
                // check the stat name and key match
                if (stat.name === key) {
                    return stat.value;
                }
            }

            return 0
        },

        /**
         * Compare stats across all users based on the specified key returning the lowest or highest value.
         * @param key - The name of the stat to compare.
         * @param lowest - If true, find the lowest value; otherwise, find the highest value.
         * @returns The highest or lowest value of the specified stat among users.
         */
        compareStats(key: string, lowest: boolean = false): number {
            return this.userSteamStats.reduce((value, user) => {
                const userStat = user.stats.find((stat: any) => stat.name === key);

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
            }, lowest ? 0 : 0);
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