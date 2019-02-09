import shortid from 'shortid';
import { resetGrid } from './grid';
import { fetchProducts } from './product';
import {
	CHANGE_GRID,
	LOAD_AD, PUSH_AD,
	INCREASE_MOD_COUNT,
	GENERATE_AD
} from '../Constants';

export const loadAd = (ad) => ({
	type: LOAD_AD,
	ad
})

export const pushAd = (ad) => ({
	type: PUSH_AD,
	ad
})

export const increaseModCount = () => ({
	type: INCREASE_MOD_COUNT,
})


export const refreshApp = () => (dispatch) => {
	dispatch(resetGrid())
	dispatch(fetchProducts())
}


export const pushAdToProductsArray = () => (dispatch) => {
	var sponsorAdKey = shortid.generate();

	dispatch(increaseModCount());
	//push generateAd to redux state products array
	dispatch(pushAd([{key: sponsorAdKey, type: 'ad'}]));
}
