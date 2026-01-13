import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/services/supabase/lib/getCurrentUser";

export default async function AppPage() {
    const user = await getCurrentUser();
    console.log(user)

    return <>APP PAGE <Button>Button</Button></>
}