import exchangesImport from '../mockData/exchanges';
import ExchangeItem from '../components/ExchangeItem'
import { useEffect, useState } from 'react';

const exchangeContStyle = {
    width: '600px',
    margin: 'auto'
}


const exchanges = () => {
    const [exchanges, setExchanges] = useState([])
   console.log('exchangesImport', exchangesImport);
   useEffect(() => {
    setExchanges(exchangesImport)
   }, [])
    return (
        <div style={exchangeContStyle}>
            <h2>Today</h2>
            {exchanges.length > 0 && exchanges.map((exchange) => {
                return <ExchangeItem 
                    location={exchange.location} 
                    capacity={exchange.capacity} 
                    organiser={exchange.organiser} 
                    participants={exchange.participants} 
                    time={exchange.time}
                    />
            })}
        </div>
    )
}
export default exchanges;