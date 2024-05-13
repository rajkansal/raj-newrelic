// import React from 'react';
// import PropTypes from 'prop-types';
// import {
//     Radar,
//     RadarChart,
//     PolarGrid,
//     PolarAngleAxis,
//     PolarRadiusAxis,
// } from 'recharts';
// import {Card, CardBody, HeadingText, NrqlQuery, Spinner, AutoSizer} from 'nr1';

// export default class MoldyBushesVisualization extends React.Component {
//     // Custom props you wish to be configurable in the UI must also be defined in
//     // the nr1.json file for the visualization. See docs for more details.
//     static propTypes = {
//         /**
//          * A fill color to override the default fill color. This is an example of
//          * a custom chart configuration.
//          */
//         fill: PropTypes.string,

//         /**
//          * A stroke color to override the default stroke color. This is an example of
//          * a custom chart configuration.
//          */
//         stroke: PropTypes.string,
//         /**
//          * An array of objects consisting of a nrql `query` and `accountId`.
//          * This should be a standard prop for any NRQL based visualizations.
//          */
//         nrqlQueries: PropTypes.arrayOf(
//             PropTypes.shape({
//                 accountId: PropTypes.number,
//                 query: PropTypes.string,
//             })
//         ),
//     };

//     /**
//      * Restructure the data for a non-time-series, facet-based NRQL query into a
//      * form accepted by the Recharts library's RadarChart.
//      * (https://recharts.org/api/RadarChart).
//      */
//     transformData = (rawData) => {
//         return rawData.map((entry) => ({
//             name: entry.metadata.name,
//             // Only grabbing the first data value because this is not time-series data.
//             value: entry.data[0].y,
//         }));
//     };

//     /**
//      * Format the given axis tick's numeric value into a string for display.
//      */
//     formatTick = (value) => {
//         return value.toLocaleString();
//     };

//     render() {
//         const {nrqlQueries, stroke, fill} = this.props;

//         const nrqlQueryPropsAvailable =
//             nrqlQueries &&
//             nrqlQueries[0] &&
//             nrqlQueries[0].accountId &&
//             nrqlQueries[0].query;

//         if (!nrqlQueryPropsAvailable) {
//             return <EmptyState />;
//         }

//         return (
//             <AutoSizer>
//                 {({width, height}) => (
//                     <NrqlQuery
//                         query={nrqlQueries[0].query}
//                         accountId={parseInt(nrqlQueries[0].accountId)}
//                         pollInterval={NrqlQuery.AUTO_POLL_INTERVAL}
//                     >
//                         {({data, loading, error}) => {
//                             if (loading) {
//                                 return <Spinner />;
//                             }

//                             if (error) {
//                                 return <ErrorState />;
//                             }

//                             const transformedData = this.transformData(data);

//                             return (
//                                 <RadarChart
//                                     width={width}
//                                     height={height}
//                                     data={transformedData}
//                                 >
//                                     <PolarGrid />
//                                     <PolarAngleAxis dataKey="name" />
//                                     <PolarRadiusAxis
//                                         tickFormatter={this.formatTick}
//                                     />
//                                     <Radar
//                                         dataKey="value"
//                                         stroke={stroke || '#51C9B7'}
//                                         fill={fill || '#51C9B7'}
//                                         fillOpacity={0.6}
//                                     />
//                                 </RadarChart>
//                             );
//                         }}
//                     </NrqlQuery>
//                 )}
//             </AutoSizer>
//         );
//     }
// }

// const EmptyState = () => (
//     <Card className="EmptyState">
//         <CardBody className="EmptyState-cardBody">
//             <HeadingText
//                 spacingType={[HeadingText.SPACING_TYPE.LARGE]}
//                 type={HeadingText.TYPE.HEADING_3}
//             >
//                 Please provide at least one NRQL query & account ID pair
//             </HeadingText>
//             <HeadingText
//                 spacingType={[HeadingText.SPACING_TYPE.MEDIUM]}
//                 type={HeadingText.TYPE.HEADING_4}
//             >
//                 An example NRQL query you can try is:
//             </HeadingText>
//             <code>
//                 FROM NrUsage SELECT sum(usage) FACET metric SINCE 1 week ago
//             </code>
//         </CardBody>
//     </Card>
// );

// const ErrorState = () => (
//     <Card className="ErrorState">
//         <CardBody className="ErrorState-cardBody">
//             <HeadingText
//                 className="ErrorState-headingText"
//                 spacingType={[HeadingText.SPACING_TYPE.LARGE]}
//                 type={HeadingText.TYPE.HEADING_3}
//             >
//                 Oops! Something went wrong.
//             </HeadingText>
//         </CardBody>
//     </Card>
// );


import React from "react";
import { AreaChart,LineChart,BarChart,SparklineChart } from "nr1";
// import { Grid, GridItem } from 'nr1';
import {GridItem } from "nr1";
 
const index = () => {
  return (
    <div className="heading"><h1>Hello Everyone!</h1>
    <GridItem>
    <AreaChart
            accountId={4439970}
            query= "SELECT average(transmitBytesPerSecond) AS `Transmit bytes per second`, average(receiveBytesPerSecond) AS `Receive bytes per second` FROM NetworkSample WHERE (entityGuid = 'NDQzOTk3MHxJTkZSQXxOQXwzODU5NzY2MTg1MjQ5MzU5MTM1') TIMESERIES AUTO"
            fullWidth
          />
    </GridItem>

    <GridItem>
    <LineChart
     accountId={4439970}
     query="SELECT average(cpuPercent) AS `CPU used %` FROM SystemSample WHERE (entityGuid = 'NDQzOTk3MHxJTkZSQXxOQXwzODU5NzY2MTg1MjQ5MzU5MTM1') TIMESERIES AUTO"
     fullWidth
     />   
    </GridItem>

    <GridItem>
    <BarChart
     accountId={4439970}
     query="SELECT average(memoryUsedPercent) AS `Memory used %` FROM SystemSample WHERE (entityGuid = 'NDQzOTk3MHxJTkZSQXxOQXwzODU5NzY2MTg1MjQ5MzU5MTM1') TIMESERIES AUTO"
     fullWidth
    />   
    </GridItem>

    <GridItem>
    <SparklineChart
     accountId={4439970}
     query="SELECT average(loadAverageOneMinute) AS `1 minute`, average(loadAverageFiveMinute) AS `5 minutes`, average(loadAverageFifteenMinute) AS `15 minutes` FROM SystemSample WHERE (entityGuid = 'NDQzOTk3MHxJTkZSQXxOQXwzODU5NzY2MTg1MjQ5MzU5MTM1') TIMESERIES AUTO"
     fullWidth
    />   
    </GridItem>

    </div>
  );
};
 
export default index;