async function main() {

    const timeChartCanvas = document.querySelector('#time-chart');
    const highestPriceChartCanvas = document.querySelector('#highest-price-chart');
    const averagePriceChartCanvas = document.querySelector('#average-price-chart');

    //fetch stock data from twelvedata.com
    const data = await fetch('https://api.twelvedata.com/time_series?symbol=BTNX,GME,MSFT,DIS:Huobi,TRP:TSX&interval=1day&apikey=507bf540879d404982af9bf55ba142a6')

    // checking to see if the fecth works 
    const working = await data.json()

    //destructed object to array
    const {GME, MSFT, DIS, BNTX} = working;

    const stocks = [GME, MSFT, DIS, BNTX];

    

}

main()