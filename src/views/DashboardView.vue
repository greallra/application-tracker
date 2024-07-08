<template>
    <div class="pt-3 mt-3">
      
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

let columns = [
    { field: 'appliedVia', header: 'Applied Via' },
    { field: 'name', header: 'Name' },
    { field: 'status', header: 'Status' },
];

const fakePromise = () => {
    return new Promise((resolve, reject) => {
        let data = []
        setTimeout(() => {
            data = [
                    { id: 1, appliedVia: 'Linkedin', name: 'Datadog', status: 'The status' }, 
                    { id: 2, appliedVia: 'We Work Remotely', name: 'Toggle', status: 'The status' }, 
                    { id: 3, appliedVia: 'Indeed', name: 'Zark', status: 'The status' }]
            resolve(data)
        }, 3000);
    })
}

onMounted(() => {
    fakePromise().then((res) => {
        console.log('res', res);
        jobApplications.value = res;
    })
})
const jobApplications = ref();

</script>