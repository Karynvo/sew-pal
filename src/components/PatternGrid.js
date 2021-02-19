import * as React from "react";
import Amplify, { API } from 'aws-amplify';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import awsconfig from '../aws-exports';

import TechCellRenderer from './TechCellRenderer';

class PatternGrid extends React.Component {
  constructor(props){
    super(props);
    
    this.state = {
      data: [],
      gridOptions: {
        columnDefs: [
          {
            headerName: 'Designer',
            field: 'Designer'
          },
          {
            headerName: 'Garment Type',
            field: 'Garment Type'
          },
          {
            headerName: 'Pattern Name',
            field: 'Pattern Name'
          },
          {
            headerName: 'Tech Drawing',
            field: 'Tech Drawing',
            cellRenderer: 'techCellRenderer'
          }
        ],
        suppressLoadingOverlay: true, // suppress until its fixed
        frameworkComponents: {
          techCellRenderer: TechCellRenderer
        },
        defaultColDef: {
          sortable: true,
          filter: true
        }
      }
    };

    Amplify.configure(awsconfig);
  }
  
  componentDidMount(){
    const apiName = 'sewPalApi';
    const path = '/table'; 

    API
    .get(apiName, path)
    .then(response => {
      // move logic to server side?
      const transformedData = response.data.records.map(fe => fe.fields);
      console.log(transformedData);
      this.setState({ data: transformedData });
    })
    .catch(error => {
      console.log(error.response);
    });
  }

  render(){
    const gridData = this.state.data;

    if(gridData.length > 0){
      return(
        <div>
          <div className="ag-theme-alpine" style={{ height: 400, width: 600 }}>
            <AgGridReact
              gridOptions={this.state.gridOptions}
              rowData={gridData}
              columnDefs={this.state.columnDefs}
              frameworkComponents={this.state.frameworkComponents}
              defaultColDef={this.state.defaultColDef}
            />
          </div>
        </div>
      )
    }else{
      return (
        <div>Loading</div>
      )
    }
  }
}


export default PatternGrid