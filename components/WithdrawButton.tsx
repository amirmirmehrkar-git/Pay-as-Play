'use client';

import { useState } from 'react';
import WithdrawModal from './WithdrawModal';

interface WithdrawButtonProps {
  balance: number;
  address: string | null;
}

export default function WithdrawButton({ balance, address }: WithdrawButtonProps) {
  return <WithdrawModal balance={balance} address={address} />;
}

