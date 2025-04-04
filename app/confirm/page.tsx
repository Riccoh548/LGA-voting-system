'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';
import { useToast } from '@/hooks/use-toast';

export default function ConfirmPage() {
  const { t } = useLanguage();
  const { toast } = useToast();

  const handleConfirm = () => {
    // Add blockchain interaction logic here
    toast({
      title: 'Vote Confirmed',
      description: 'Your vote has been recorded on the blockchain.',
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>{t('confirm')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p>Selected Candidate: John Doe</p>
            <p>Party: Progressive Party</p>
            <Button onClick={handleConfirm} className="w-full">
              {t('confirmVote')}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}