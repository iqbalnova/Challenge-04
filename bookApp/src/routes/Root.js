import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import MainRoutes from './MainRoutes'
import { navigationRef } from '../helpers/navigate'
import InternetConnectionAlert from "react-native-internet-connection-alert";

export default function Root() {
  return (
    <InternetConnectionAlert
      onChange={(connectionState) => {
        console.log("Connection State: ", connectionState);
      }}
      title="Koneksi Terputus"
      message="Tolong cek koneksi internet anda"
      >
      <NavigationContainer ref={navigationRef}>
                <MainRoutes />
        </NavigationContainer>
    </InternetConnectionAlert>  
  )
}