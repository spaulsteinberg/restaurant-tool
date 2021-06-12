import React, {useEffect, useState} from 'react';
import {db} from'../../../firebase';

const Dashboard = () => {

    const [dbData, setDbData] = useState();
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                await db.collection(process.env.REACT_APP_ORDER_DB_COLLECTION)
                    .get()
                    .then(response => response.docs)
                    .then(docs => docs.map(d => console.log(d.data())))
                    .catch(err => console.log(err))
            } catch (err) {
                console.log("here")
                setError(err)
            } finally {
                console.log("here finally")
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    return (
        <div>
            Hi im the dashboard bruh
        </div>
    )
}

export default Dashboard;
