<script lang="ts">
    import { Button } from "$lib/components/ui/button";
    import { Card, CardContent, CardDescription, CardHeader, CardFooter, CardTitle, Content } from "$lib/components/ui/card"
    import { Input } from "$lib/components/ui/input";
    import { Label } from "$lib/components/ui/label";
    import * as Select from "$lib/components/ui/select/index.js";
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
                    <Button type="submit">Anmelden</Button>
                </div>
            </div>
        </form>
    </CardContent>
</Card>