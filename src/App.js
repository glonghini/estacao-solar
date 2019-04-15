import React from 'react';

import { PageHeader } from "./components/Header.js";
import { Home } from './views/Home.js';

export const App = () => {
  return(<div>
    <PageHeader />
    <Home />
  </div>
  )
}
