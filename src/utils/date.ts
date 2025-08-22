import { format, parse } from 'date-fns';
import { ptBR } from 'date-fns/locale';

function parseDate(dateStr: string): Date {
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    return parse(dateStr, 'yyyy-MM-dd', new Date());
  }
  if (/^\d{4}-\d{2}$/.test(dateStr)) {
    return parse(dateStr, 'yyyy-MM', new Date());
  }
  if (/^\d{4}$/.test(dateStr)) {
    return parse(dateStr, 'yyyy', new Date());
  }
  return new Date(dateStr);
}

export const formatDate = (date: string, pattern: 'dd/MM/yyyy' | 'yyyy-MM-dd' | 'MM/dd/yyyy') => {
  return format(parseDate(date), pattern, { locale: ptBR });
};
