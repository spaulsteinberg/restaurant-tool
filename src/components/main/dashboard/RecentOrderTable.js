import React from 'react'
import { Card } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { dateComparator } from '../../../utils';

const RecentOrderTable = (props) => {
    const recentOrders = useSelector(state => state.orders.data.map(order => {
                                  return {
                                    id: order.receiptNumber.substring(0, 5) + 'x'.repeat(5),
                                    date: order.shortDate,
                                    name: `${order.firstName[0]}. ${order.lastName}`,
                                    revenue: `$${order.totalCost.toFixed(2)}`
                                  }
                                })
                                .sort(dateComparator)
                                .slice(0, 10));
    const colNames = ["Order #", "Date", "Name","Amount"]
  
    return (
      <Card className="my-4">
        <Card.Header className="dashboard-table-card-header"><h2>Recent Orders</h2></Card.Header>
        <Card.Body>
          <div className="table-responsive">
            <table className="table table-striped" id="dashboard-order-table">
              <thead>
                <tr>
                  {colNames.map((name, i) => <th scope="col" key={i} className="table-info">{name}</th>)}
                </tr>
              </thead>
              <tbody>
                {
                  recentOrders.length > 0 ? 
                  recentOrders.map(order =>
                    <tr key={order.id}>
                      <th scope="row">{order.id}</th>
                      <td>{order.date}</td>
                      <td>{order.name}</td>
                      <td>{order.revenue}</td>
                    </tr>
                  )
                  : <tr><td colSpan="4">No data to display</td></tr>
                }
              </tbody>
            </table>
          </div>
        </Card.Body>
      </Card>
    )
}

export default RecentOrderTable;
