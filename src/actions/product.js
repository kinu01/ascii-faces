import product from '../apis/product';
import { moveIdleFetchedProducts, resetGrid } from './grid'
import { pushAdToProductsArray } from './app'
import {
	 ADD_PRODUCTS,
	 ADD_IDLE_PRODUCTS,
	 LOADING_MORE,
	 IDLE_FETCHING,
	 NO_MORE_PRODUCT,
	 NO_PRODUCT_AVAILABLE,
	 FETCHING_PRODUCTS,
	 INCREASE_PAGE_COUNT,
	 API_ENDPOINT,
	 INCREASE_AD_INDEX
} from '../Constants';


export const addProducts = (product) => ({
	type: ADD_PRODUCTS,
	product
})

export const addIdleFetchedProducts = (idleFetchedProduct) => ({
	type: ADD_IDLE_PRODUCTS,
	idleFetchedProduct
})

export const loadingMore = (isLoadingMore) => ({
	type: LOADING_MORE,
	isLoadingMore
})

export const increasePageCount = () => ({
	type: INCREASE_PAGE_COUNT,
})

export const idleFetch= (isIdleFetch) => ({
	type: IDLE_FETCHING,
	isIdleFetch
})

export const noMoreProducts = (noMoreProducts) => ({
	type: NO_MORE_PRODUCT,
	noMoreProducts
})

export const noProductsAvailable = (isNoProductsAvailable) => ({
	type: NO_PRODUCT_AVAILABLE,
	isNoProductsAvailable
})


export const FetchingProducts = (isFetching) => ({
	type: FETCHING_PRODUCTS,
	isFetching
})

export const increaseAdIndex = () => ({
	type: INCREASE_AD_INDEX

})


//actions to be executed by redux-thunk
export const fetchProducts = () =>  async (dispatch, getState) => {
	const state = getState()
	const { page, limit, isIdleFetch, sort, modCount, products, idleFetchedProducts, adIndex } = state.grids;
	dispatch(FetchingProducts(true))
	//dispatch(loadingMore(true))
		try{
			const response = await product.get(API_ENDPOINT,
			{
				params: {
					_page: page,
					_limit: limit,
					_sort: sort
				}
			});
			console.log(response.data);
			if (response.data.length > 1) {
				//products are received
				dispatch(FetchingProducts(false))
				dispatch(loadingMore(false))
				addProductOrSponsporAdToStore({products, idleFetchedProducts, response, adIndex, isIdleFetch}, dispatch)
				//increase page count for next fecth
				dispatch(increasePageCount())
			}
			if (response.data.length < limit ) {
				dispatch(endOfCatalog())
			}
			if (response.data.length < 1 && products.length < 1) {
				dispatch(noProductsAvailable(true))
			}
		} catch (err) {
			if (err) {
				dispatch(resetGrid())
				console.log(err);
			}
		}
};

export const fetchMoreProducts = () => (dispatch, getState) => {
	const state = getState()
	const { isIdleFetch } = state.grids
	//if we have an idleFetchedProducts in array, just move them,
	//if not fetchproducts
	if (isIdleFetch) {
		dispatch(moveIdleFetchedProducts())
	} else {
		dispatch(loadingMore(true))
		dispatch(fetchProducts())
	}
	//dispatch(handleIdleFetch())
}

export const handleIdleFetch = () => (dispatch) => {
	setTimeout(() => {
			//console.clear()
    	console.log('idle TIme is Here')
			dispatch(idleFetch(true))
			dispatch(fetchProducts())
	}, 30000)
}

export const endOfCatalog = () => (dispatch) => {
	console.log('end of catalog');
	dispatch(loadingMore(false))
	dispatch(FetchingProducts(false))
	dispatch(noMoreProducts(true))
}


//this is a helper method for fetchproducts action creator
addProductOrSponsporAdToStore = ({products, idleFetchedProducts, response, adIndex, isIdleFetch}, dispatch,) => {
	let startCount = products.length + idleFetchedProducts.length,
	 		countLength = response.data.length + products.length + idleFetchedProducts.length,
			responseDataIndex = 0;

	for (startCount, countLength , responseDataIndex; startCount < countLength; startCount++) {
		if(startCount == adIndex){
			dispatch(pushAdToProductsArray())
			handleFetchedProduct(responseDataIndex, response, isIdleFetch, dispatch);
			dispatch(increaseAdIndex())
		} else {
			handleFetchedProduct(responseDataIndex, response, isIdleFetch, dispatch);
		}
		responseDataIndex += 1
	}
}

handleFetchedProduct = (responseDataIndex, response, isIdleFetch, dispatch) => {
	//are we making an idle time fetch, if so add to state idle products array else just add to state products array
	if (isIdleFetch) {
		dispatch(addIdleFetchedProducts(response.data[responseDataIndex]))
	}else {
		dispatch(addProducts(response.data[responseDataIndex]))
	}
}
