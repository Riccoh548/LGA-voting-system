'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';

interface Candidate {
  id: number;
  name: string;
  party: string;
  selected: boolean;
}

export default function CandidatesPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const [candidates, setCandidates] = useState<Candidate[]>([
    { id: 1, name: 'John Doe', party: 'Chama cha Mapinduzi (CCM)', selected: false },
    { id: 2, name: 'Jane Smith', party: 'Chama cha Demokrasia na maendeleo (CHADEMA)', selected: false },
    { id: 3, name: 'Robert Johnson', party: 'Civic United Front (CUF)', selected: false },
    { id: 4, name: 'Sarah Williams', party: 'ACT-Wazalendo', selected: false },
  ]);

  const handleCandidateSelection = (id: number) => {
    setCandidates(candidates.map(candidate =>
      candidate.id === id ? { ...candidate, selected: !candidate.selected } : candidate
    ));
  };

  const handleConfirm = () => {
    const selectedCandidates = candidates.filter(c => c.selected);
    if (selectedCandidates.length > 0) {
      router.push('/confirm');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {candidates.map((candidate) => (
          <Card key={candidate.id} className={candidate.selected ? 'border-primary' : ''}>
            <CardHeader>
              <CardTitle>{candidate.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">{candidate.party}</p>
              <Button
                onClick={() => handleCandidateSelection(candidate.id)}
                variant={candidate.selected ? 'default' : 'outline'}
                className="w-full"
              >
                {candidate.selected ? 'Selected' : 'Select'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 flex justify-end">
        <Button onClick={handleConfirm}>{t('confirmVote')}</Button>
      </div>
    </div>
  );
}