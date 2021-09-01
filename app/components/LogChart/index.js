import React, {useEffect} from 'react';
import {AreaChart, XAxis, Grid, YAxis} from 'react-native-svg-charts';
import {View} from 'react-native';
import * as scale from 'd3-scale';
import * as shape from 'd3-shape';
import * as dateFns from 'date-fns';
import {useSelector, useDispatch} from 'react-redux';
import {getLogEntries} from 'mylogs/app/redux/actions/logEntriesActions';
import moment from 'moment';

const LogChart = props => {
  const logEntries = useSelector(state => state.logEntries);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLogEntries(props.log.id));
  }, []);

  logEntries.items.forEach(entry => {
    const momentDate = moment(Number.parseInt(entry.value_date));
    entry.date = dateFns.setHours(
      new Date(momentDate.format('YYYY-MM-DD')),
      momentDate.hours(),
    );
  });
  const chartColor = hexToRgb(props.log.color);

  return (
    <View style={{height: 400, paddingTop: 20}}>
      <AreaChart
        style={{flex: 1}}
        data={logEntries.items}
        yAccessor={({item}) => item.value}
        xAccessor={({item}) => item.date}
        xScale={scale.scaleTime}
        contentInset={{top: 10, bottom: 10}}
        svg={{
          fill: `rgba(${chartColor.r}, ${chartColor.g}, ${chartColor.b}, 0.5)`,
        }}
        curve={shape.curveLinear}>
        <Grid />
      </AreaChart>
      <XAxis
        data={logEntries.items}
        svg={{
          fill: 'black',
          fontSize: 8,
          rotation: 20,
          originY: 30,
          y: 5,
        }}
        xAccessor={({item}) => item.date}
        scale={scale.scaleTime}
        numberOfTicks={6}
        style={{marginHorizontal: -15, height: 20}}
        contentInset={{left: 10, right: 25}}
        formatLabel={value => dateFns.format(value, 'dd/MMM')}
      />
    </View>
  );
};

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

export default LogChart;
