import React from 'react';
import {connect} from 'react-redux'
import { DATA_KEYS } from '../../../../constants/constants';

const MostPurchased = (WrappedComponent, keyIn, isCategoryComponent = false) => {
    class MostPurchased extends React.Component {
        state = {labels: [], data: []}

        accumulateData = () => {
            let key, price, map = new Map();
            const orderItems = this.props.content.slice().map(order => order.order[keyIn]);
            for (const items of orderItems){
                for (const item of items){
                    price = item.price !== undefined && item.price !== null ? parseFloat(item.price) : 0;
                    if (keyIn === DATA_KEYS.FOOD){
                        if (!item.main) continue;
                        key = item.main.charAt(0).toUpperCase() + item.main.slice(1).toLowerCase();
                    }
                    else {
                        if (!item.item) continue;
                        key = item.item.charAt(0).toUpperCase() + item.item.slice(1).toLowerCase();
                    }
                    this.addOrSetMapKey(map, key, parseFloat(price) * (item.quantity ? item.quantity : 1))
                }
            }
            let accumulationArr = this.buildArrayFromMapKeyValues(map)
            return accumulationArr.sort((a, b) => b[1] - a[1]).slice(0, accumulationArr.length >= 7 ? 7 : accumulationArr.length).reverse();
        }

        accumulateCategoryData = () => {
            let key, price, totalPrice = 0, map = new Map();
            const categoryItems = this.props.content.slice().map(order => order.order[keyIn]);
            for (const items of categoryItems){
                for (const item of items){
                    if (!item.category) continue;
                    key = item.category.charAt(0).toUpperCase() + item.category.slice(1).toLowerCase();
                    price = item.price !== undefined && item.price !== null ? parseFloat(item.price) : 0;
                    this.addOrSetMapKey(map, key, price * (item.quantity ? item.quantity : 1));
                    totalPrice += (parseFloat(price) * (item.quantity ? item.quantity : 1));
                }
            }
            let accumulationArr = this.buildArrayFromMapKeyValues(map);
            accumulationArr.forEach(element => {
                element[1] = parseFloat((element[1] * 100 / totalPrice).toFixed(2))
                element[0] = `${element[0]} (${element[1]}%)`
            })
            return accumulationArr.sort((a, b) => b[1] - a[1]).slice(0, accumulationArr.length >= 7 ? 7 : accumulationArr.length)
        }

        buildArrayFromMapKeyValues = (map, accumulationArr = []) => {
            for (const [key, value] of map.entries()){
                value !== 0 && accumulationArr.push([key, value])
            }
            return accumulationArr;
        }

        addOrSetMapKey = (map, key, price) => {
            if (!map.has(key)){
                map.set(key, price)
            }
            else {
                map.set(key, Math.ceil((map.get(key) + price)*100)/ 100)
            }
        }

        componentDidMount(){
            let accumulationArray = isCategoryComponent ? this.accumulateCategoryData() : this.accumulateData();
            this.setState({
                labels: accumulationArray.map(item => item[0]),
                data: accumulationArray.map(item => item[1])
            })
        }

        render(){
            return <WrappedComponent labels={this.state.labels} data={this.state.data} />
        }
    }
    
    const mapStateToProps = (state) => {
        return {
            content: state.orders.data
        }
    }
    return connect(mapStateToProps)(MostPurchased);
}


export default MostPurchased;