import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainLayout from '@/app/_layout';

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <MainLayout />
    </NavigationContainer>
  );
};

export default App;
