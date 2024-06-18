<script>
    	import "../app.css";
        import { page } from '$app/stores';
</script>

<div class="h-screen w-screen flex justify-center items-center">
    <div class="text-gray-500 flex flex-col justify-center">
        <p class="text-center">{$page.error?.message}</p>
        <a class="text-center underline" href="/">Anmelden</a>
    </div>
</div>


