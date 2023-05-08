
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Line } from 'react-chartjs-2';
import {faker} from '@faker-js/faker';
import './map.css';
import { useEffect, useState } from 'react';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

export default function Graph(props){
    const [selectedAsset, setSelectedAsset] = useState('');
    const [selectedBusinessCategory, setSelectedBusinessCategory] = useState('');
    const [selectedRiskFactor, setSelectedRiskFactor] = useState('');
    const [riskRating, setRiskRating] = useState([]);
    const [min, setMin]= useState(-0.05);
    const [max, setMax]= useState(1.5)
  const  options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Chart.js Line Chart',
          },
        },
      };

      const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

 const data = {
  labels,
  datasets: [
    {
      label: 'Asset Name',
      data: labels.map(() => faker.datatype.number({ min: min, max: max })),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Business Category',
      data: labels.map(() => faker.datatype.number({ min: min, max: max})),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
    {
        label: 'Risk Factors',
        data: labels.map(() => faker.datatype.number({ min: min, max: max })),
        borderColor: 'rgb(150, 62, 35)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
  ],
};

const handleAssetChange = (event) => {
    setSelectedAsset(event.target.value);
}

useEffect(() => { 
const getRiskRating = props.data.filter(value => value['Asset Name'] == selectedAsset);
setRiskRating(getRiskRating);
console.log(riskRating, 'riskRating', getRiskRating);
}, [selectedAsset])


useEffect(() => {
  let riskValues = riskRating.map(data => 
    data['Risk Rating']);
  setMin(0.1)
  setMax(0.9)
}, [riskRating, min, max])

const handleBusinessCategoryChange = (event) => {
    setSelectedBusinessCategory(event.target.value);
}

const handleRiskFactorChange = (event) => {
    setSelectedRiskFactor(event.target.value);
}

 return(
        <> 
        <div className='yearSelector'>
              <select className='yearDropdown' placeholder="Select Option"
                value={selectedAsset} onChange={handleAssetChange}>
                 {props.data.map((data, index) => (
                 <option key={index} value={data.value}>{data['Asset Name']}</option>
              ))}
              </select>&nbsp;&nbsp;
              <select className='yearDropdown' placeholder="Select Option"
                value={selectedBusinessCategory} onChange={handleBusinessCategoryChange}>
                 {props.data.map((data, index) => (
                 <option key={index} value={data.value}>{data['Business Category']}</option>
              ))}
              </select>&nbsp;&nbsp;
              <select className='yearDropdown' placeholder="Select Option"
                value={selectedRiskFactor} onChange={handleRiskFactorChange}>
                 {props.data.map((data, index) => (
                 <option key={index} value={data.value}>{data['Risk Factors']}</option>
              ))}
              </select>
        </div>
         <Line options={options} data={data} />
        </>
    )
}