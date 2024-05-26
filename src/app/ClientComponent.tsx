// components/ClientComponent.tsx
'use client';

import React from 'react';
import { Post } from '@/_actions/post';

interface ClientComponentProps {
  data: Post[];
}

const ClientComponent: React.FC<ClientComponentProps> = ({ data }) => {
  return (
    <div>
      {data.map((item) => (
        <div key={item._id}>
          <h2>{item.msg}</h2>
        </div>
      ))}
    </div>
  );
};

export default ClientComponent;
