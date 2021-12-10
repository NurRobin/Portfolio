
const options = {
    bezierCurve: true,
    animation: {
        duration: 1000
    },
    elements: {
    line: {
        borderWidth: 3
    }
    },
    tooltips: {
        enabled: false
    }
}


const config = {
type: 'scatter',
data: {
  datasets: [{
    data: [],
    label: "Schwerpunkt",
    pointBackgroundColor: 'orange',
    pointBorderColor: 'darkorange',
    borderColor: "orange",
    pointRadius: 10,
    borderWidth: 1,
    tension: 0,
    showLine: true,
    
},{
      data: [],
      borderColor: "black",
      borderWidth: 1,
      tension: 0,
      showLine: true,
      pointRadius: 0
  },]
},
options: options
};

const config1 = {
    type: 'scatter',
    data: {
      datasets: [{
        data: [],
        label: "Welle 1",
        borderColor: "red",
        borderWidth: 1,
        tension: 2,
        showLine: true,
        pointRadius: 0
      },{
        data: [],
        label: "Welle 2",
        borderColor: "blue",
        borderWidth: 1,
        tension: 0,
        showLine: true,
        pointRadius: 0
      }]
    },
    options: options 
};

const config2 = {
    type: 'scatter',
    data: {
      datasets: [{
          data: [],
          borderColor: "black",
          borderWidth: 1,
          tension: 0,
          showLine: true,
          pointRadius: 0
      }]
    },
    options: options
};





const myChart = new Chart(
document.getElementById('endChart'),
config
);

myChart.data.datasets[0].label = '"Fourier Graph"'
myChart.update()

const myChart3 = new Chart(
document.getElementById('sinChart'),
config1
);
const myChart4 = new Chart(
document.getElementById('combinedChart'),
config2
);

myChart4.data.datasets[0].label = "Interferrenz"
myChart4.update()

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}



function addData(wave1,wave2,k){


  let dataWave1 = [];
  let dataWave2 = [];
  let dataWave3 = [];

  let t = 0;
  let till = 50;
  let dt = 0.1;
  let data = [];
  
  let xSum = 0;
  let ySum = 0;

  while(t < till){
      let fy = Math.sin(2*Math.PI*wave1*t)
      let hy = Math.sin(2*Math.PI*wave2*t)
      let gy = fy+hy

      dataWave1.push({ x: t, y: fy});
      dataWave2.push({ x: t, y: hy});
      dataWave3.push({ x: t, y: gy});

      wt = -2*Math.PI*k*t;

      fourierX = gy*Math.cos(wt);
      fourierY = gy*Math.sin(wt);
      data.push({ x: fourierX, y: fourierY});

      xSum += fourierX
      ySum += fourierY

      t += dt;

  }

  console.log("Off from center:"+ Math.round((Math.abs((xSum / ((1/dt)*till)))+Math.abs((ySum / ((1/dt)*till)))) * 1000))
  
  myChart3.data.datasets[0].data = dataWave1;
  myChart3.data.datasets[1].data = dataWave2;
  myChart4.data.datasets[0].data = dataWave3;
  myChart3.update()
  myChart4.update()
  
  myChart.data.datasets[0].data = [{x: (xSum / ((1/dt)*till)), y: (ySum / ((1/dt)*till))}]
  myChart.data.datasets[1].data = data;
  myChart.update()


}