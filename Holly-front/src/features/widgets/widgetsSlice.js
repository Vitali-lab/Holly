import { createSlice } from '@reduxjs/toolkit';
import { fetchWidgets, deleteWidget, addWidget, updateWidget } from './widgets';

const initialState = {
  widgets: [],
  error: null,
  isLoading: false,
};

const widgetsSlice = createSlice({
  name: 'widgets',
  initialState,
  reducers: {
    acSetWidgets: (state, action) => {
      state.widgets = action.payload;
    },
    acAddWidgets: (state, action) => {
      state.widgets.push(action.payload);
    },
    acRemoveWidgets: (state, action) => {
      state.widgets = state.widgets.filter((widget) => widget.id !== action.payload);
    },
    acEditWidget: (state, action) => {
      state.widgets = state.widgets.map((widget) => {
        if (widget.id === action.payload.id) {
          return action.payload;
        }
        return widget;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWidgets.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchWidgets.fulfilled, (state, action) => {
        state.isLoading = false;
        state.widgets = action.payload;
        state.error = null;
      })
      .addCase(fetchWidgets.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteWidget.fulfilled, (state, action) => {
        state.widgets = state.widgets.filter((widget) => widget.id !== action.payload);
      })
      .addCase(addWidget.fulfilled, (state, action) => {
        state.widgets.push(action.payload);
      })
      .addCase(updateWidget.fulfilled, (state, action) => {
        state.widgets = state.widgets.map((widget) => {
          if (widget.id === action.payload.id) {
            return action.payload;
          }
          return widget;
        });
      });
  },
});
export const { acAddWidgets, acSetWidgets, acRemoveWidgets } = widgetsSlice.actions;
export default widgetsSlice.reducer;
