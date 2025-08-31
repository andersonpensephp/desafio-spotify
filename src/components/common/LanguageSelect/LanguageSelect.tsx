import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslation } from "react-i18next";

export default function LanguageSelect() {
  const { i18n } = useTranslation();

  const handleLanguageChange = (language: string) => {
    i18n.changeLanguage(language);
  };

  return (
    <Select defaultValue={i18n.language} onValueChange={handleLanguageChange}>
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="en-US">English(US)</SelectItem>
        <SelectItem value="pt-BR">Português(BR)</SelectItem>
      </SelectContent>
    </Select>
  );
}
