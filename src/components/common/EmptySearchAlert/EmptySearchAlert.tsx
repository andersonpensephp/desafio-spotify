import { MagnifyingGlassIcon } from "@phosphor-icons/react";

interface EmptySearchAlertProps {
  title?: string;
  message?: string;
}

export default function EmptySearchAlert({
  title = 'Digite uma pesquisa',
  message = 'Nenhum resultado encontrado',
}: EmptySearchAlertProps) {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center text-center">
        <MagnifyingGlassIcon size={32} color="red" className="mb-2" />
        <h3 className="text-sm xl:text-xl text-red-500 mb-2">{title}</h3>
        <p className="text-xs xl:text-lg">{message}</p>
      </div>
    </div>
  );
}