async function main() 
{

    const timeChartCanvas = document.querySelector('#time-chart');
    const highestPriceChartCanvas = document.querySelector('#highest-price-chart');
    const averagePriceChartCanvas = document.querySelector('#average-price-chart');

    //fetch stock data from twelvedata.com
    const data = await fetch('https://api.twelvedata.com/time_series?symbol=GME,MSFT,DIS,BTNX&interval=1day&apikey=507bf540879d404982af9bf55ba142a6')

    // checking to see if the fecth works 
    const working = await data.json()

    //destructed object to array
    const {GME, MSFT, DIS, BNTX} = working;

    const stocks = [GME, MSFT, DIS, BNTX];

    stocks.forEach(stock => stock.values.reverse())

    //making a time chart for the fetched stocks
    new Chart(timeChartCanvas.getContext('2d'),
    {
        type: 'line',
        data: 
        {
            labels: stocks[0].values.map(value => value.datetime),
            datasets: stocks.map( stock => ({
                label: stock.meta.symbol,
                data: stock.values.map(value => parseFloat(value.high)),
                backgroundColor: getColor(stock.meta.symbol),
                borderColor: getColor(stock.meta.symbol)
            }))
        }
    });  
}

//differet colors for each line of stocks
function getColor(stock){
    if(stock === "GME"){
        return 'rgba(61, 161, 61, 0.7)'
    }
    if(stock === "MSFT"){
        return 'rgba(209, 4, 25, 0.7)'
    }
    if(stock === "DIS"){
        return 'rgba(18, 4, 209, 0.7)'
    }
    if(stock === "BNTX"){
        return 'rgba(166, 43, 158, 0.7)'
    }
}

main()