import deepFreeze from 'deep-freeze'
import counterReducer from './reducer'

describe('unicafe reducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }

  test('should return a proper initial state when called with undefined state', () => {
    const state = {}
    const action = {
      type: 'DO_NOTHING'
    }

    const newState = counterReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  test('good is incremented', () => {
    const action = {
      type: 'GOOD'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 0
    })
  })

  test('ok is incremented', () => {
    const action = {
      type: 'OK'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 0,
      ok: 1,
      bad: 0
    })
  })

  test('bad is incremented', () => {
    const action = {
      type: 'BAD'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 1
    })
  })

  test('multiple increments are possible with each type', () => {
    const action = {
      type: 'BAD'
    }
    const action1 = {
      type: 'GOOD'
    }
    const action2 = {
      type: 'OK'
    }
    const state = initialState

    deepFreeze(state)

    let newState = counterReducer(state, action)
    newState = counterReducer(newState, action)
    newState = counterReducer(newState, action1)
    newState = counterReducer(newState, action1)
    newState = counterReducer(newState, action2)
    newState = counterReducer(newState, action2)

    expect(newState).toEqual({
      good: 2,
      ok: 2,
      bad: 2
    })
  })

  test('command zero zeroes all values', () => {
    const action = {
      type: 'BAD'
    }
    const state = initialState

    deepFreeze(state)
    let newState = counterReducer(state, action)
    newState = counterReducer(newState, action)
    newState = counterReducer(newState, action)

    const action1 = {
      type: 'ZERO'
    }

    newState = counterReducer(newState, action1)

    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 0
    })
  })
})