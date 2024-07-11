 //useDimension.js hook  
//  import { ref, onMounted, onUnmounted } from 'vue';
//  const  useDimension=()=> {
//    const width = ref(window.innerWidth);
//    const height = ref(window.innerHeight);
//    const handleResize = () => {
//      width.value = window.innerWidth;
//      height.value = window.innerHeight;
//    }
//    onMounted(()=> window.addEventListener('resize', handleResize))
//    onUnmounted(()=> window.removeEventListener('resize', handleResize)) 
//    return {width,height}
//  };
//  export default useDimension;

interface rejectAndAcceptProps{
    label: string,
    severity: string,
    outlined: boolean
}

 //useDimension.js hook  
 import { ref, onMounted, onUnmounted } from 'vue';
 import { useConfirm } from "primevue/useconfirm";
 
 const  useConfirmCustom = () => {
    const confirm = useConfirm();
    const confirm1 = (
            { message = 'Are you sure you want to proceed?' }: { message: string; },
            { header = 'Confirmation' }: { header: string; },
            { icon = 'pi pi-exclamation-triangle' }: { icon: string; },
            { rejectProps = { label: 'Cancel', severity: 'secondary', outlined: true } }: { rejectProps: rejectAndAcceptProps; },
            { acceptProps = { label: 'Delete', severity: 'secondary', outlined: true }} ,
            acceptAction: Function
        ) => {
      confirm.require({
          message: message,
          header: header,
          icon,
          rejectProps,
          acceptProps,
          accept: () => {
            acceptAction()
            //   toast.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
          },
          reject: () => {
            //   toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
          }
      });
  };
   return {confirm1}
 };
 export default useConfirmCustom;