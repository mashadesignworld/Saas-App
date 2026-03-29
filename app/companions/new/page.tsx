import CompanionForm from "@/components/CompanionForm";
import { newCompanionPermissions } from "@/lib/actions/companion.actions";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link  from "next/link";

const NewCompanion = async () => {  
  const { userId } = await auth();
  if(!userId) redirect('/sign-in');

  const canCreateCompanion = await newCompanionPermissions();


  return (
    <main className="min-lg:w-1/3 min-md:w-2/3 items-center justify-center">
      {canCreateCompanion ? (
        <article className="w-full gap-4 flex flex-col">
       <h1> Companion Builder</h1>
        <CompanionForm />
      </article>
      ) : (
        <article className="companion-limit">
          <Image src="/images/limit.svg" alt="Companion Limit Reached" width={360} height={230}/>
          <div className = 'cta-badge'>
            Upgrade Your Plan to Create More Companions
          </div>
          <h1>You&apos;ve Reached Your Limit</h1>
           <p className="text-lg text-muted-foreground">
            
            It looks like you&apos;ve reached the limit for creating companions on the free plan. To continue building and exploring with more companions, please consider upgrading your subscription.
          </p>
          <Link href="/subscription" className="bt-primary w-full justify-center">
            Upgrade My Plan
          </Link>
          </article>
      )}

    </main>
  )
}

export default NewCompanion