import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

export const formatDate = (date: string, pattern: 'dd/MM/yyyy' | 'yyyy-MM-dd' | 'MM/dd/yyyy') => {
  return format(new Date(date), pattern, { locale: ptBR })
}
