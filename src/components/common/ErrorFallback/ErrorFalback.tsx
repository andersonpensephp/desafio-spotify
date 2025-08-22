import { WarningCircleIcon } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";

export default function ErrorFallback() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <WarningCircleIcon size={50} color="red" />
      <h1>Algo deu errado</h1>
      <p>Desculpe, mas algo deu errado. Tente novamente mais tarde.</p>
      <Button onClick={() => window.location.reload()}>Tentar novamente</Button>
    </div>
  );
}