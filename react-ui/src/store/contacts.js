export const ACTION_CONTACT_LIST = "contact_list";
export const ACTION_CONTACT_ADD = "contact_add";
export const ACTION_CONTACT_UPDATE = "contact_update";
export const ACTION_CONTACT_DELETE = "contact_delete";

export const INITIAL_STATE = {
  records: [],
};

export default function contactsReducer(state, action) {
  if (action.type === ACTION_CONTACT_LIST) {
    return { records: action.payload.records };
  }
  if (action.type === ACTION_CONTACT_ADD) {
    state = JSON.parse(JSON.stringify(state));
    state.records.unshift(action.payload.record);
    return state;
  }
  if (action.type === ACTION_CONTACT_UPDATE) {
    state = JSON.parse(JSON.stringify(state));
    const targetIdx = state.records.findIndex(
      (record) => record.id === action.payload.id
    );
    state.records[targetIdx] = action.payload.record;
    return state;
  }
  if (action.type === ACTION_CONTACT_DELETE) {
    state = JSON.parse(JSON.stringify(state));
    const targetIdx = state.records.findIndex(
      (record) => record.id === action.payload.id
    );
    state.records.splice(targetIdx, 1);
    return state;
  }
  return state;
}
