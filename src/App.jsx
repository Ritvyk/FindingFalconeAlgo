import React from 'react';
import FindFalconeApp from './FindFalconeApp';

import { FalconeAPIProvider } from './app_data_providers/FalconeAPIProvider';


function App() {
  return (
    <div className="w-full h-screen">
      <FalconeAPIProvider>
        <FindFalconeApp />
      </FalconeAPIProvider>

    </div>
  );
}

export default App;
