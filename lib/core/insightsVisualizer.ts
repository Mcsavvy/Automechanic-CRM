import Chart from 'cli-chart';

interface RevenueByBuyer {
    totalRevenue: number,
    totalCost: number,
    buyerName: string,
    profit: number
}


export function createRevenueByBuyerChart(data: RevenueByBuyer[]) {
  const chart = new Chart({
    xlabel: 'Buyer',
    ylabel: 'Revenue',
    direction: 'y',
    height: 20,
    width: 80,
    lmargin: 15,
    step: 4,
  });

  data.forEach((d: RevenueByBuyer) => {
    chart.addBar(d.totalRevenue);
    chart.draw();
    console.log(d.buyerName);
  });
}
