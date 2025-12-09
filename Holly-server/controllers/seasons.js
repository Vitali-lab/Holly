import { Season } from "../models/Seasons.js";



export const getSeasons = async () => {
    return await Season.find();
}

export const addSeason = async (season) => {
    return await Season.create(season);
}

export const deleteSeason = async (id) => {
    return await Season.findByIdAndDelete(id);
}

