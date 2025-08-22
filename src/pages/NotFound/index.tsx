import { SmileyXEyesIcon } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <SmileyXEyesIcon size={150} />
      <p className="text-2xl font-bold">Página não encontrada</p>
      <p className="text-gray-500">Desculpe, mas a página que você está procurando não foi encontrada.</p>
      <Button onClick={() => navigate("/")} className="mt-4">Voltar para a página inicial</Button>
    </div>
  );
}