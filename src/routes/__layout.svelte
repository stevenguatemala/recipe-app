<script>
    import { navigating } from "$app/stores"

    import { loading } from "$lib/loading"

    import Loading from "$lib/loading.svelte"
    
   
   // @ts-ignore
     $: loading.setNavigate = (!!$navigating)

</script>

{$loading}

<slot />


<Loading />