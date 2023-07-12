import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput,Keyboard,TouchableOpacity } from 'react-native';
import { VictoryBar, VictoryChart, VictoryTheme,VictoryAxis,VictoryLabel } from 'victory-native';
import { fetchAllData } from './database';
import { createTable, insertData,deleteAllData } from './database';

export default function App() {
  const [data, setData] = useState([]);
  const [label, setLabel] = useState('');
  const [value, setValue] = useState('');



  useEffect(() => {
    createTable();
    fetchAllData((data) => {
      setData(data);
    });
  }, []);

  const generateRandomColor = () => {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return `#${randomColor}`;
  };

  const handleAddData = () => {
    insertData(label, parseInt(value));
    setLabel('');
    setValue('');
    fetchAllData((data) => {
      setData(data);
    });
  };

  const handleDeleteAllData = () => {
    deleteAllData(() => {
      fetchAllData((data) => {
        setData(data);
      });
    });
  };
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 25, fontWeight: '800' }}>หน้าเเสดงกราฟของการลงทุน DEMO</Text>
      <TextInput
        style={styles.input}
        placeholder="ชื่อการลงทุน"
        value={label}
        onChangeText={setLabel}
        
      />
      <TextInput
        style={styles.input}
        placeholder="มูลค่า"
        value={value}
        onChangeText={setValue}
        keyboardType="numeric"
        onSubmitEditing={() => {
          handleAddData();
          Keyboard.dismiss(); // ปิดแป้นพิมพ์หลังจากกดปุ่มเสร็จสิ้น
        }}// เพิ่มส่วนนี้เพื่อจัดการเหตุการณ์เมื่อกดปุ่มเสร็จสิ้นในแป้นพิมพ์
      />
      <TouchableOpacity
      style={{backgroundColor:'blue',height:50,width:'100%',borderRadius:10,justifyContent:'center'}}
      onPress={() => {
        handleAddData();
        Keyboard.dismiss(); // ปิดแป้นพิมพ์อัตโนมัติเมื่อกดปุ่ม "เพิ่มข้อมูล"
      }}>
          <Text style={{fontWeight:'800',color:'#FFF',alignSelf:'center',fontSize:30}}>
            เพิ่มเเละเเสดงผล
          </Text>
      </TouchableOpacity>
      <TouchableOpacity
     style={{
      backgroundColor: 'red',
      height: 50,
      width: '100%',
      borderRadius: 10,
      justifyContent: 'center',
      marginTop: 5,
    }}
    onPress={handleDeleteAllData}
  >
    <Text style={{ fontWeight: '800', color: '#FFF', alignSelf: 'center', fontSize: 30 }}>
         เคลียร์ข้อมูล
        </Text>
      </TouchableOpacity>
      {data.length > 0 ? (
       <VictoryChart theme={VictoryTheme.grayscale} domainPadding={{ x: 20 }}>
       <VictoryBar
         data={data}
         x="label"
         y="value"
         style={{
           data: {
             fill: ({ datum }) => generateRandomColor(),
           },
         }}
       />
       <VictoryAxis
         dependentAxis
         style={{
           tickLabels: { fontSize: 10, padding: 5, angle: 0, textAnchor: 'end' },
         }}
       />
       <VictoryLabel
         x={25}
         y={10}
         text="หน่วย: บาท" // แก้ไขตรงนี้เพื่อกำหนดหน่วยของเงินที่ต้องการ
         style={{ fontSize: 12, fill: 'black' }}
       />
     </VictoryChart>
      
      ) : (
        <Text style={{color:'red',fontWeight:'800',fontSize:20,marginTop:20}}>ไม่พบข้อมูลการลงทุน</Text>
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:'flex-end',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    marginTop:50
  },
  input: {
    width: '100%',
    height: 60,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius:10
  },
});
