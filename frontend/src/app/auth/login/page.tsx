import { LoginCard } from "@/components/custom/LoginCard";
import { Toaster } from "@/components/ui/toaster";

export default  function LoginPage(){
    return (
        <>
        <div className="flex justify-center items-center h-screen">
            <LoginCard/>
        </div>
            <Toaster klass=" "/>
        </>
    );
}