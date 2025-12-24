'use client';
import PageContainer from '@/components/layout/page-container';
import React, { useEffect, useRef, useState } from 'react';

function Page() {
  return (
    <PageContainer scrollable={false}>
      <div className='flex-shrink-0'>
        <div className='mb-2 flex w-full items-center justify-between'>
          <div className='flex flex-col'>
            <h1 className='text-xl font-semibold text-[#525252] dark:text-[#ffffff]'>
              Starter template
            </h1>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}

export default Page;
