<template>
    <div class="card flex justify-center">
        <Message v-if="error" severity="error">Errors</Message>
        <FloatLabel>
            <InputText id="companyName" v-model="companyName" />
            <label for="companyName">Company Name</label>
        </FloatLabel>
        <Select v-model="selectedStatus" :options="applicationStatuses" optionLabel="name" placeholder="Select a Status" class="w-full md:w-56" /> <br />
        <Select v-model="selectedAppliedVia" :options="mockData.appliedVia" optionLabel="name" placeholder="Platform applied on" class="w-full md:w-56" /> <br />
        <Select v-model="selectedLocation" :options="locations" optionLabel="name" placeholder="Location" class="w-full md:w-56" /> <br />
        <Select v-model="selectedSite" :options="sites" optionLabel="name" placeholder="Site" class="w-full md:w-56" /> <br />
        <Button label="Submit" @click="handleSubmit"/>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { mapState } from 'vuex'
import InputText from 'primevue/inputtext';
import FloatLabel from 'primevue/floatLabel';
import Button from 'primevue/button';
import Select from 'primevue/select';
import Message from 'primevue/message';
import { useToast } from 'primevue/usetoast';
import mockData from '../mockData'

// the relevant methods
import { collection, addDoc } from "firebase/firestore"
// the firestore instance
import db from '../firebase/init.js'
const toast = useToast();

let error = ref(false);
let companyName = ref(null);
let selectedStatus = ref(mockData.status);
let selectedAppliedVia = ref(mockData.appliedVia[0]);
let selectedLocation = ref(null);
let selectedSite = ref(null);
let applicationStatuses = [];
const locations = mockData.locations.map((location) =>({name: location}))
const sites = mockData.sites.map((site) =>({name: site}))

for(let key in mockData.statuses){
    // console.log(key);
    applicationStatuses.push({...mockData.statuses[key], status: Number(key)})
}
selectedStatus.value = applicationStatuses[0]
selectedSite.value = sites[0]
selectedLocation.value = locations[1]

async function handleSubmit() {
    error.value = false;
    // console.log(!selectedAppliedVia.value, !companyName.value, !selectedStatus.value, !selectedLocation.value, !selectedSite.value );
    // console.log('x', selectedSite.value);
    if (!selectedAppliedVia.value || !companyName.value || !selectedStatus.value || !selectedLocation.value || !selectedSite.value) {
        return error.value = true;
    }
    let dataToSend = { 
        appliedVia: selectedAppliedVia.value.name, 
        name: companyName.value, 
        status: selectedStatus.value.status,
        site: selectedSite.value.name,
        location: selectedLocation.value.name,
    };
    try {
        console.log(dataToSend);
        // { id: Math.round(Math.random()), appliedVia: 'Linkedin', name: 'Boomer', status: 0 }, 
        const colRef = collection(db, 'applications')
        // create document and return reference to it
        const docRef = await addDoc(colRef, dataToSend)
        toast.add({ severity: 'success', summary: 'Info', detail: 'Created application', life: 3000 });
        // access auto-generated ID with '.id'
        console.log('Document was created with ID:', docRef.id) 
    } catch (error) {
        console.log(error);
        toast.add({ severity: 'error', summary: 'Error', detail: 'Error creating application', life: 3000 });
    }

}

</script>