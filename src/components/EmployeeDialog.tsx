
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "@/hooks/useTranslation";
import { useCurrency } from "@/hooks/useCurrency";

interface Employee {
  id: string;
  first_name: string;
  last_name: string;
  email: string | null;
  phone: string | null;
  position: string | null;
  hourly_rate: number | null;
  hire_date: string | null;
  is_active: boolean | null;
  created_at: string | null;
}

interface EmployeeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  employee?: Employee | null;
  onEmployeeSaved: () => void;
}

export const EmployeeDialog = ({ 
  open, 
  onOpenChange, 
  employee, 
  onEmployeeSaved 
}: EmployeeDialogProps) => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    position: "",
    hourly_rate: "",
    hire_date: "",
  });
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();
  const { t } = useTranslation();
  const { currency } = useCurrency();

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

  useEffect(() => {
    if (employee) {
      setFormData({
        first_name: employee.first_name || "",
        last_name: employee.last_name || "",
        email: employee.email || "",
        phone: employee.phone || "",
        position: employee.position || "",
        hourly_rate: employee.hourly_rate?.toString() || "",
        hire_date: employee.hire_date || "",
      });
    } else {
      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        position: "",
        hourly_rate: "",
        hire_date: "",
      });
    }
  }, [employee, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);

    try {
      const employeeData = {
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email || null,
        phone: formData.phone || null,
        position: formData.position || null,
        hourly_rate: formData.hourly_rate ? parseFloat(formData.hourly_rate) : null,
        hire_date: formData.hire_date || null,
        user_id: user.id,
      };

      if (employee) {
        const { error } = await supabase
          .from("employees")
          .update(employeeData)
          .eq("id", employee.id);

        if (error) throw error;

        toast({
          title: t('success'),
          description: t('employee_updated_successfully'),
        });
      } else {
        const { error } = await supabase
          .from("employees")
          .insert([employeeData]);

        if (error) throw error;

        toast({
          title: t('success'),
          description: t('employee_created_successfully'),
        });
      }

      onEmployeeSaved();
    } catch (error) {
      console.error("Erreur lors de la sauvegarde:", error);
      toast({
        title: t('error'),
        description: t('unable_to_save_employee'),
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {employee ? t('edit_employee') : t('new_employee')}
          </DialogTitle>
          <DialogDescription>
            {employee 
              ? t('edit_employee_info_description')
              : t('add_employee_team_description')
            }
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="first_name">{t('first_name')} *</Label>
                <Input
                  id="first_name"
                  value={formData.first_name}
                  onChange={(e) => setFormData(prev => ({ ...prev, first_name: e.target.value }))}
                  placeholder={t('your_first_name')}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="last_name">{t('last_name')} *</Label>
                <Input
                  id="last_name"
                  value={formData.last_name}
                  onChange={(e) => setFormData(prev => ({ ...prev, last_name: e.target.value }))}
                  placeholder={t('your_last_name')}
                  required
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="position">{t('position')}</Label>
              <Input
                id="position"
                value={formData.position}
                onChange={(e) => setFormData(prev => ({ ...prev, position: e.target.value }))}
                placeholder={t('position_placeholder')}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">{t('email')}</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                placeholder={t('email_placeholder')}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">{t('phone')}</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                placeholder={t('phone_placeholder')}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="hourly_rate">{t('hourly_rate')} ({getCurrencySymbol()})</Label>
                <Input
                  id="hourly_rate"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.hourly_rate}
                  onChange={(e) => setFormData(prev => ({ ...prev, hourly_rate: e.target.value }))}
                  placeholder={t('hourly_rate_placeholder')}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="hire_date">{t('hire_date')}</Label>
                <Input
                  id="hire_date"
                  type="date"
                  value={formData.hire_date}
                  onChange={(e) => setFormData(prev => ({ ...prev, hire_date: e.target.value }))}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              {t('cancel')}
            </Button>
            <Button 
              type="submit" 
              disabled={loading}
              className="bg-orange-600 hover:bg-orange-700"
            >
              {loading ? t('saving') : (employee ? t('modify') : t('create'))}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
