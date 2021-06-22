import React from 'react';
import {connect} from 'react-redux'

const MostPurchased = (WrappedComponent, keyIn) => {
    class MostPurchased extends React.Component {
        state = {labels: [], data: []}

        accumulateData = () => {
            let map = new Map();
            let key;
            const orderItems = this.props.content.slice().map(order => order.order[keyIn]);
            for (const items of orderItems){
                for (const item of items){
                    if (keyIn === "food"){
                        key = item.main.charAt(0).toUpperCase() + item.main.slice(1).toLowerCase();
                    }
                    else {
                        key = item.item.charAt(0).toUpperCase() + item.item.slice(1).toLowerCase();
                    }
                    if (!map.has(key)){
                        map.set(key, item.price)
                    }
                    else {
                        map.set(key, Math.ceil((map.get(key) + item.price)*100)/ 100)
                    }
                }
            }
            let accumulationArr = [];
            for (const [key, value] of map.entries()){
                accumulationArr.push([key, value])
            }
            
            return accumulationArr.sort((a, b) => b[1] - a[1]).slice(0, accumulationArr.length >= 7 ? 7 : accumulationArr.length - 1).reverse();
        }

        componentDidMount(){
            let accumulationArray = this.accumulateData();
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