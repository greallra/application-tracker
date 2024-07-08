
<template>
    <div> 
       <DataTable :value="jobApplications" showGridlines tableStyle="min-width: 50rem">
        <Column v-for="column in columns" :field="column.field" :header="column.header">
            <template #body="{ data, field }">
                <div 
                    v-if="field === 'status'"
                    class="status-cont">
                    <div><ProgressBar :value="`${data[field]}0`"></ProgressBar></div>
                    <!-- <div>{{ mockData.statuses[data[field]].name }}</div>    -->
                </div>
                <div v-else-if="field === 'actions'">
                    <Button label="" icon="pi pi-trash"  severity="danger" size="small" @click="() => handleDelete(data.id)"/>
                    <Button label="" icon="pi pi-pencil"  severity="info" size="small" @click="() => handleEdit(data.id)"/>
                </div>
                <span v-else>{{ data[field] }}</span>
            </template>
        </Column>
    </DataTable>
    <Button label="" icon="pi pi-refresh"  severity="danger" size="small" @click="getData"/>
    <Teleport to="body"><EditDialog :visible="editDialogVisible" @close-dialog="closeDialog"><Form :formData="formData" @submit="handleSubmitEdit"/></EditDialog></Teleport>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import mockData from '../mockData'
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ProgressBar from 'primevue/progressbar';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import EditDialog from '../components/EditDialog.vue'
import Form from '../components/Form.vue'

// the relevant methods
import { collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore"
// the firestore instance
import db from '../firebase/init.js'
import useConfirmCustom from '../hooks/useConfirmCustom'
import { useToast } from 'primevue/usetoast';
const { confirm1 } = useConfirmCustom()
const toast = useToast();
const editDialogVisible = ref(false);
const formData = ref(null);

let columns = [
    { field: 'name', header: 'Name' },
    { field: 'appliedVia', header: 'Applied Via' },
    { field: 'location', header: 'location' },
    { field: 'site', header: 'Site' },
    { field: 'status', header: 'Status' },
    { field: 'actions', header: 'Actions' },
];
const jobApplications = ref([]);

async function deleteAction(docId) {
    console.log('delete');
    try {
        await deleteDoc(doc(db, "applications", docId));
        getData();
        toast.add({ severity: 'success', summary: 'Info', detail: 'Deleted application', life: 3000 });
    } catch (error) {
        console.log(error);
        toast.add({ severity: 'error', summary: 'Error', detail: 'Error Deleting document', life: 3000 });
    }
}

function handleDelete (docId) {
    confirm1(
        {message: 'sure?'}, 
        {header: 'Delete Application?'}, 
        { icon: 'pi pi-exclamation-triangle' }, 
        { rejectProps: { label: 'Cancel', severity: 'secondary', outlined: true } },
        { acceptProps: { label: 'Delete', severity: 'secondary', outlined: true } },
        () => deleteAction(docId)
    )
}
function handleEdit(docId) {
    // console.log(jobApplications);
    const data = jobApplications.value.find((ja) => ja.id == docId)
    formData.value = data
    editDialogVisible.value = true;
}
async function handleSubmitEdit(data) {
    console.log('handleSubmitEdit', data);
    try {
        const ref = doc(db, "applications", data.id);
        await updateDoc(ref, data);
        toast.add({ severity: 'success', summary: 'Info', detail: 'Edited application', life: 3000 });
        closeDialog();
        getData();
    } catch (error) {
        console.log(error);
        toast.add({ severity: 'danger', summary: 'Info', detail: 'Error Editing', life: 3000 });
    }

}
function closeDialog() {
    editDialogVisible.value = false;
}
onMounted(() => {
    getData();
})

function getData() {
    const collectionRef = collection(db, 'applications')
    getDocs(collectionRef)
    .then((snapshots) => {
        jobApplications.value = []
        snapshots.docs.forEach((doc) => {
            jobApplications.value.push({...doc.data(), id: doc.id})  
        })
    });
}

function getStatusProgressPercentage(value) {
    
}

</script>

<style>

.status-cont {
    /* display: flex; */
    
}
</style>