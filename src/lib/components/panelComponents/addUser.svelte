<script lang="ts">
    import { Button } from "$lib/components/ui/button";
    import { Card, CardContent, CardDescription, CardHeader, CardFooter, CardTitle, Content } from "$lib/components/ui/card"
    import { Input } from "$lib/components/ui/input";
    import { Label } from "$lib/components/ui/label";
    import * as Select from "$lib/components/ui/select/index.js";
	import type { Selected } from "bits-ui";



    let selectedRight: string
    $: console.log()
</script>

<Card>
    <CardHeader>
        <CardTitle>Nutzer hinzufügen</CardTitle>
    </CardHeader>
    <CardContent>
        <form action="?/addUser" method="POST">
            <div class="grid w-full items-center gap-4">
                <div class="flex flex-col space-y-1.5">
                    <Label for="username"></Label>
                    <Input id="username" name="username" placeholder="Username"/>
                    <Label for="password"></Label>
                    <Input id="password" name="password" placeholder="Passwort"/>
                    <Select.Root selected={selectedRights} onSelectedChange={(v) => }>
                        <Select.Trigger id="isAdmin">
                            <Select.Value placeholder="Berechtigungen"/>
                        </Select.Trigger>
                        <Select.Content>
                            <Select.Item value="isAdmin" label="Administrator"></Select.Item>
                            <Select.Item value="isNotAdmin" label="Kassierer"></Select.Item>
                        </Select.Content>
                    </Select.Root>
                    <input hidden bind:value={selectedRights} name="selectedRights" id="selectedRights"/>
                    <Button type="submit">Nutzer hinzufügen</Button>
                </div>
            </div>
        </form>
    </CardContent>
</Card>