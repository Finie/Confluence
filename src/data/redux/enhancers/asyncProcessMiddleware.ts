import { createAsyncThunk } from '@reduxjs/toolkit'

/**
 *
 * @file this file defines the createAsyncThunk configuration
 * for all async await funtions using redux
 *
 */

export const asyncProcessing = createAsyncThunk(
  'asyncProcessing',
  async (options: { asyncFunction: any }, { dispatch, getState }) => {
    try {
      // Destructure the options object for any additional parameters you need
      const { asyncFunction } = options

      return await asyncFunction(dispatch, getState)
    } catch (error) {
      //throw an error notifying that processing the async function failed
      throw new Error(`[ Mobile ] - asyncProcessing failed: [ ${error} ]`)
    }
  },
)
