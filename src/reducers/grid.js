import {
	 FETCHING_PRODUCTS,
	 NO_PRODUCT_AVAILABLE,
	 NO_MORE_PRODUCT,
	 LOADING_MORE,
	 ADD_PRODUCTS,
	 ADD_IDLE_PRODUCTS,
	 CHANGE_SORT,
	 IDLE_FETCHING,
	 PUSH_AD,
	 RESET_GRID,
	 MOVE_IDLE_FETCH,
	 INCREASE_PAGE_COUNT,
	 FETCH_LIMIT,
	 DEFAULT_SORT_VALUE,
	 INCREASE_AD_INDEX,
	 PRODUCTS_BEFORE_AD
} from '../Constants';

const initialGrids = {
	isFetching: false,
	products: [],
	idleFetchedProducts: [],
	page: 1,
	limit: FETCH_LIMIT,
	sort: DEFAULT_SORT_VALUE,
	isRefreshing: false,
	isLoadingMore: false,
	isNoProductsAvailable: false,
	noMoreProducts: false,
	isIdleFetch: false,
	adIndex: PRODUCTS_BEFORE_AD,
}



const grids = (state = initialGrids, action) => {
	switch (action.type) {
		case INCREASE_AD_INDEX:
			return(
				Object.assign({}, state, {
        	adIndex: state.adIndex + PRODUCTS_BEFORE_AD + 1
      	})
			);
		case FETCHING_PRODUCTS:
			return(
				Object.assign({}, state, {
        	isFetching: action.isFetching
      	})
			);
		case NO_PRODUCT_AVAILABLE:
			return(
				Object.assign({}, state, {
        	isNoProductsAvailable: action.isNoProductsAvailable
      	})
		);
		case NO_MORE_PRODUCT:
			return(
				Object.assign({}, state, {
        	noMoreProducts: action.noMoreProducts
      	})
		);
		case LOADING_MORE:
			return(
				Object.assign({}, state, {
        	isLoadingMore: action.isLoadingMore,
      	})
		);
		case INCREASE_PAGE_COUNT:
			return(
				Object.assign({}, state, {
					page: state.page + 1
      	})
			);
		case ADD_PRODUCTS:
			return(
				Object.assign({}, state, {
	        products: [
	          ...state.products,
	          action.product
	        ]
      	})
			);
		case ADD_IDLE_PRODUCTS:
			return(
				Object.assign({}, state, {
	        idleFetchedProducts: [
	          ...state.idleFetchedProducts,
	          action.idleFetchedProduct
	        ]
      	})
			);
		case CHANGE_SORT:
			return(
				Object.assign({}, state, {
        	sort: action.sort
      	})
			);
		case IDLE_FETCHING:
			return(
				Object.assign({}, state, {
        	isIdleFetch: action.isIdleFetch
      	})
			);
		case PUSH_AD:
			return(
				Object.assign({}, state, {
        	products: [...state.products, ...action.ad]
      	})
		);
		case RESET_GRID:
			return(
				Object.assign({}, state, {
					page: 1,
					modCount: 0,
					isIdleFetch: false,
					products: [],
					idleFetchedProducts: [],
					isFetching: false,
					isLoadingMore: false,
					adIndex: PRODUCTS_BEFORE_AD
      	})
			);
		case MOVE_IDLE_FETCH:
			return(
				Object.assign({}, state, {
					isIdleFetch: false,
					products: [
	          ...state.products,
	          ...state.idleFetchedProducts,
	        ],
					idleFetchedProducts: []
      	})
			);
		default:
			return state;

	}
}

export default grids
