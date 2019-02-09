import React, { Component } from 'react';
import { Image, View, Text, FlatList, ActivityIndicator, Alert } from 'react-native';
import { connect } from 'react-redux';
import ModalSelector from 'react-native-modal-selector';
import EmptyState from '../components/EmptyState';
import ProductItem from '../components/ProductItem';
import AdItem from '../components/AdItem';
import  TappableIcon from '../components/TappableIcon';
import IconTextPair from '../components/IconTextPair';
import { fetchProducts, fetchMoreProducts, sortGridBy, handleIdleFetch } from '../../actions'
import { ENV } from '../../Constants';

const viewStyles = {
  container: {
	backgroundColor: '#f7f7f7',
  flex: 1,
	alignItems: 'center'
  },
  headerStyle: {
    flex: 0.6,
    width: '98%',
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },
  subheaderContainer: {
    flexDirection: 'row',
    width: '98%',
  },
  subheaderStyle: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  productCountContainer: {
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  footerStyle: {
      paddingVertical: 20,
      borderTopWidth : 1,
      borderColor    : '#CED0CE'
  },
  endOfCatalog: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10
  }
};

const textStyles = {
  headerTitle: {
    fontWeight: "700",
    fontSize: 16,
    color: 'black',
    alignSelf: 'center',
  },
  subheaderTitle: {
    fontWeight: "600",
    fontSize: 13,
    color: 'black',
    alignSelf: 'center',
  },
  productCountTitle: {
    fontSize: 11,
    color: '#bfbcbe'
  },
  endOfCatalogue: {
    color: '#c33746',
    fontSize: 10
  }
};

const SortIconSize = 18;
const borderRadius = 35;

let sortIndex = 0;
const sortOption = [
    { key: sortIndex++, section: true, label: 'Sort by:' },
    { key: sortIndex++, label: 'id' },
    { key: sortIndex++, label: 'price' },
    { key: sortIndex++, label: 'size' },
];



class ProductsGridScreen extends Component {

  componentDidMount() {
    this.props.fetchProducts()
    this.props.handleIdleFetch()
  }

  onItemTapped = (routeName, data) => {
    this.props.navigation.navigate({routeName, params: {data} })
  }

  onSortValueChange = (option) => {
    if (this.props.products.length > 1) {
      this.props.sortGridBy(option.label);
      Alert.alert(`${option.label} selected`)
    } else {
      Alert.alert('no product to sort');
    }
  }

  itemToRender = ({index, item}) => {
    if (item.type === 'ad') {
      return (
        <AdItem
          key={index}
          onItemTapped = {() => this.onItemTapped('AdWeb', ENV.AD_URL)}
        />
      );
    }
    //<ALternateProductItem />
    return (
      <ProductItem
        key={index}
        product={item}
        onItemTapped={() => this.onItemTapped('ProductDetail', item)}
      />

    );
  }

  emptyProductList = () => {
    const {isFetching, fetchProducts} = this.props
    if (isFetching) {
      return <ActivityIndicator animating size="small"/>;
    } else  {
      return  (
        <EmptyState
          onRefresh={fetchProducts}
          message={'No Products available or network error'}
        />
      );
    }
  };

  handleOnEndReached = (distanceFromEnd) => {
    const { fetchMoreProducts, handleIdleFetch } = this.props
     console.log('reached threshold before if', distanceFromEnd);
    if (distanceFromEnd > 0 || distanceFromEnd > -150) {
      console.log('reached threshold 1', distanceFromEnd);
      fetchMoreProducts()
      handleIdleFetch()
    } else if (this.onEndReachedCalledDuringMomentum && distanceFromEnd < 0) {
      console.log('reached threshold 2', distanceFromEnd);
      fetchMoreProducts()
      handleIdleFetch()
      this.onEndReachedCalledDuringMomentum = false;
    } else {
      false
    }
  };

  renderFooter = () => {
    const {isLoadingMore, noMoreProducts} = this.props
    if (isLoadingMore) {
      return (
        <View style={viewStyles.footerStyle} >
           <ActivityIndicator animating size="small"/>
        </View>
      );
    } else if (noMoreProducts) {
      return (
        <View style={viewStyles.endOfCatalog}>
           <Text style={textStyles.endOfCatalogue} >{'~ end of catalogue ~'}</Text>
        </View>
      )
    }
      return false
 };

  render() {
    const {products, fetchMoreProducts} = this.props
    return (
      <View style={viewStyles.container}>

        {/* header one container */}
        <View style={viewStyles.headerStyle}>
          <Text style={textStyles.headerTitle}>
            Ascii Faces
          </Text>
        </View>
        {/* header two container */}
        <View style={viewStyles.subheaderContainer}>
          <View style={viewStyles.subheaderStyle}>
            <ModalSelector
              data={sortOption}
              accessible={true}
              cancelButtonAccessibilityLabel={'Cancel Button'}
              onChange={(option) => this.onSortValueChange(option)}
              backdropPressToClose={true}
            >
              <IconTextPair
                imageSource={require("../../assets/images/logos-icons/sort.png")}
                imageOverrideStyle={{
                  height: SortIconSize,
                  width: SortIconSize
                }}
                text={"SORT"}
                textStyle={textStyles.subheaderTitle}
              />
            </ModalSelector>
          </View>
          <View style={viewStyles.subheaderStyle}>
            <Text style={textStyles.subheaderTitle}>
              REFINE
            </Text>
          </View>
        </View>
        {/* header three container */}
        <View style={viewStyles.productCountContainer}>
          <Text style={textStyles.productCountTitle}>
            {products.length} cool faces
          </Text>
        </View>

      {/* products grid container */}
        <View style={{ flex: 7, height: '74%'}}>
          <FlatList
            data={products}
            keyExtractor={(item, index) => index.toString()}
            onEndReachedThreshold={0.01}
            onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = true }}
            onEndReached={({distanceFromEnd}) => this.handleOnEndReached(distanceFromEnd)}
            numColumns={2}
            renderItem={({ index, item }) => (
              this.itemToRender({index, item})
            )}
            windowSize={10}
            maxToRenderPerBatch={10}
            ListEmptyComponent={this.emptyProductList}
            ListFooterComponent={this.renderFooter}
          />
        </View>
      </View>
    );
  }
};



const mapStateToProps = (state) => {
  const { products, isFetching, isLoadingMore, noMoreProducts } = state.grids
  return { products, isFetching, isLoadingMore, noMoreProducts }
};

export default connect(mapStateToProps, { fetchProducts, fetchMoreProducts, sortGridBy, handleIdleFetch })(ProductsGridScreen)
