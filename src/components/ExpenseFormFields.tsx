
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTranslation } from "@/hooks/useTranslation";
import { useCurrency } from "@/hooks/useCurrency";

interface Project {
  id: string;
  name: string;
}

interface ExpenseFormFieldsProps {
  formData: {
    description: string;
    amount: string;
    category: string;
    date: string;
    project_id: string;
    receipt_url: string;
  };
  updateFormData: (field: string, value: string) => void;
  projects: Project[];
}

export const ExpenseFormFields = ({ formData, updateFormData, projects }: ExpenseFormFieldsProps) => {
  const { t } = useTranslation();
  const { currency } = useCurrency();

  const categories = [
    { value: "Matériaux", label: t('materials_category') },
    { value: "Main-d'œuvre", label: t('labor_category') },
    { value: "Transport", label: t('transport_category') },
    { value: "Équipement", label: t('equipment_category') },
    { value: "Permis", label: t('permits_category') },
    { value: "Assurance", label: t('insurance_category') },
    { value: "Autre", label: t('other_category') }
  ];

  const getCurrencySymbol = () => {
    const symbols: { [key: string]: string } = {
      'EUR': '€',
      'USD': '$',
      'GBP': '£',
      'CAD': 'CAD',
      'CHF': 'CHF',
      'XOF': 'F CFA'
    };
    return symbols[currency] || currency;
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="description">{t('description')} *</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => updateFormData("description", e.target.value)}
          placeholder={t('expense_description_placeholder')}
          required
          rows={3}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="amount">{t('amount')} ({getCurrencySymbol()}) *</Label>
          <Input
            id="amount"
            type="number"
            value={formData.amount}
            onChange={(e) => updateFormData("amount", e.target.value)}
            placeholder="0.00"
            min="0"
            step="0.01"
            required
          />
        </div>
        
        <div>
          <Label htmlFor="date">{t('date')}</Label>
          <Input
            id="date"
            type="date"
            value={formData.date}
            onChange={(e) => updateFormData("date", e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="category">{t('category')}</Label>
          <Select value={formData.category} onValueChange={(value) => updateFormData("category", value)}>
            <SelectTrigger>
              <SelectValue placeholder={t('select_category')} />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="project_id">{t('project')}</Label>
          <Select value={formData.project_id} onValueChange={(value) => updateFormData("project_id", value)}>
            <SelectTrigger>
              <SelectValue placeholder={t('select_project')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="no_project">{t('no_project')}</SelectItem>
              {projects.map((project) => (
                <SelectItem key={project.id} value={project.id}>
                  {project.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="receipt_url">{t('receipt_url')}</Label>
        <Input
          id="receipt_url"
          type="url"
          value={formData.receipt_url}
          onChange={(e) => updateFormData("receipt_url", e.target.value)}
          placeholder={t('receipt_url_placeholder')}
        />
      </div>
    </div>
  );
};
