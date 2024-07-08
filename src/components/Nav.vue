<template>
    <div class="card">
        <ButtonGroup>
            <Button label="Breakdown" size="small" icon="pi pi-table" @click="$router.push('/')"/>
            <Button label="Graph" size="small" icon="pi pi-chart-bar" @click="$router.push('/graph')" />
            <Button label="Post" size="small" icon="pi pi-file-plus" @click="$router.push('/post')" />
        </ButtonGroup>
    </div>
</template>

<script setup>
import { ref } from "vue";
import Button from 'primevue/button';
import ButtonGroup from 'primevue/buttongroup';
</script>

<style scoped>
.card {
    display: flex;
    justify-content: center;
    width: 100vw;
    margin: 4px 0;
}
</style>