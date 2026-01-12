'use client';

import ProtectedRoute from '@/app/components/ProtectedRoute';
import Goals from '@/app/components/Goals';

export default function GoalsPage() {
  return (
    <ProtectedRoute>
      <Goals />
    </ProtectedRoute>
  );
}
