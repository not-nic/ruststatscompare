import { defineStore } from "pinia";
import axios from "axios";

const API_KEY: string = import.meta.env.VITE_API_KEY;
const RUST_APP_ID: string = "252490";

interface Profile {
    steamId: string | null,
    name: string | null,
    dateCreated: string | null,
    avatarUrl: string | null,
    hours: number | null,
}

export const useStatStore = defineStore('stats', {
    state: () => ({

        // Hardcoded stats for testing.
        // { "user": "Nic", "stats": [ { "name": "deaths", "value": 11099 }, { "name": "bullet_fired", "value": 241559 }, { "name": "arrow_fired", "value": 37190 }, { "name": "rocket_fired", "value": 120 }, { "name": "item_drop", "value": 47136 }, { "name": "blueprint_studied", "value": 4239 }, { "name": "death_suicide", "value": 3538 }, { "name": "death_fall", "value": 149 }, { "name": "death_selfinflicted", "value": 67 }, { "name": "kill_player", "value": 7282 }, { "name": "bullet_hit_player", "value": 35623 }, { "name": "arrow_hit_entity", "value": 5855 }, { "name": "harvest.stones", "value": 1210054 }, { "name": "bullet_hit_entity", "value": 64190 }, { "name": "harvest.cloth", "value": 65477 }, { "name": "harvest.wood", "value": 3143818 }, { "name": "arrow_hit_building", "value": 5008 }, { "name": "kill_bear", "value": 345 }, { "name": "kill_boar", "value": 457 }, { "name": "kill_stag", "value": 308 }, { "name": "kill_chicken", "value": 43 }, { "name": "kill_horse", "value": 200 }, { "name": "kill_wolf", "value": 164 }, { "name": "headshot", "value": 14620 }, { "name": "arrow_hit_boar", "value": 871 }, { "name": "arrow_hit_bear", "value": 1483 }, { "name": "arrow_hit_wolf", "value": 432 }, { "name": "arrow_hit_stag", "value": 274 }, { "name": "arrow_hit_chicken", "value": 35 }, { "name": "bullet_hit_building", "value": 46012 }, { "name": "arrow_hit_horse", "value": 379 }, { "name": "arrow_hit_player", "value": 7208 }, { "name": "death_entity", "value": 610 }, { "name": "death_wolf", "value": 73 }, { "name": "death_bear", "value": 117 }, { "name": "shotgun_fired", "value": 28593 }, { "name": "shotgun_hit_building", "value": 5222 }, { "name": "shotgun_hit_player", "value": 5720 }, { "name": "shotgun_hit_horse", "value": 282 }, { "name": "bullet_hit_bear", "value": 2192 }, { "name": "shotgun_hit_entity", "value": 4326 }, { "name": "bullet_hit_horse", "value": 381 }, { "name": "bullet_hit_stag", "value": 280 }, { "name": "bullet_hit_wolf", "value": 479 }, { "name": "bullet_hit_boar", "value": 653 }, { "name": "bullet_hit_sign", "value": 330 }, { "name": "wounded", "value": 4866 }, { "name": "wounded_assisted", "value": 674 }, { "name": "wounded_healed", "value": 843 }, { "name": "bullet_hit_playercorpse", "value": 2331 }, { "name": "bullet_hit_corpse", "value": 776 }, { "name": "INVENTORY_OPENED", "value": 405869 }, { "name": "CRAFTING_OPENED", "value": 6616 }, { "name": "harvested_wood", "value": 1010793 }, { "name": "harvested_stones", "value": 1766941 }, { "name": "MAP_OPENED", "value": 58456 }, { "name": "CUPBOARD_OPENED", "value": 13266 }, { "name": "ITEM_EXAMINED", "value": 479 }, { "name": "comfort_duration", "value": 644076.9375 }, { "name": "calories_consumed", "value": 723839.125 }, { "name": "water_consumed", "value": 254206.453125 }, { "name": "pickup_category_food", "value": 3485 }, { "name": "radiation_exposure_duration", "value": 5687.4697265625 }, { "name": "cold_exposure_duration", "value": 916165.4375 }, { "name": "hot_exposure_duration", "value": 143129.0625 }, { "name": "melee_strikes", "value": 141065 }, { "name": "melee_thrown", "value": 2049 }, { "name": "placed_blocks", "value": 33349 }, { "name": "upgraded_blocks", "value": 24393 }, { "name": "arrows_shot", "value": 8736 }, { "name": "seconds_speaking", "value": 66408.2734375 }, { "name": "harvested_cloth", "value": 18738 }, { "name": "harvested_leather", "value": 5164 }, { "name": "acquired_lowgradefuel", "value": 49286 }, { "name": "acquired_metal.ore", "value": 1185314 }, { "name": "acquired_scrap", "value": 17586 }, { "name": "topology_road_duration", "value": 96640 }, { "name": "destroyed_barrels", "value": 3192 }, { "name": "horse_distance_ridden", "value": 63874 }, { "name": "cargoship_bridge_visits", "value": 1 }, { "name": "recycled_cans", "value": 40 }, { "name": "kill_scientist", "value": 23 }, { "name": "horse_distance_ridden_km", "value": 43 }, { "name": "InstrumentNotesPlayed", "value": 57883 }, { "name": "InstrumentFullKeyboardMode", "value": 1 }, { "name": "grenades_thrown", "value": 65 }, { "name": "gesture_wave_count", "value": 8 }, { "name": "waved_at_players", "value": 4 } ] },
        // { "user": "Renb0", "stats": [ { "name": "deaths", "value": 9840 }, { "name": "bullet_fired", "value": 70675 }, { "name": "arrow_fired", "value": 30828 }, { "name": "item_drop", "value": 44522 }, { "name": "blueprint_studied", "value": 2061 }, { "name": "death_suicide", "value": 4417 }, { "name": "death_fall", "value": 61 }, { "name": "death_selfinflicted", "value": 33 }, { "name": "kill_player", "value": 2252 }, { "name": "bullet_hit_player", "value": 8147 }, { "name": "arrow_hit_entity", "value": 7019 }, { "name": "harvest.fat_animal", "value": 7 }, { "name": "harvest.stones", "value": 644692 }, { "name": "bullet_hit_entity", "value": 21213 }, { "name": "harvest.cloth", "value": 60614 }, { "name": "harvest.wood", "value": 3696455 }, { "name": "arrow_hit_building", "value": 12243 }, { "name": "kill_bear", "value": 265 }, { "name": "kill_boar", "value": 400 }, { "name": "kill_stag", "value": 331 }, { "name": "kill_chicken", "value": 61 }, { "name": "kill_horse", "value": 173 }, { "name": "kill_wolf", "value": 213 }, { "name": "harvest.metal_ore", "value": 98 }, { "name": "headshot", "value": 3594 }, { "name": "harvest.bone_fragments", "value": 5 }, { "name": "harvest.humanmeat_raw", "value": 3 }, { "name": "arrow_hit_boar", "value": 396 }, { "name": "arrow_hit_bear", "value": 1611 }, { "name": "arrow_hit_wolf", "value": 334 }, { "name": "arrow_hit_stag", "value": 327 }, { "name": "arrow_hit_chicken", "value": 27 }, { "name": "bullet_hit_building", "value": 16491 }, { "name": "arrow_hit_horse", "value": 304 }, { "name": "arrow_hit_player", "value": 2032 }, { "name": "death_entity", "value": 1500 }, { "name": "death_wolf", "value": 96 }, { "name": "death_bear", "value": 169 }, { "name": "shotgun_fired", "value": 10358 }, { "name": "shotgun_hit_building", "value": 3019 }, { "name": "shotgun_hit_player", "value": 1193 }, { "name": "bullet_hit_bear", "value": 874 }, { "name": "shotgun_hit_entity", "value": 2683 }, { "name": "bullet_hit_horse", "value": 126 }, { "name": "bullet_hit_stag", "value": 96 }, { "name": "bullet_hit_wolf", "value": 244 }, { "name": "bullet_hit_boar", "value": 154 }, { "name": "bullet_hit_sign", "value": 62 }, { "name": "wounded", "value": 4184 }, { "name": "wounded_assisted", "value": 321 }, { "name": "wounded_healed", "value": 385 }, { "name": "bullet_hit_playercorpse", "value": 411 }, { "name": "bullet_hit_corpse", "value": 94 }, { "name": "INVENTORY_OPENED", "value": 697141 }, { "name": "CRAFTING_OPENED", "value": 22896 }, { "name": "harvested_wood", "value": 3346688 }, { "name": "harvested_stones", "value": 2542067 }, { "name": "MAP_OPENED", "value": 74907 }, { "name": "CUPBOARD_OPENED", "value": 22058 }, { "name": "ITEM_EXAMINED", "value": 59 }, { "name": "comfort_duration", "value": 592523.125 }, { "name": "calories_consumed", "value": 799292.375 }, { "name": "water_consumed", "value": 229825.8125 }, { "name": "pickup_category_food", "value": 20706 }, { "name": "radiation_exposure_duration", "value": 12399.658203125 }, { "name": "cold_exposure_duration", "value": 1162658.5 }, { "name": "hot_exposure_duration", "value": 49337.53515625 }, { "name": "melee_strikes", "value": 220545 }, { "name": "melee_thrown", "value": 2889 }, { "name": "placed_blocks", "value": 41192 }, { "name": "upgraded_blocks", "value": 15191 }, { "name": "arrows_shot", "value": 8415 }, { "name": "seconds_speaking", "value": 19569.69140625 }, { "name": "harvested_cloth", "value": 52154 }, { "name": "harvested_leather", "value": 6738 }, { "name": "acquired_lowgradefuel", "value": 40265 }, { "name": "acquired_metal.ore", "value": 1381258 }, { "name": "acquired_scrap", "value": 21552 }, { "name": "topology_road_duration", "value": 365065 }, { "name": "destroyed_barrels", "value": 7001 }, { "name": "horse_distance_ridden", "value": 362389 }, { "name": "helipad_landings", "value": 1 }, { "name": "cargoship_bridge_visits", "value": 1 }, { "name": "recycled_cans", "value": 2 }, { "name": "kill_scientist", "value": 181 }, { "name": "horse_distance_ridden_km", "value": 317 }, { "name": "InstrumentNotesPlayed", "value": 21306 }, { "name": "InstrumentFullKeyboardMode", "value": 15 }, { "name": "InstrumentNotesPlayedBinds", "value": 759 }, { "name": "grenades_thrown", "value": 18 }, { "name": "gesture_wave_count", "value": 5 } ] }

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
                    avatarUrl: player.avatar,
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
        }
    }
})