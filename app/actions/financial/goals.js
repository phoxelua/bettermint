import { goalConstants } from 'constants/financial';
import { get, post } from 'utilities/api';

export function requestGoals(token) {
  return async (dispatch) => {
    dispatch({
      type: goalConstants.REQUEST_GOALS,
    });

    try {
      const endpoint = '/api/financial/goals';
      const result = await get(endpoint, token);

      dispatch({
        type: goalConstants.REQUEST_GOALS_SUCCESS,
        payload: {
          goals: result.goals,
        },
      });
    } catch (e) {
      dispatch({
        type: goalConstants.REQUEST_GOALS_ERROR,
      });
    }
  };
}

// TODO: DESTRUCTURE ARGS
export function createGoal(fields, token) {
  return async (dispatch) => {
    dispatch({
      type: goalConstants.CREATE_GOAL,
    });

    try {
      const endpoint = '/api/financial/goals';
      const result = await post(endpoint, fields, token);

      dispatch({
        type: goalConstants.CREATE_GOAL_SUCCESS,
        payload: {
          goal: result.goal,
        },
      });
    } catch (e) {
      dispatch({
        type: goalConstants.CREATE_GOAL_ERROR,
      });
    }
  };
}
