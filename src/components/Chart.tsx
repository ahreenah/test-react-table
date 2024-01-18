import React from "react";
import * as echarts from 'echarts';
import ReactEcharts from "echarts-for-react";

type ChartProps = {
  data: Array<{
    amount: number,
    created_at: string,
  }>
}


const Chart = ({data}: ChartProps) => {
  let shownData = data ? [...data] : []
  shownData?.reverse()
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {type: 'cross'}
    },
    grid: {
      left: 0,
      top: 10,
      right: 58,
      bottom: 60
    },
    xAxis: [
      {
        splitNumber: 4,
        axisLine: {
          lineStyle: {
            color: '#202B47', // Set the color of y-axis line
          },
        },
        axisLabel: {
          color: '#6161D8D'
        },
        type: 'category',
        data: shownData?.map(({created_at}) => new Date(created_at)?.toLocaleTimeString('es-AR')?.match(/\d+:\d+/)?.[0]),
      }
    ],
    yAxis: {
      type: 'value',
      name: 'Temperature',
      min: 0,
      max: 25000,
      splitLine: {
        lineStyle: {
          color: '#222B44'
        }
      },
      position: 'right',
      axisLabel: {
        formatter: '{value}',
        color: '#6161D8D'
      }
    },

    dataZoom: [
      {
        show: true,
        xAxisIndex: [0, 1],
        type: 'slider',
        top: '88%',
        start: 0,
        end: 100,

        handleStyle: {
          color: '#2040B0',
          borderColor: '#2040B0'
        },
        brushStyle: {
          color: '#FF0000',
          opacity: 0.5,
        },
        fillerColor: '#1a51a030',
        borderColor: '#00000000',
        backgroundColor: '#222B44',
        dataBackground: {
          areaStyle: {
            color: '#00000000'
          },
          lineStyle: {
            color: '#C9D1F0'
          }
        },
        selectedDataBackground: {
          areaStyle: {
            color: '#ffffff00'
          },
          lineStyle: {
            color: '#616D8D',
            //  color: '#5A6C97'
          }
        },
        moveHandleSize: 0,
      }
    ],
    series: [

      {
        name: 'Токены',
        type: 'line',
        showSymbol: false,
        data: shownData?.map(({amount}) => amount) ?? [],
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgba(58,77,233,0.8)'
            },
            {
              offset: 1,
              color: 'rgba(58,77,233,0.3)'
            }
          ])
        }
      }
    ]
  }


  /*{
    xAxis: {
      type: 'category',
      data: data?.map(({created_at}) => created_at) ?? []
      //['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: [{
      name: 'v',
      type: 'value',
      axisTick: {
        length: 6,
        lineStyle: {
          type: 'dashed'
          // ...
        }
      }
    }, {
      name: 'a',
      type: 'value',
      axisTick: {
        length: 6,
        lineStyle: {
          type: 'dashed'
          // ...
        }
      }
    }],
    grid: {
      left: 30,
      top: 10,
      right: 0,
      bottom: 20
    },
    series: [
      {
        data: data?.map(({amount}) => amount) ?? [],
        type: 'line'
      },
    ]
  };*/
  return <>
    <ReactEcharts style={{height: '300px'}} option={option} />
  </>
}
export default Chart;
