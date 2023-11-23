import { useState, useEffect } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

export default function Graphics({textField}){
    const [data, setData] = useState(new Map())

    // Generate bar chart of top 10 more frequency words
    function generateCharts(){
        const words = textField.split(" ")
        const dataMap = new Map()

        // Create map counting number of occurnaces of each word
        words.forEach((word) => {
            if(dataMap.has(word)){
                dataMap.set(word, dataMap.get(word) + 1)
            } else {
                dataMap.set(word, 1)
            }
        })

        // Sort by value
        let sortedData = new Map(Array.from(dataMap).sort((x,y) => y[1] - x[1])) //line based on https://www.geeksforgeeks.org/how-to-sort-a-map-in-javascript/
        
        // Get top 10 words from sortedData
        let sortedShort = new Map();
        for (const [key, val] of sortedData){
            if (sortedShort.size < 10){
                sortedShort.set(key,val);
            }
        }
        
        setData(sortedShort)
    }

    useEffect(()=>{
        generateCharts()
    },[textField])

    //Using charts from https://mui.com/ library
    return(
        <>
            {data.size > 1 &&
            <>
                <br/>
                <h4>Top 10 Most Frequent Words:</h4>
                <BarChart
                xAxis={[{ scaleType: 'band', data: Array.from(data.keys()) }]}
                series={[{ data: Array.from(data.values()) }]}
                width={500}
                height={300}
                />
            </>
            }
        </>
    )
}