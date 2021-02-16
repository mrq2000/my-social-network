import React from 'react';

import Layout from '../components/common/Layout';
import CoverImage from '../components/me/CoverImage';

const Me = () => {
  const content = 'me';
  return (
    <Layout>
      <CoverImage />
      {content}
    </Layout>
  );
};

export default Me;
