import { fetchProducts } from './product'
import { CHANGE_SORT, RESET_GRID, MOVE_IDLE_FETCH } from '../Constants';

export const changeSort = (sort) => ({
	type: CHANGE_SORT,
	sort
})

export const resetGrid = () => ({
	type: RESET_GRID,
})

export const moveIdleFetchedProducts = () => ({
	type: MOVE_IDLE_FETCH,
})

export const sortGridBy = (sort) => (dispatch) => {

	dispatch(resetGrid());

	dispatch(changeSort(sort));

	dispatch(fetchProducts());
}
