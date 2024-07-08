<template>
    <Chart type="bar" :data="chartData" :options="chartOptions" class="" />
</template>


<script setup>
import { ref, onMounted } from "vue";
import Chart from 'primevue/chart';
import mockData from '../mockData';
// the relevant methods
import { collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore"
// the firestore instance
import db from '../firebase/init.js'

const jobApplications = ref([]);
const applicationsGen = ref([]);
const chartData = ref();
const chartOptions = ref();
let appliedVia = []

onMounted(async () => {
    await getData();
    setTimeout(() => {
        chartData.value = setChartData();
        chartOptions.value = setChartOptions();
    }, 5000);

});

function getData() {
    const collectionRef = collection(db, 'applications')
    getDocs(collectionRef)
    .then((snapshots) => {
        jobApplications.value = []
        snapshots.docs.forEach((doc) => {
            jobApplications.value.push({...doc.data(), id: doc.id})  
        })
        const appliedViaNames = mockData.appliedVia.map( av => av.name );
        let companiesFiltered = {}
        appliedViaNames.forEach((av, i) => {
            const filteredCompany = jobApplications.value.filter( ja => ja.appliedVia == av);
            companiesFiltered[av] = filteredCompany
        });
        let count = 0;
        for (const key in companiesFiltered) {
            let resultObject = {};
            let id = count;
            let objKeyContent = companiesFiltered[key];
            count++;
            resultObject.id = id;
            resultObject.appliedVia = key;
            resultObject.applicationsAmount = objKeyContent.length;
            applicationsGen.value.push(resultObject)
        }
        applicationsGen.value.forEach((item) => {
            // console.log('item', item);
            return appliedVia.push(item.appliedVia)
        });
        console.log('getData appliedVia', appliedVia);
    });

}
;
// mockData.applicationsGeneral.forEach((item) => appliedVia.push(item.appliedVia));

function getStatusCountOfCompanies(status) {
    console.log('getStatusCountOfCompanies');
    const keysAndCount = new Object();
    const filteredData = jobApplications.value.filter( appl => {
        return appl.status == status
    })
    filteredData.forEach((appl) => {
        !keysAndCount[appl.appliedVia] ? keysAndCount[appl.appliedVia] = 1 : keysAndCount[appl.appliedVia]++;
    })
    return keysAndCount;
}

const setChartData = () =>  {
    console.log('setChartData');
    const documentStyle = getComputedStyle(document.documentElement);
    // loop through statuses
    // append companies status to each sub array
    let dataHere = [];

    for(let item in mockData.statuses) {
        const statusCountOfCompanies = getStatusCountOfCompanies(item)
        console.log('statusCountOfCompanies',' status number: ', item, statusCountOfCompanies);
        console.log('appliedVia', appliedVia);
        const dataNumbers = appliedVia.map((cn) => {
            // console.log('xx', cn, statusCountOfCompanies[cn]);
            return statusCountOfCompanies[cn] || 0
        })
        // console.log('dataNumbers', dataNumbers);
        dataHere.push({
            ...mockData.statuses[item],
            type: 'bar',
            label: mockData.statuses[item].name,
            backgroundColor: mockData.statuses[item].hex,
            data: dataNumbers
        })
    }
    // let dataHere = statuses.map((status) => ({
    //     {
    //         ...status,
    //         applications.filter(())
    //     }
    // }));
    console.log('dataHere', dataHere);
    return {
        labels: appliedVia,
        datasets: [
            ...dataHere
            // {
            //     type: 'bar',
            //     label: 'Application Rejected',
            //     backgroundColor: mockData.statuses[1].hex,
            //     data: [50, 10] // 0 linkedin status 1, 1: WWR status 0
            // },
            // {
            //     type: 'bar',
            //     label: 'Application Accepted',
            //     backgroundColor: documentStyle.getPropertyValue('--p-gray-500'),
            //     data: [3, 3]
            // },
            // {
            //     type: 'bar',
            //     label: 'Dataset 3',
            //     backgroundColor: documentStyle.getPropertyValue('--p-orange-500'),
            //     data: [41, 52, 24, 74, 23, 21, 32]
            // }
        ]
    };
};
const setChartOptions = () =>  {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--p-text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
    const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');

    return {
        maintainAspectRatio: false,
        aspectRatio: 0.8,
        plugins: {
            tooltips: {
                mode: 'index',
                intersect: false
            },
            legend: {
                labels: {
                    color: textColor
                }
            }
        },
        scales: {
            x: {
                stacked: true,
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder
                }
            },
            y: {
                stacked: true,
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder
                }
            }
        }
    };
}
</script>
<style>
canvas {
    height: 600px !important;
}
</style>