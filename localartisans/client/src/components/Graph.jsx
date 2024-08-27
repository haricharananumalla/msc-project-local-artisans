
import CanvasJSReact from '@canvasjs/react-charts';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const Graph = () => {
  const options = {
    animationEnabled: true,
    exportEnabled: true,
    theme: 'light1', 
    title: {
      text: 'Top Selling Product',
    },
    data: [
      {
        type: 'pie',
        indexLabel: '{label}: {y}%',
        startAngle: -90,
        dataPoints: [
          { y: 20, label: 'Airfare' },
          { y: 24, label: 'Food & Drinks' },
          { y: 20, label: 'Accommodation' },
          { y: 14, label: 'Transportation' },
          { y: 12, label: 'Activities' },
          { y: 10, label: 'Misc' },
        ],
      },
    ],
  };

  return (
    <div>
      <CanvasJSChart options={options} />
    </div>
  );
};

export default Graph;
