import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState({ number: [] });
  const [data2, setData2] = useState({ northSum: '', westSum: '', southSum: '', centralSum: '', eastSum: '' });
  const [data3, setData3] = useState({ resultQ3: [] });


  let northSum = 0;
  let westSum = 0;
  let southSum = 0;
  let centralSum = 0;
  let eastSum = 0;
  let userMap = new Map()
  let resultQ3 = []


  function summaryN(arg) {
    let num1 = arg.sort((a, b) => a - b);
    let num2 = num1.filter((number) => {
      if (number >= 100 && number <= 500) {
        return number;
      }
    });
    let uniqueVal = [];
    for (let val of num2) {
      if ((val % 3 == 0) || (val % 5 == 0)) {
        if (!uniqueVal.includes(val)) uniqueVal.push(val);
      }
    }
    let summaryNum = [...uniqueVal];
    return summaryNum


  }

  function sum(arg) {
    for (let i = 0; i < arg.length; i++) {
      if (arg[i].location === "North") {
        northSum += arg[i].grandTotal
      } else if (arg[i].location === "West") {
        westSum += arg[i].grandTotal
      } else if (arg[i].location === "South") {
        southSum += arg[i].grandTotal
      } else if (arg[i].location === "Central") {
        centralSum += arg[i].grandTotal
      } else if (arg[i].location === "East") {
        eastSum += arg[i].grandTotal
      }
    }
  }



  function sumMember(arg) {    
    for (let i = 0; i < arg.length; i++) {
      if (arg[i].member == null) continue
      let memberName = arg[i].member.name;
      if (userMap.has(memberName)) {
        let memberGainPoint = userMap.get(memberName) + arg[i].member.gainPoints
        userMap.set(memberName, memberGainPoint)
      } else {
        userMap.set(memberName, arg[i].member.gainPoints)
      }
    }  
    console.log(userMap)  
    for (let [key, value] of userMap) {
      let data = {
        name:key,
        gainPoints:value
      } 
      resultQ3.push(data)
    }
    console.log(resultQ3)
  }





  useEffect(() => {
    async function fetchData() {
      const q1 = await axios(
        'https://oclmyk0vd0.execute-api.us-east-1.amazonaws.com/codecamp7/q1?token=dean',
      );
      const q2 = await axios(
        'https://oclmyk0vd0.execute-api.us-east-1.amazonaws.com/codecamp7/q2?token=dean',
      );
      const q3 = await axios(
        'https://oclmyk0vd0.execute-api.us-east-1.amazonaws.com/codecamp7/q3?token=dean',
      );


      sum(q2.data)
      sumMember(q3.data)

      setData({
        number: summaryN(q1.data).join()
      });
      setData2({
        northSum: northSum,
        westSum: westSum,
        southSum: southSum,
        centralSum: centralSum,
        eastSum: eastSum
      })
      setData3({
        resultQ3:resultQ3
      })
    }
    fetchData();
  }, []);


  return (
    <div>
      <div>
        <p>#  Question 1</p>
        <p>'https://oclmyk0vd0.execute-api.us-east-1.amazonaws.com/codecamp7/q1?token=xxxxx'</p>
        <p>โจทย์  ดึงข้อมูลชุดตัวเลขจาก API : q1   แล้ว process ดังนี้</p>
        <ul>
          <li>เรียงลำดับ จากน้อยไปมาก </li>
          <li>เอาตัวเลขเฉพาะ between 100 - 500 (รวมตัวเลข 100, 500ด้วย)</li>
          <li>เอาตัวเลขเฉพาะ หารด้วย แม่3 หรือ แม่5 ลงตัว</li>
          <li>แสดงเฉพาะเลขที่ unique (ไม่ต้องแสดงเลขซ้ำ เช่น 9 สี่ตัว   ให้แสดงแค่ 9ตัวเดียว</li>
        </ul>
        [{data.number}]
      </div>
      <div>
        <p>#  Question 2</p>
        <p>'https://oclmyk0vd0.execute-api.us-east-1.amazonaws.com/codecamp7/q2?token=xxxxx'</p>
        <p>โจยท์  ดึงข้อมูลธุรกรรมการขาย    API : q2   แล้ว process ดังนี้</p>
        <ul>
          <li>รวมยอดขายของแต่ละภาค  location</li>
        </ul>
            North: {data2.northSum}, <br></br>
            West: {data2.westSum}, <br></br>
            South: {data2.southSum}, <br></br>
            Central: {data2.centralSum}, <br></br>
            East: {data2.eastSum}, <br></br>
      </div>
      <div>
        <p>#  Question 3</p>
        <p>'https://oclmyk0vd0.execute-api.us-east-1.amazonaws.com/codecamp7/q3?token=xxxxx'</p>
        <p>โจยท์  ดึงข้อมูลธุรกรรมการขาย    API : q3   แล้ว process ดังนี้</p>
        <ul>
          <li>รวมยอดขายของสมาชิกแต่ละคนโดยชื่อ member.name</li>
        </ul>
        <ul>
      {data3.resultQ3.map(user => (
        <li>
          {user.name} :  {user.gainPoints}
        </li>
      ))}
    </ul>
      </div>
    </div>
  );
}


export default App;

