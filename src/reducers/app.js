import { loadAd, generateAd } from '../actions';
import { LOAD_AD } from '../Constants';

const initialApp = {
	previousAd: 0,
}

const app = (state = initialApp, action) => {

	if ( action.type == LOAD_AD) {
		return Object.assign({}, state, {
			previousAd: action.ad
		})
	}

	return state
}

export default app
