import { calculateInvestmentResults, formatter } from '../util/investment.js';

export default function Results({ input }) {

    // const results = [];
    // calculateInvestmentResults(input, results);

    // if (results .length === 0) {
    //     return <p className='center'>Invalid input data provided</p>
    // }

    const resultsData = calculateInvestmentResults(input);
    const initialInvestement =
        resultsData[0].valueEndOfYear -
        resultsData[0].interest -
        resultsData[0].annualInvestment;
    
    // calculate the data and out put that results table
    return (
        <table id='result'>
            <thead>
                <tr>
                    <th>Year</th>
                    <th>Investment Value</th>
                    <th>Interest (Year)</th>
                    <th>Total Interest</th>
                    <th>Invested Capital</th>
                </tr>
            </thead>
            <tbody>
                {resultsData.map(yearData => {
                    const totalInterest =
                        yearData.valueEndOfYear -
                        yearData.annualInvestment * yearData.year -
                        initialInvestement;
                    const totalAmountInvested =
                        yearData.valueEndOfYear -
                        totalInterest;
                    return <tr key={yearData.year}>
                        <td>{yearData.year}</td>
                        <td>{formatter.format(yearData.valueEndOfYear)}</td>
                        <td>{formatter.format(yearData.interest)}</td>
                        <td>{formatter.format(totalInterest)}</td>
                        <td>{formatter.format(totalAmountInvested)}</td>
                    </tr>
                }
                )}
            </tbody>
            
        </table>
    )
}