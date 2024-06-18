<script lang="ts">
	import "../../app.css";
	import Button from "$lib/components/ui/button/button.svelte";
	import {Card, CardContent, CardDescription, CardHeader, CardFooter, CardTitle, Content} from "$lib/components/ui/card"
	import Input from "$lib/components/ui/input/input.svelte";
	import Label from "$lib/components/ui/label/label.svelte";
</script>

<div class="bg-background w-screen h-screen p-4 flex justify-center items-center">
	<p>Hi</p>
	<div>
		<Card>
			<CardHeader>
				<CardTitle>Anmelden</CardTitle>
			</CardHeader>
			<CardContent>
				<form action="?/login" method="POST">
					<div class="grid w-full items-center gap-4">
						<div class="flex flex-col space-y-1.5">
							<Label for="username"></Label>
							<Input id="username" name="username" placeholder="Username"/>
							<Label for="password"></Label>
							<Input id="password" name="password" placeholder="Passwort"/>
							<Button type="submit">Anmelden</Button>
						</div>
					</div>
				</form>
			</CardContent>
		</Card>
	</div>
</div>