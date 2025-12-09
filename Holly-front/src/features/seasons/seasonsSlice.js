import { createSlice } from '@reduxjs/toolkit';
import { fetchSeasons, addSeason, deleteSeason } from './seasons';
const initialState = {
  seasons: [],
  error: null,
  isLoading: false,
};

const seasonsSlice = createSlice({
  name: 'seasons',
  initialState,
  reducers: {
    acSetSeasons: (state, action) => {
      state.seasons = action.payload;
    },
    acAddSeason: (state, action) => {
      state.seasons.push(action.payload);
    },
    acRemoveSeason: (state, action) => {
      state.seasons = state.seasons.filter((season) => season.id !== action.payload.id);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSeasons.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSeasons.fulfilled, (state, action) => {
        state.isLoading = false;
        state.seasons = action.payload;
        state.error = null;
      })
      .addCase(fetchSeasons.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(addSeason.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addSeason.fulfilled, (state, action) => {
        state.isLoading = false;
        state.seasons.push(action.payload);
        state.error = null;
      })
      .addCase(addSeason.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteSeason.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteSeason.fulfilled, (state, action) => {
        state.isLoading = false;
        state.seasons = state.seasons.filter((season) => season.id !== action.payload);
        state.error = null;
      })
      .addCase(deleteSeason.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { acSetSeasons, acAddSeason, acRemoveSeason } = seasonsSlice.actions;
export default seasonsSlice.reducer;
