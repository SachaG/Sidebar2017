/*

HoC that provides access to flash messages stored in Redux state and actions to operate on them

*/

import { getActions, addAction, addReducer } from 'meteor/vulcan:lib';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// register messages actions
addAction({
  ui: {
    toggleFilters() {
      return {
        type: 'TOGGLEFILTERS',
      };
    },
  }
});

// register messages reducer
addReducer({
  ui: (state = {showFilters: false}, action) => {
    switch(action.type) {
      case 'TOGGLEFILTERS':
        return {
          ...state,
          showFilters: !state.showFilters
        };
      default:
        return state;
    }
  },
});

const mapStateToProps = state => ({ ui: state.ui, });
const mapDispatchToProps = dispatch => bindActionCreators(getActions().ui, dispatch);

const withToggleFilters = (component) => connect(mapStateToProps, mapDispatchToProps)(component);

export default withToggleFilters;
