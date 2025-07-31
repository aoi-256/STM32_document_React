import { Routes, Route } from 'react-router-dom'
import Home from './components/Home.tsx'
import Login from './components/Login.tsx'

import Setup01Install from './components/Documents/Setup/01_Install/01_Install.tsx'
import Setup02Project from './components/Documents/Setup/02_Project/02_Project.tsx'
import Basic01LED from './components/Documents/Basic/01_LED/01_LED.tsx'
import Basic02Serial from './components/Documents/Basic/02_Serial/02_Serial.tsx'
import Basic03DMA from './components/Documents/Basic/03_DMA/03_DMA.tsx'
import Basic04PWM from './components/Documents/Basic/04_PWM/04_PWM.tsx'
import Basic05ADC from './components/Documents/Basic/05_ADC/05_ADC.tsx'
import Basic06SBUS from './components/Documents/Basic/06_SBUS/06_SBUS.tsx'
import Basic07Touka from './components/Documents/Basic/07_Touka/07_Touka.tsx'
import Basic08ToukaZidou from './components/Documents/Basic/08_ToukaZidou/08_ToukaZidou.tsx'
import Advance01WIAI2C from './components/Documents/Advance/01_WIA_I2C/01_WIA_I2C.tsx'
import Advance02ReadDataI2C from './components/Documents/Advance/02_ReadData_I2C/02_ReadData_I2C.tsx'
import Advance03WIASPI from './components/Documents/Advance/03_WIA_SPI/03_WIA_SPI.tsx'
import Advance04ReadDataSPI from './components/Documents/Advance/04_ReadData_SPI/04_ReadData_SPI.tsx'
import Dev01Struct from './components/Documents/Dev/01_Struct/01_Struct.tsx'
import Dev02ClassBasic from './components/Documents/Dev/02_Class_Basic/02_Class_Basic.tsx'
import Dev03ClassBasicWrite from './components/Documents/Dev/03_Class_Basic_Write/03_Class_Basic_Write.tsx'
import Dev04ClassAdvance from './components/Documents/Dev/04_Class_Advance/04_Class_Advance.tsx'
import Dev05ClassWrite from './components/Documents/Dev/05_Class_Write/05_Class_Write.tsx'
import Supplement01Tim from './components/Documents/Supplement/01_Tim/01_Tim.tsx'
import Supplement02ExecTime from './components/Documents/Supplement/02_Exec_Time/02_Exec_Time.tsx'
import Supplement03Printf from './components/Documents/Supplement/03_printf/03_printf.tsx'
import './App.css'

function App() {
  return (
    <>
      <main style={{ padding: '2rem' }}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/setup/01" element={<Setup01Install />} />
          <Route path="/setup/02" element={<Setup02Project />} />
          <Route path="/basic/01" element={<Basic01LED />} />
          <Route path="/basic/02" element={<Basic02Serial />} />
          <Route path="/basic/03" element={<Basic03DMA />} />
          <Route path="/basic/04" element={<Basic04PWM />} />
          <Route path="/basic/05" element={<Basic05ADC />} />
          <Route path="/basic/06" element={<Basic06SBUS />} />
          <Route path="/basic/07" element={<Basic07Touka />} />
          <Route path="/basic/08" element={<Basic08ToukaZidou />} />
          <Route path="/advance/01" element={<Advance01WIAI2C />} />
          <Route path="/advance/02" element={<Advance02ReadDataI2C />} />
          <Route path="/advance/03" element={<Advance03WIASPI />} />
          <Route path="/advance/04" element={<Advance04ReadDataSPI />} />
          <Route path="/dev/01" element={<Dev01Struct />} />
          <Route path="/dev/02" element={<Dev02ClassBasic />} />
          <Route path="/dev/03" element={<Dev03ClassBasicWrite />} />
          <Route path="/dev/04" element={<Dev04ClassAdvance />} />
          <Route path="/dev/05" element={<Dev05ClassWrite />} />
          <Route path="/supplement/01" element={<Supplement01Tim />} />
          <Route path="/supplement/02" element={<Supplement02ExecTime />} />
          <Route path="/supplement/03" element={<Supplement03Printf />} />
        </Routes>
      </main>
    </>
  )
}

export default App
