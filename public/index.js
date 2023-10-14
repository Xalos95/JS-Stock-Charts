async function main() 
{

    const timeChartCanvas = document.querySelector('#time-chart');
    const highestPriceChartCanvas = document.querySelector('#highest-price-chart');
    const averagePriceChartCanvas = document.querySelector('#average-price-chart');

    //fetch stock data from twelvedata.com
    const data = await fetch('https://api.twelvedata.com/time_series?symbol=GME,MSFT,DIS,BNTX&interval=1day&apikey=b2b0e11651294ee9a789558a1625b754')
    

    // checking to see if the fecth works 
    const working = await data.json()

    console.log(working)
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

     new Chart(highestPriceChartCanvas.getContext('2d'),
    {
        type: 'bar',
        data: 
        {
            labels: stocks.map(stock => stock.meta.symbol),
            datasets: 
            [{
                label: 'Highest',
                backgroundColor: stocks.map(stock => {
                    getColor(stock.meta.symbol)
                }),
                borderColor: stocks.map(stock => {
                    getColor(stock.meta.symbol)
                }), 
                data: stocks.map(stock => {
                    getHighest(stock.values)
                })
            }]
        }

    });

}

function getHighest(values)
{
    let highest = 0;
    values.forEach( value => {
        if(parseFloat(value.high) > highest)
        {
            highest = value.high
        }
        return highest
       
    })
    
}

//differet colors for each line of stocks
function getColor(stock)
{
    if(stock === "GME")
    {
        return 'rgba(61, 161, 61, 0.7)'
    }
    if(stock === "MSFT")
    {
        return 'rgba(209, 4, 25, 0.7)'
    }
    if(stock === "DIS")
    {
        return 'rgba(18, 4, 209, 0.7)'
    }
    if(stock === "BNTX")
    {
        return 'rgba(166, 43, 158, 0.7)'
    }
}

main()